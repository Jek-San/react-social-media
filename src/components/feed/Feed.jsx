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
      try {
        const response = await axios.get(url)
        const sortedPosts = response.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        })
        setPosts(sortedPosts)
      } catch (error) {
        // Handle errors here
        console.error(error)
      }
    }
    fetchData()
  }, [username, user._id])

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}

export default Feed
