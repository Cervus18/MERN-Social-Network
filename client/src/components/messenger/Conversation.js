import React, {useState,useEffect} from 'react'
import './conversation.css'
import defaultAvatar from '../../img/defaultAvatar.png'
import axios from 'axios'
import ConvoLoader from './ConvoLoader'

const Conversation = ({conversation,currentUser}) => {
  
  const [user,setUser] = useState(null)


  
  useEffect(async ()=>{
    if(currentUser){
      const friendId = conversation.members.find(m => m!==currentUser._id)
    const res =await  axios.get(`/api/profile/user/${friendId}`)
    
    setUser(res.data.user)

  }
    
  },[currentUser,conversation])
 
  return (

       
    
      !user? 
      <ConvoLoader/>:   
    <div className="conversation">
        <img src={ user.avatar? user.avatar.url : defaultAvatar} alt="" className="conversationImg" />
        <span>{user.name}</span>
  </div>
    
   
  )
}

export default Conversation