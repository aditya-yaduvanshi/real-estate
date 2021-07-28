import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import PropTypes from 'prop-types';
import { setAlert } from '../actions/alert';
import GoogleAuth from '../auths-external/google-auth';
import FbAuth from '../auths-external/fb-auth';

const Signup = ({ setAlert, signup, isAuthenticated}) => {
  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const {name, email, password, password2} = formData;
  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if(password !== password2) 
      setAlert('Passwords do not matched!', 'error');
    else 
      signup(name, email, password, password2);
  };
  if(isAuthenticated)
    return <Redirect to='/' />
  
  return (
    <div className="auth">
      <Helmet>
        <title>Real Estate | SignUp</title>
        <meta name="description" content="Real estate signup page." />
      </Helmet>
      <div className="auth__wrapper">
        <h1 className="auth__title">Sign Up</h1>
        <p className="auth__lead">Register a new Account</p>
        <form className="auth__form" onSubmit={event => handleSubmit(event)} action="#" method="POST" >
          <div className="auth__form__group">
            <input 
            className="auth__form__input" 
            type="text" 
            placeholder="Name" 
            name="name" 
            onChange={event => handleChange(event)} 
            value={name} required 
            autoComplete="name" />
          </div>
          <div className="auth__form__group">
            <input 
            className="auth__form__input" 
            type="email" 
            placeholder="Email" 
            name="email" 
            onChange={event => handleChange(event)} 
            value={email} required 
            autoComplete="username" />
          </div>
          <div className="auth__form__group">
            <input 
            className="auth__form__input" 
            type="password" placeholder="New Password" 
            name="password" 
            onChange={event => handleChange(event)} 
            value={password} required
            autoComplete="new-password"
            minLength="6" />
          </div>
          <div className="auth__form__group">
            <input 
            className="auth__form__input" 
            type="password" placeholder="Confirm Password" 
            name="password2" 
            onChange={event => handleChange(event)} 
            value={password2} required
            autoComplete="confirm-password"
            minLength="6" />
          </div>
          <div className="auth__form__group auth__form__group__submit">
            <button className="auth__form__input auth__form__input__submit">Sign Up</button>
          </div>
        </form>
        <p className="auth__text">
          Already have an account? 
          <Link to='/login' className="auth__text__link" >Log In</Link>
        </p>
      </div>
      <div className="auth__wrapper__external auth__wrapper">
        <div className="auth__form">
          <div className="auth__form__group auth__form__group__or">
            <span>OR</span>
          </div>
          <div className="auth__form__group">
            <GoogleAuth />
          </div>
          <div className="auth__form__group">
            <FbAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert ,signup })(Signup);