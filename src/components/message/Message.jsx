import "./message.css"

import moment from "moment"

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="https://images.pexels.com/photos/7322129/pexels-photo-7322129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="messageImg"
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messagebottom">
        {moment(message?.createdAt).fromNow()}
      </div>
    </div>
  )
}
