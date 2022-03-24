import React, {useState,useRef} from 'react'
import { connect } from 'react-redux'
import { addPost } from '../../actions/post'
import { useSelector } from 'react-redux'
import defaultAvatar from '../../img/defaultAvatar.png'
import ButtonSpinner from '../layout/ButtonSpinner'
import inLove from '../posts/Emojis/inLove.png'
import excited from '../posts/Emojis/excited.png'
import sad from '../posts/Emojis/sad.png'
import celebrating from '../posts/Emojis/celebrating.png'
import happy from '../posts/Emojis/happy.png'
import cool from '../posts/Emojis/cool.png'
import angry from '../posts/Emojis/angry.png'
import Emoji from './Emojis/Emoji'


const PostForm = ({addPost,text,setText}) => {
  
    const {avatar,name} = useSelector(state=> state.auth.user)
    const [loading,setLoading] = useState(false)
    const [disable,setDisable] = useState(false)
    const [emoji,setEmoji] = useState()
    const hiddenInputRef = useRef()

    //Image upload
    const [fileInputState,setFileInputState] = useState('')
    const [previewSource,setPreviewSource] = useState()

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

 /*const handleSubmitFile = (e) => {
     e.preventDefault()
     if(!previewSource) return
     uploadImage(previewSource)

 }

 const uploadImage = async (base64EncodedImage) => {

    console.log(base64EncodedImage)
 }*/


   


  return (
    <div className="post-form">
      <div className="avatar-wrapper" >
        <div style={{"display": "flex","alignItems":"center"}}>
         <img src={avatar? avatar.url:defaultAvatar} alt="" className="round-img" style={{"height":"40px","width":"40px","border":"1px solid #ccc" }}/>
        <p><strong>{name}</strong></p>
        </div>
        <div className="emojis">
          <Emoji emojiIcon={inLove} setEmoji={setEmoji} emojiText={"in love"}/>
          <Emoji emojiIcon={happy}  setEmoji={setEmoji} emojiText={"happy!"}/>
          <Emoji emojiIcon={excited}  setEmoji={setEmoji} emojiText={"excited!"}/>
          <Emoji emojiIcon={celebrating}  setEmoji={setEmoji} emojiText={"celebrating!"}/>
          <Emoji emojiIcon={sad}  setEmoji={setEmoji} emojiText={"sad"}/>
          <Emoji emojiIcon={angry}  setEmoji={setEmoji} emojiText={"angry"}/>
          <Emoji emojiIcon={cool}  setEmoji={setEmoji} emojiText={"cool"}/>
        </div>
      </div>
        <form className="form my-1" onSubmit={ e=>{
            e.preventDefault()
            setDisable(true)
             addPost({text,emoji,previewSource})
            setText('')
        }}>
          {emoji && <div className='emoji' ><img src={emoji.emojiIcon} style={{"width":"20px","marginRight":"8px"}}/><strong>{emoji.emojiText}</strong><i className='fas fa-times' onClick={()=>setEmoji()}></i></div>}
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            name="text"
            cols="30"
            rows="5"
            placeholder={`Share your ideas, ${name}!`}
            
          ></textarea>
          {previewSource&& <div style={{"position":"relative", "width":"270px"}}><img className='preview-post-img' src={previewSource}></img><i onClick={()=>{setPreviewSource(); hiddenInputRef.current.value=null}} className='fas fa-times cancel-img'></i></div>}
          <div style={{"borderTop":"1px solid #ccc"}}>
           <button  type="submit" onClick={()=> {if(text|| previewSource) {setLoading(true)}} } disabled={disable} className={loading? "btn btn-dark my-1 save": "btn btn-dark my-1"} >Post{loading && <ButtonSpinner bg={"#343a40"}/>}</button>
           <span className='btn btn-success' onClick={ handleInputClick}><i className="fa-solid fa-image" ></i></span>
           <input value={fileInputState} ref={hiddenInputRef}  type="file" name="image"  style={{display: 'none'}} onChange={(e)=>handleFileInputChange(e)} />
           {(previewSource || text) && <span className='btn btn-danger' onClick={()=> {setPreviewSource(); setText(''); setEmoji(); hiddenInputRef.current.value=null  } }>Cancel</span>}
          </div>
        </form>
    </div>
  )
}

export default connect(null, {addPost})(PostForm)