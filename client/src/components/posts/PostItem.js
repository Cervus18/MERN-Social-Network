import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost } from '../../actions/post'
import defaultAvatar from '../../img/defaultAvatar.png'

const PostItem = ({auth,addLike, removeLike, deletePost, post: {_id, text, name, avatar, user, likes, comments, date}, showActions}) => {
  return (
    <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img
          className="round-img"
          src={avatar? avatar:defaultAvatar}
          alt=""
        />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">
        {text}
      </p>
       <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
     
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
         onClick={()=> deletePost(_id)}      
         type="button"
         className="btn btn-danger">
         <i className="fas fa-trash"></i>
       </button>
    )}
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