import React from 'react'
import './message.css'
import defaultAvatar from '../../img/defaultAvatar.png'
import { format } from 'timeago.js'

const Message = ({message,own,avatar}) => {
  return (
    <div className={own? "message own" : "message "}>
        <div className="messageTop">
            {own ? <img src={avatar? avatar.url : defaultAvatar} alt="" className="messageImg" />:
                <img src={ defaultAvatar} alt="" className="messageImg" />
            } 
            <p className='messageText'>{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}

export default Message