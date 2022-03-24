import React , {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import { getCurrentProfile} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import defaultAvatar from '../../img/defaultAvatar.png'



/*import { deleteAccount } from '../../actions/profile'*/

const Dashboard = ({getCurrentProfile, auth: {user}, profile: {profile, loading}, /*deleteAccount*/}) => {
  
  useEffect(()=>{
    getCurrentProfile()


  },[getCurrentProfile])


  return loading && profile === null ? <Spinner/>:
  <Fragment>
   <h1 className='large text-primary'>Dashboard</h1>
   <p className="lead">
     <i className="fas fa-user"></i>{' '}Welcome <strong>{user && user.name}</strong>
   </p>
   
   {profile !== null ? 
   (<Fragment>
     <Link to={`/profile/${user._id}`}>
      <img className='round-img' style={{"width":"200px", "height":"200px", "marginBottom":"1rem", "border":"2px solid #1877f2"}} src={user.avatar? user.avatar.url: defaultAvatar} alt="" />
      </Link> 
     
     <DashboardActions/>
   

     <Experience experience={profile.experience}/>
     <Education education={profile.education}/>
     {/*<div className="my-2">
       <button className="btn btn-danger" onClick={() => deleteAccount()}>
         <i className="fas fa-user-minus"></i>{' '}Delete My Account
       </button>
     </div>*/}
   </Fragment>):
   (<Fragment>
     <p>You have not yet setup a profile, please add some info</p>
     <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
   </Fragment>)}
   
   
  </Fragment>
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps,{getCurrentProfile,/*deleteAccount*/})(Dashboard)