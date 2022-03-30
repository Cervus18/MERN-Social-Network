import React, {Fragment,useState} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { deleteComment } from '../../actions/post'
import defaultAvatar from '../../img/defaultAvatar.png'
import Modal from '../layout/Modal'

const CommentItem = ({deleteComment ,postId,comment: {_id, text, name, avatar, user, date}, auth}) => {
  
  const [showModal,setShowModal]=useState(false)

  return (
    <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar?avatar.url:defaultAvatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1"> {text} </p>
             <p className="post-date"> Posted on <Moment format="YYYY/MM/DD">{date}</Moment></p>
             {!auth.loading && user === auth.user._id && (
                 <button onClick={()=>setShowModal(true)} type="button" className='btn btn-danger'>
                     <i className="fas fa-trash"></i>
                 </button>
             )}
          </div>
          {showModal && <Modal><div className='delete-prompt'><strong><p>Are you sure you  want to delete this comment?</p></strong> <div><button className='btn btn-danger-v2' onClick={()=>deleteComment(postId,_id)}>Yes</button> <button className="btn btn-success-v2" onClick={()=>setShowModal(false)}>Cancel</button> </div></div></Modal>}
    </div>
  )
}
const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps,{deleteComment})(CommentItem)

