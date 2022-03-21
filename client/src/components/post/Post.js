import React, {Fragment, useEffect} from 'react'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPost, clearPost } from '../../actions/post'
import PostItem from '../posts/PostItem'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({getPost,clearPost, post: {post, loading}, match}) => {
    
    useEffect(()=>{
        clearPost()
        getPost(match.params.id)
    },[getPost])

  return (
     loading  || post === null ? <Spinner/>: <Fragment>
         <Link to="/posts" className="btn">Back to posts</Link>
         <PostItem showActions={false} post={post} />
         <CommentForm postId={post._id}/>
         <div className="comment">
             {post.comments.map(comment => (
                 <CommentItem key={comment._id} comment={comment} postId={post._id}/>
             ))}
         </div>
     </Fragment>
  )
}

const mapStateToProps = state =>({
    post: state.post
})

export default connect(mapStateToProps,{getPost,clearPost})(Post)