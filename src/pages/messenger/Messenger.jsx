import "./messenger.css"
import { Topbar } from "../../components/topbar/Topbar"
import Conversation from "../../components/conversation/Conversation"
import Message from "../../components/message/Message"
import Chat from "../../components/chat/Chat"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
export default function Messenger() {
  const [conversations, setConversations] = useState([])

  const { user } = useContext(AuthContext)

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
  }, [])

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((conversation) => (
              <Conversation
                key={conversation._id}
                conversation={conversation}
                currentUser={user}
              />
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message own={true} />
              <Message />
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
            </div>
            <div className="chatBoxBottom">
              <textarea
                placeholder="Write something..."
                className="chatMessageInput"
              ></textarea>
              <button className="chatSubmitButton">Send</button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <Chat />
            <Chat />
            <Chat />
            <Chat />
          </div>
        </div>
      </div>
    </>
  )
}
