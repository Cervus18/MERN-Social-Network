import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { followOrUnfollow } from '../../actions/profile'
import defaultAvatar from '../../img/defaultAvatar.png'

const ProfileItem = ({profile:
    {user:{_id,name,avatar},
    status,
    company,
    location,
    skills
}}) => {
  
  const followings = useSelector(state => state.profile.followings)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const loggedUserId = useSelector(state => state.auth.user._id)


  const dispatch = useDispatch()

  const isFollowed = followings.some((userObject)=> userObject.user === _id)

  return (
    <div className="profile bg-white">
        <img src={avatar? avatar: defaultAvatar} alt="" className={loggedUserId !== _id ? 'round-img':'round-img my-profile'}/>
        <div>
            <h2>{name}</h2>
            <p>{status} {company && <span>at {company}</span>}</p>
            <p className="my-1">{location && <span><i style={{color:"#f34f4f"}} className="fa-solid fa-location-dot"></i>{' '}{location}</span>}</p>
            <Link to={`/profile/${_id}`} className="btn btn-primary">{loggedUserId !== _id  ? "View Profile":"View My Profile"}</Link>
            {(isAuthenticated && loggedUserId !== _id ) && <button onClick={()=>{dispatch(followOrUnfollow(_id))}} className={`btn ${!isFollowed? 'btn-success': 'btn-danger'}`}>{isFollowed? 'Unfollow': 'Follow'}</button>}
        </div>
        <ul>
            {skills.slice(0,4).map((skill, index) => (
                <li key={index} className="text-primary">
                    <i className="fas fa-check"></i> {skill}
                </li>
            ) )}
        </ul>
    </div>
  )
}

export default ProfileItem