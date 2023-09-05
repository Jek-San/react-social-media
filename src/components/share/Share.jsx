import "./share.css"
import PermMediaIcon from "@mui/icons-material/PermMedia"
import { Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"

function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const { user } = useContext(AuthContext)
  const desc = useRef()

  const [file, setFile] = useState(null)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    }
    if (file) {
      const data = new FormData()
      const fileName = file.name
      data.append("file", file)

      data.append("name", fileName)

      try {
        const res = await axios.post("/upload", data)
        newPost.img = res.data.pathName
      } catch (err) {
        console.log(err)
      }
    }
    try {
      const postRes = await axios.post("/posts", newPost)
      console.log(postRes.data)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shereProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel
              className="shareCancel"
              onClick={() => {
                setFile(null)
              }}
            />
          </div>
        )}
        <form
          encType="multipart/form-data"
          className="shareBottom"
          onSubmit={submitHandler}
        >
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                hidden
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  )
}

export default Share
