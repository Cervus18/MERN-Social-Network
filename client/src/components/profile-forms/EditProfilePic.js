import React ,{useState} from 'react'
import {useSelector} from 'react-redux'
import { useRef } from 'react'
import { updateAvatar } from '../../actions/auth'
import { useDispatch } from 'react-redux'
import ButtonSpinner from '../layout/ButtonSpinner'

const EditProfilePic = () => {
  
  const [fileInputState,setFileInputState] = useState('')
  const [previewSource,setPreviewSource] = useState()
  const [loading,setLoading] = useState(false)
  const profilePic = useSelector(state => state.auth.user.avatar)
  const hiddenInputRef = useRef()
  const dispatch = useDispatch()
  
  const  handleInputClick = () => {
    
      hiddenInputRef.current.click()
  }

  const handleFileInputChange = (e) => {
       const file = e.target.files[0]
       previewFile(file)
  }

  const previewFile = (file) => {
     const reader = new FileReader()
     //Convert the image to a string 64base-encoded
     reader.readAsDataURL(file)
     reader.onloadend = () => {
        setPreviewSource(reader.result)
     }
  }

  const handleSubmitFile = (e) => {
      e.preventDefault()
      if(!previewSource) return
      uploadImage(previewSource)

  }

  const uploadImage = async (base64EncodedImage) => {

     dispatch(updateAvatar(base64EncodedImage))
  }

  
  return (
    <form style={{"display":"flex", "flexDirection":"column", "alignItems":"center"}} onSubmit={(e)=>handleSubmitFile(e)}>
        <div className="profile-img-wrapper">
            <img className="round-img" src={ !previewSource ? profilePic : previewSource} />
            <i className="fa-solid fa-camera" onClick={ handleInputClick}></i>
        </div>
        <div style={{"display":"flex", "width":"100%", "justifyContent":"flex-end", "borderTop": "1px #ccc solid"}}>
            <button  type="submit" onClick={()=> {if(previewSource )setLoading(true)} }  className={loading? "btn btn-dark my-1 save": "btn btn-dark my-1"} >Save{loading && <ButtonSpinner/>}</button>
        </div>
        <input ref={hiddenInputRef} value={fileInputState} type="file" name="image" onChange={(e)=>handleFileInputChange(e)} style={{display: 'none'}} />
      
    </form> 
  )
}

export default EditProfilePic