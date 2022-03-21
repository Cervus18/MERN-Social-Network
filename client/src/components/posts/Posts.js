import React, {Fragment,useEffect} from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PseudoPostForm from './PseudoPostForm'
const Posts = ({getPosts, post:{posts, loading}}) => {
  
    useEffect(()=>{
        getPosts()
    },[getPosts])

  return (
    loading? <Spinner/>: (
    <Fragment>
        <h1 className="large text-primary">Posts</h1>
        <PseudoPostForm/>
        <div className="posts">
            {posts.map(post=> (
                <PostItem key={post._id} post={post}/>
            ))}
        </div>
    </Fragment>
    )
  )
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps,{getPosts})(Posts)