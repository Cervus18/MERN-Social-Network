import React, {Fragment,useState} from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost } from '../../actions/post'
import defaultAvatar from '../../img/defaultAvatar.png'
import Modal from '../../components/layout/Modal'

const PostItem = ({auth,addLike, removeLike, deletePost, post: {_id, text,emoji,image, name, avatar, user, likes, comments, date}, showActions}) => {

  const [showImageModal,setShowImageModal]=useState(false)
  const [showDelete,setShowDeleteModal]=useState(false)

  return (
    <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img
        style={{"width":"60px","height":"60px","marginTop":"20px"}}
          className="round-img"
          src={avatar? avatar.url:defaultAvatar}
          alt=""
        />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
       <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      {emoji&& <div style={{"display":"flex","alignItems":"center","border":"1px solid #ddd","background":"#f0f2f5","borderRadius":"8px","padding":"9px"}}>
         <img src={emoji.emojiIcon} alt="" style={{"width":'20px', "marginRight":"8px"}}/>{name} is <strong style={{"marginLeft":"5px"}}>{ emoji.emojiText}</strong>
      </div>}
      <p className="my-1">
        {text}
      </p>
      {image && <img onClick={()=>setShowImageModal(true)} src={image.url} style={{"width":"200px", "border":"1px solid #ccc","borderRadius":"8px","display":"block","marginBottom":"17px"}}/>}
      {showImageModal && <Modal isOpen={setShowImageModal}><img src={image.url} style={{"width":"100%"}}/></Modal>}
     
    {showActions && <Fragment>
      <button onClick={ () => addLike(_id)} className="btn" style={{"background":"#03854929" , "border":"1px solid #038521", "color":"#038521"}}>
          <i className="fas fa-thumbs-up"></i>{' '}
          <span >{likes.length > 0 && (<span>{likes.length }</span>)  }</span>
      </button>
      <button onClick={ () => removeLike(_id)}  className="btn "  style={{"background":"#f9709733" , "border":"1px solid #d32e5d", "color":"#d32e5d"}}>
          <i className="fas fa-thumbs-down"></i>{' '}
          <span></span>
      </button>
    <Link to={`/posts/${_id}`} className="btn " style={{"background":"#70b5f933" , "border":"1px solid #0a66c2", "color":"#0a66c2"}}>
        Discussion {comments.length > 0 && (<span style={{"border":"1px solid #0a66c2", "color":"#0a66c2"}} className="comment-count">{comments.length }</span>)  }
        
    </Link>
    {!auth.loading && user === auth.user._id &&(
        <button
         onClick={()=> setShowDeleteModal(true)}      
         type="button"
         className="btn btn-danger">
         <i className="fas fa-trash"></i>
       </button>
    )}
    {showDelete && <Modal isOpen={setShowDeleteModal} ><div className='delete-prompt'><strong><p>Are you sure you  want to delete this post?</p></strong> <div><button className='btn btn-danger-v2' onClick={()=>deletePost(_id)}>Yes</button> <button className="btn btn-success-v2" onClick={()=>setShowDeleteModal(false)}>Cancel</button> </div></div></Modal>}
      </Fragment>}
   
    </div>
  </div>
  )
}

PostItem.defaultProps={
  showActions:true
}

const mapStateToProps = state => ({
     auth: state.auth
})

export default connect(mapStateToProps,{addLike, removeLike, deletePost})(PostItem)