import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import Searchbar from './Searchbar'
import logo from '../../img/logo.png'
import { useSelector } from 'react-redux'

const Navbar = ({auth: { isAuthenticated, loading}, logout}) => {
  
  const profile = useSelector(state=> state.profile.profile)

  const authLinks = (
    <ul>
      {/*<li>
        <Link to="/profiles">Developers</Link>
  </li>*/}
     {profile && 
     <>
      <li>
        <Link to="/posts">Posts</Link>
     </li>
     <li>
       <Link to="/messenger">Messages</Link>
     </li>
     </>
    
     
     }

     <li>
        <Link to="/dashboard"> <i className="fas fa-user" />{' '} <span className="hide-sm">Dashboard</span></Link>
     </li>
     <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      {/*<li>
        <Link to="/profiles">Developers</Link>
      </li>*/}
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/" ><span style={{"display":"flex"}}><img src={logo} style={{"width":"40px","marginRight":"8px"}} alt="" /> <span>DevConnector</span></span></Link>
      </h1>
      <Searchbar/>
     {!loading  &&  (<>{isAuthenticated ? authLinks: guestLinks}</>)}
    </nav>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar)