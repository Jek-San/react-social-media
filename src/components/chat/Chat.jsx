import { useEffect, useState } from "react"
import "./chat.css"
import axios from "axios"

export default function Chat({ onlineUsers, currentId, setCurrentChat }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const [friends, setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])

  useEffect(() => {
    const getFriend = async () => {
      const res = await axios.get("/users/friends/" + currentId)
      setFriends(res.data)
    }
    getFriend()
  }, [currentId])

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)))
  }, [friends, onlineUsers])

  const handleClick = async (user) => {
    try {
      const res = await axios(`/conversations/find/${currentId}/${user._id}`)
      setCurrentChat(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div
          key={o._id}
          className="chatOnlineFriend"
          onClick={() => handleClick(o)}
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ? PF + o?.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  )
}
