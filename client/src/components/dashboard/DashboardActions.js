import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Modal from '../layout/Modal'
import EditProfilePic from '../profile-forms/EditProfilePic'
import { useSelector } from 'react-redux'
const DashboardActions = () => {
  const avatar = useSelector(state=> state.auth.user.avatar)
  const [openModal, setOpenModal] = useState(false)

  useEffect(()=>{
    setOpenModal(false)
  },[avatar])

  return (
    <div className="dash-buttons">
        <Link to="/edit-profile" style={{"background":"#03854929" , "border":"1px solid #038521", "color":"#038521"}} className="btn btn-light"><i style={{"color":"#038521"}} className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
        <Link to="/add-experience" style={{"background":"#70b5f933" , "border":"1px solid #0a66c2", "color":"#0a66c2"}} className="btn btn-light"><i style={{"color":"#0a66c2",}} className="fab fa-black-tie text-primary"></i> Add Experience</Link>
        <Link to="/add-education" style={{"background":"#ff27e51f" , "border":"1px solid #663a67", "color":"#663a67"}} className="btn btn-light"><i style={{"color":"#663a67"}} className="fas fa-graduation-cap text-primary"></i> Add Education</Link>
        <button style={{"background":"#f3903833" , "border":"1px solid #9b6c00", "color":"#9b6c00"}} className="btn btn-light"  onClick={()=> setOpenModal(true)}><i style={{"color":"#9b6c00"}} className="fas fa-image text-primary"></i> Edit profile picture</button>
        {openModal && <Modal isOpen={setOpenModal}><EditProfilePic /></Modal>}
        


   

        
        

    </div>
  )
}

export default DashboardActions