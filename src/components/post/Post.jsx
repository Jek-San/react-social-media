import "./post.css"

import { MoreVert } from "@mui/icons-material"
import { useInView } from "react-intersection-observer"

import LazyLoadImage from "../lazyLoadImg/LazyLoadImage"

function Post({ post }) {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src="/assets/person/2.jpeg"
              alt=""
              className="postProfileImg" // Apply the className here
            />
            <span className="postUsername">Ihsan Zack</span>
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
            <img className="likeIcon" src="/assets/like.png" alt="" />
            <img className="likeIcon" src="/assets/heart.png" alt="" />
            <span className="postLikeCounter">{post.like}</span>
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
