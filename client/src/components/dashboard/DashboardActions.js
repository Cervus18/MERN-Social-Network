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
        <Link to="/edit-profile" className="btn btn-light"><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
        <Link to="/add-experience" className="btn btn-light"><i className="fab fa-black-tie text-primary"></i> Add Experience</Link>
        <Link to="/add-education" className="btn btn-light"><i className="fas fa-graduation-cap text-primary"></i> Add Education</Link>
        <button  className="btn btn-light"  onClick={()=> setOpenModal(true)}><i className="fas fa-image text-primary"></i> Edit profile picture</button>
         
        {openModal && <Modal isOpen={setOpenModal}><EditProfilePic /></Modal>}
        


   

        
        

    </div>
  )
}

export default DashboardActions