import React from 'react'
import './chatonline.css'
import defaultAvatar from '../../img/defaultAvatar.png'
const ChatOnline = () => {
  return (

      <div className="chatOnlineFriend" >
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src={defaultAvatar}
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">John Doe</span>
     
    
  </div>
  )
}

export default ChatOnline