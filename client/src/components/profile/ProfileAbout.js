import React, { Fragment } from 'react'

const ProfileAbout = ({profile: {
    bio,
    skills,
    user: {name}
}}) => {
  return (
  <div  className="profile-about bg-light p-2" style={{"borderRadius":"8px","boxShadow":"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
    {bio && (
    <Fragment>
        <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
        <p>{bio}</p>
    </Fragment>)}
   
    <div className="line"></div>
    <h2 className="text-primary">Skill Set</h2>
    <div className="skills">      
        {skills.map((skill,index)=>(
            <div key={index} className="p-1"><i className="fas fa-check"></i> {skill}</div>
        ))}
    </div>
  </div>
  )
}

export default ProfileAbout