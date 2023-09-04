import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"

function Feed({ username }) {
  const [posts, setPosts] = useState([])
  const { user } = useContext(AuthContext)
  const url = username
    ? `/posts/profile/${user.username}`
    : `/posts/timeline/${user._id}`

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
  }, [username, user._id])

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
