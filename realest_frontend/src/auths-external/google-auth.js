// client id 727267872665-surh919obg80m1rt76vao65jto6ds3vq.apps.googleusercontent.com
import GoogleLogin from 'react-google-login';


const GoogleAuth = () => {
  const responseGoogle = (response) => {
    console.log(response);
  }
  return (
    <GoogleLogin
      clientId="727267872665-surh919obg80m1rt76vao65jto6ds3vq.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      theme="dark"
      className="google-auth"
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default GoogleAuth;
/* 
<GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    render={renderProps => (
      <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
    )}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
*/