import "./message.css"

export default function Message({ own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="https://images.pexels.com/photos/7322129/pexels-photo-7322129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="messageImg"
        />
        <p className="messageText">Hello this is a message</p>
      </div>
      <div className="messagebottom">1 hour ago</div>
    </div>
  )
}
