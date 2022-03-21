import React from 'react'

const Emoji = ({emojiIcon,setEmoji,emojiText}) => {
  return (
    <img src={emojiIcon} onClick={()=>setEmoji({emojiIcon, emojiText})} alt="" />

  )
}

export default Emoji