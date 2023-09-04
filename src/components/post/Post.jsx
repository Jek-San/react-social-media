import "./post.css"

import { MoreVert } from "@mui/icons-material"
import { Link } from "react-router-dom"
import LazyLoadImage from "../lazyLoadImg/LazyLoadImage"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import moment from "moment"
import { AuthContext } from "../../context/AuthContext"

function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const { user: currentUser } = useContext(AuthContext)
  const [like, setLike] = useState(post.likes.length)
  const [isLike, setIsLike] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    setIsLike(post.likes.includes(currentUser._id))
  })

  useEffect(() => {
    const fetchUser = async () => {
      axios
        .get(`/users?userId=${post.userId}`)
        .then((res) => {
          setUser(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    fetchUser()
  }, [post])

  const likeHandler = async () => {
    try {
      const res = await axios.put(`/posts/${post._id}/like`, {
        userId: currentUser._id,
      })
    } catch (error) {
      console.log(error)
    }

    setLike(isLike ? like - 1 : like + 1)
    setIsLike(!isLike)
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="postProfileImg" // Apply the className here
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">
              {moment(post?.createdAt).fromNow()}
            </span>
          </div>
          <div className="postTopRight">
            <MoreVert className="" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc} </span>

          <LazyLoadImage
            src={PF + post?.img}
            alt=""
            className="postImg" // Apply the className here
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="/assets/like.png"
              alt=""
              onClick={likeHandler}
            />
            <img className="likeIcon" src="/assets/heart.png" alt="" />
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
