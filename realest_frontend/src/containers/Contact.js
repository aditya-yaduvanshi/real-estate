import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { setAlert } from '../actions/alert';
import PropTypes from 'prop-types';


const Contact = () => {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const {name, email, subject, message} = formData;
  const [loading, setLoading] = useState(false)
  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    axios.defaults.headers = {
      'Content-Type': 'application/json'
    }
    setLoading(true)
    axios.post('http://localhost:8000/api/contacts/', JSON.stringify({
      name,
      email,
      subject,
      message
    })).then(res => {
      setAlert('Message Sent Successfully!', 'success')
      setLoading(false)
      console.log(res.data)
      window.scrollTo(0,0)
    }).catch(err => {
      setAlert('Message could not be sent!', 'error')
      setLoading(false)
      window.scrollTo(0,0)
      console.error(err);
    })
  }

  return (
    <main className="contact">
      <Helmet>
        <title>Real Estate | Contact Us</title>
        <meta name="description" content="Contact us to connect with us. We have over 100+ realtors to help our customer finding best homes in their own budget." />
      </Helmet>
      <div className="contact__form">
        <form onSubmit={event => handleSubmit(event)} width="100%">
          <div className="contact__form__field">
            <label 
              className="contact__form__field__label" 
              htmlFor="name" 
            >Name <span>*</span></label>
            <input 
              type="text" 
              className="contact__form__field__input" 
              name="name" 
              placeholder="Full Name" 
              onChange={event => handleChange(event)} 
              required 
              value={name}
            />
          </div>
          <div className="contact__form__field">
            <label 
              className="contact__form__field__label" 
              htmlFor="email" 
            >Email <span>*</span></label>
            <input 
              type="email" 
              className="contact__form__field__input" 
              name="email" 
              placeholder="Email Address" 
              onChange={event => handleChange(event)} 
              required 
              value={email}
            />
          </div>
          <div className="contact__form__field">
            <label 
              className="contact__form__field__label" 
              htmlFor="subject" 
            >Subject <span>*</span></label>
            <input 
              type="text" 
              className="contact__form__field__input" 
              name="subject" placeholder="Subject" 
              onChange={event => handleChange(event)} 
              required
              value={subject} 
            />
          </div>
          <div className="contact__form__field">
            <label className="contact__form__field__label" htmlFor="message" >Message</label>
            <textarea 
              className="contact__form__field__textarea" 
              name="message" 
              placeholder="Message..." 
              onChange={event => handleChange(event)} 
              value={message}
            ></textarea>
          </div>
          <div className="contact__form__field contact__form__field__submit">
            <button 
              type="submit" 
              className="contact__form__field__button"
            >
              {loading ? (
                <label className="contact__form__field__button__loader">
                  <Loader 
                    type='Oval'
                    color='#FFF'
                    height={15}
                    width={15} 
                  />
                </label>
              ) : (
                <>
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

Contact.propTypes = {
  setAlert: PropTypes.func.isRequired
}

export default connect(null, {setAlert})(Contact);