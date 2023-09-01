import "./post.css"
import { Users } from "../../dummyData"
import { MoreVert } from "@mui/icons-material"

import LazyLoadImage from "../lazyLoadImg/LazyLoadImage"
import { useState } from "react"

function Post({ post }) {
  const usersMap = Users.reduce((acc, user) => {
    console.log("user: ", user)
    acc[user.id] = user
    console.log("acc: ", acc[user.id])
    return acc
  }, {})

  const [like, setLike] = useState(post.like)
  const [isLike, setIsLike] = useState(false)
  
  const likeHandler = () => {
    setLike(isLike ? like - 1 : like + 1)
    setIsLike(!isLike)
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={usersMap[post.userId]?.profilePicture}
              alt=""
              className="postProfileImg" // Apply the className here
            />
            <span className="postUsername">
              {usersMap[post.userId]?.username}
            </span>
            <span className="postDate">{post?.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert className="" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc} </span>
          <LazyLoadImage
            src={post?.photo}
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
