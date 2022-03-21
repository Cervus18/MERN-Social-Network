import React, {Fragment, useEffect} from 'react'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'
import { getFollowings } from '../../actions/profile'

const Profiles = ({getProfiles,getFollowings, profile:{profiles, loading},match}) => {

useEffect(()=>{
    getProfiles(match.params.query) 

    getFollowings()
},[getProfiles,getFollowings,match.params.query])

 
  return (
    <Fragment>
        {loading ? <Spinner/>: <Fragment>
            <h1 className="large text-primary">Results of users with the name "{match.params.query}"</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i> Browse and connect with developers
            </p>
            <div className="profiles">
                {profiles.length > 0 ? (
                    profiles.map(profile => (
                        <ProfileItem key={profile._id} profile={profile}/>
                    ))
                ):  (<h4>No profiles found</h4>)}
            </div>
            </Fragment>}
    </Fragment>
  )
}

const mapStateToProps = state =>({
  profile:state.profile
})

export default connect(mapStateToProps,{getProfiles,getFollowings})(Profiles)