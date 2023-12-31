import "./messenger.css"
import { Topbar } from "../../components/topbar/Topbar"
import Conversation from "../../components/conversation/Conversation"
import Message from "../../components/message/Message"
import Chat from "../../components/chat/Chat"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { io } from "socket.io-client"

export default function Messenger() {
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessages] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const socket = useRef()
  const scrollRef = useRef()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    socket.current = io("ws://localhost:8900")

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit("addUser", user._id)
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      )
    })
  }, [user])

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id)
        setConversations(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getConversations()
  }, [user._id])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id)
        setMessages(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getMessages()
  }, [currentChat])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    }

    const receiverId = currentChat.members.find((member) => member !== user._id)

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage,
    })

    try {
      const res = await axios.post("/messages/", message)
      setMessages([...messages, res.data])
      setNewMessages("")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => setCurrentChat(conversation)}
              >
                <Conversation conversation={conversation} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message) => (
                    <div key={message._id} ref={scrollRef}>
                      <Message
                        message={message}
                        own={message.sender === user._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    onChange={(e) => setNewMessages(e.target.value)}
                    value={newMessage}
                    placeholder="Write something..."
                    className="chatMessageInput"
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="noConversationText">
                  Open a conversation to start chat
                </span>
              </>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <Chat
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  )
}
