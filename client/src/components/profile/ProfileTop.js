import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import { followOrUnfollow } from '../../actions/profile'
import defaultAvatar from '../../img/defaultAvatar.png'


const  ProfileTop = ({profile:{
    status,
    company,
    location,
    website,
    social,
    user: {name, avatar, _id}
}}) => {

  const followings = useSelector(state => state.profile.followings)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const loggedUserId = useSelector(state => state.auth.user._id)
  const dispatch = useDispatch()

  const isFollowed = followings.some((userObject)=> userObject.user === _id)

  return (
    <div className="profile-top bg-primary p-2">
      <img
        className="round-img my-1"
        src={avatar? avatar: defaultAvatar}
        alt=""
      />
      <h1 className="large">{name}</h1>
      <p className="lead">{status} {company && <span>at {company}</span>}</p>
      <p>{location && <span><i  className="fa-solid fa-location-dot"></i>{' '}{location}</span>}</p>
      <br/>
      {(isAuthenticated && loggedUserId !== _id ) && <button onClick={()=>{dispatch(followOrUnfollow(_id))}} className={`btn ${!isFollowed? 'btn-success': 'btn-danger'}`}>{isFollowed? 'Unfollow': 'Follow'}</button>}
      <div className="icons my-1">
      
        { website && (
            <a href={website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x"></i>
            </a>
        )}
        {social && social.twitter && (
            <a href={social.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
        )} 

        {social && social.facebook && (
            <a href={social.facebook} target="_blank" rel="noopener noreferrer">
             <i className="fab fa-facebook fa-2x"></i>
           </a>
        )}
        {social && social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
             <i className="fab fa-linkedin fa-2x"></i>
           </a>
        )}
        {social && social.youtube && (
            <a href={social.youtube} target="_blank" rel="noopener noreferrer">
             <i className="fab fa-youtube fa-2x"></i>
           </a>
        )}
        {social && social.instagram && (
         <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        )}

      
       
       
       
        
      </div>
    </div>
  );
};

export default ProfileTop;
