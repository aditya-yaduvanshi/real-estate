import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';
import GoogleAuth from '../auths-external/google-auth';
import FbAuth from '../auths-external/fb-auth';

const Login = ({ login, isAuthenticated }) => {
  const [ formData, setFormData ] = useState({
    email: '',
    password: ''
  });
  const {email, password} = formData;
  const handleChange = (event)=>setFormData({...formData, [event.target.name]: event.target.value});
  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };
  if(isAuthenticated)
    return <Redirect to='/' />
  
  return (
    <div className="auth">
      <Helmet>
        <title>Real Estate | LogIn</title>
        <meta name="description" content="Real estate login page." />
      </Helmet>
      <div className="auth__wrapper">
        <h1 className="auth__title">Log In</h1>
        <p className="auth__lead">Login to your Account</p>
        <form className="auth__form" onSubmit={event => handleSubmit(event)} >
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
            type="password" placeholder="Password" 
            name="password" 
            onChange={event => handleChange(event)} 
            value={password} required
            autoComplete="current-password"
            minLength="6" />
          </div>
          <div className="auth__form__group auth__form__group__submit">
            <button className="auth__form__input auth__form__input__submit">Log In</button>
          </div>
        </form>
        <p className="auth__text">
          Don't have an account? 
          <Link to='/signup' className="auth__text__link" >Sign Up</Link>
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);