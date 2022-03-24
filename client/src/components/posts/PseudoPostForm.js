import React, {Fragment, useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import defaultAvatar from '../../img/defaultAvatar.png'
import Modal from '../layout/Modal'
import PostForm from './PostForm'

const PseudoPostForm = () => {

  
  const [openModal,setOpenModal] = useState(false)
  const {avatar,name} = useSelector(state=> state.auth.user)
  const posts = useSelector(state=> state.post.posts)
  const [text,setText] = useState('')


  useEffect(()=>{
    setOpenModal(false)
  },[posts])

  return (
    <Fragment>
    <div className="pseudo-form">
        <img className='round-img' style={{"height":"40px","width":"40px"}} src={avatar? avatar.url: defaultAvatar} alt="" />
        <div onClick={()=> setOpenModal(true)} className="pseudo-input">Share a post, {name.trim().split(' ')[0]} !</div>
    </div>
    {openModal && <Modal isOpen={setOpenModal}><PostForm text={text} setText={setText}/></Modal>}
    </Fragment>

  )
}

export default PseudoPostForm