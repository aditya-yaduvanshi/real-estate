// client id 6590743080951651
import FacebookLogin from 'react-facebook-login';
import fbLogo from '../assets/fb-sq.png';
 

const FbAuth = () => {
  const responseFacebook = (response) => {
    console.log(response);
  }
  return (
    <FacebookLogin
    appId="6590743080951651"
    autoLoad={false}
    fields="name,email,picture"
    scope="public_profile,email"
    callback={responseFacebook}
    cssClass="fb-auth"
    icon={<div className="fb-icon"><img src={fbLogo} alt="" /></div>}
  />
  );
}

export default FbAuth;