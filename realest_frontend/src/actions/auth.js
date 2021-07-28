import axios from 'axios';
import { setAlert } from './alert';
import { SIGNUP_FAIL, SIGNUP_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({
    email,
    password
  });

  try {
    const res = await axios.post('http://localhost:8000/api/token/', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(setAlert('Logged In Successfully!', 'success'));
  } catch (err) {
    console.error(err);
    dispatch({
      type: LOGIN_FAIL
    });

    dispatch(setAlert('Error Logging In! Please Check Your Email Or Password.', 'error'));
  }
}

export const signup = ( name, email, password, password2 ) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({
    name,
    email,
    password,
    password2
  });

  try {
    const res = await axios.post('http://localhost:8000/api/accounts/signup', body, config);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data
    });

    dispatch(login(email, password));
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL
    });

    dispatch(setAlert('Error Signing Up! Please Check Your Email Or Password.', 'error'));
  }
}

export const logout = () => dispatch => {
  dispatch(setAlert('Logged Out Successfully!', 'success'));
  dispatch({ type: LOGOUT });
}