import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import React, { useEffect, useState } from "react"
import axios from "axios"

function Feed({ username }) {
  const [posts, setPosts] = useState([])
  const url = username
    ? "/posts/profile/ihsanzack"
    : "/posts/timeline/64ee6e0f9a027f2a264a6616"

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(url)
        .then((response) => {
          setPosts(response.data)
        
        })
        .catch((error) => {
          // Handle errors here
          console.error(error)
        })
      // Use the full URL including the proxy prefix
    }
    fetchData()
  }, [username])

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}

export default Feed
