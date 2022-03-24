import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { connect } from "react-redux";

const Register = ({ setAlert, register, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({name, email, password})
    }
  };
  
   // Redirect if logged in
   if(isAuthenticated){
    return <Redirect to="/dashboard" />
  }

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
    
      <form style={{"padding":"16px","borderRadius":"16px","background":"#fff","boxShadow":"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}} className="form" onSubmit={(e) => onSubmit(e)}>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <div className="form-group">
          <input
            style={{"background":"#f7f7f7"}}
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            
          />
        </div>
        <div className="form-group">
          <input
            style={{"background":"#f7f7f7"}}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => onChange(e)}
            name="email"
            
          />
  
        </div>
        <div className="form-group">
          <input
            style={{"background":"#f7f7f7"}}
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            style={{"background":"#f7f7f7"}}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);
