import LazyLoadImage from "../lazyLoadImg/LazyLoadImage"
import "./rightbar.css"
import AddIcon from "@mui/icons-material/Add"
import CheckIcon from "@mui/icons-material/Check"
import { Users } from "../../dummyData"
import React, { useContext, useEffect, useState } from "react"
import Online from "../online/Online"
import axios from "axios"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
const PF = process.env.REACT_APP_PUBLIC_FOLDER

const Rightbar = ({ user }) => {
  const { user: currentUser, dispatch } = useContext(AuthContext)
  const [friends, setFriends] = useState([])
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  )

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`/users/friends/${user?._id}`)
        setFriends(friendList.data)
      } catch (err) {
        console.log(err)
      }
    }

    if (user && user._id) getFriends()
  }, [user, user?._id])

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id))
  }, [currentUser, user?._id])

  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user?._id}/unfollow`, {
          userId: currentUser._id,
        })
        dispatch({ type: "UNFOLLOW", payload: user?._id })
      } else {
        await axios.put(`/users/${user?._id}/follow`, {
          userId: currentUser._id,
        })
        dispatch({ type: "FOLLOW", payload: user?._id })
      }
      setFollowed(!followed) // Move this line after the API call
    } catch (err) {
      console.log(err)
    }
  }

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={followHandler}>
            {followed ? (
              <>
                Followed
                <CheckIcon />
              </>
            ) : (
              <>
                Follow
                <AddIcon />
              </>
            )}
          </button>
        )}
        <h4 className="rightbarTitle">User Informaation</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationships === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <div className="rightbarTitle">User friends</div>
        <div className="rightbarFollowings">
          <div className="rightbarFollowings">
            {friends.map((friend) => (
              <Link
                key={friend._id}
                className="link"
                to={`/profile/${friend.username}`}
              >
                <div className="rightbarFollowing">
                  <img
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </>
    )
  }
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF + "gift.png"} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friend</b>
          </span>
        </div>
        <LazyLoadImage className="rightbarAd" src={PF + "ad.png"} alt="" />
        <h4 className="rightbarTitle">Online Friend</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar
