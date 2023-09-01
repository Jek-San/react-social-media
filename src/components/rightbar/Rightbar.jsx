import LazyLoadImage from "../lazyLoadImg/LazyLoadImage"
import "./rightbar.css"

import { Users } from "../../dummyData"

import React from "react"
import Online from "../online/Online"
const PF = process.env.REACT_APP_PUBLIC_FOLDER

const ProfileRightbar = () => {
  return (
    <>
      <h4 className="rightbarTitle">User Informaation</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">New York</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">Madrid</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">Single</span>
        </div>
      </div>
      <div className="rightbarTitle">User friends</div>
      <div className="rightbarFollowings">
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src={PF + "person/1.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Wick</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF + "person/2.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Wick</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF + "person/3.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Wick</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF + "person/4.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Wick</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF + "person/5.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Wick</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF + "person/6.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Wick</span>
          </div>
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

const Rightbar = ({ profile }) => {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar
