import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import config from '../../../../server/config.js';

const clientId =
  '321257595853-ompbh8dj5e9dg3rgo147ub5hkffsf3pt.apps.googleusercontent.com';

function Login(props) {
  const onSuccess = (res) => {
    // console.log('currentUser:', res.profileObj);
    axios.post(`${config.api_url}/users/create`, {
      first_name: res.profileObj.givenName,
      last_name: res.profileObj.familyName,
      email: res.profileObj.email,
      googleId: res.profileObj.googleId,
      avatar: res.profileObj.imageUrl
    })
    .then(function (response) {
      // console.log('google login reponse', response)
      if (response.data.code) {
        //user already exists. send axios to log in and send back id information
        axios.post(`${config.api_url}/users/auth`, {
          email: res.profileObj.email,
          googleId: res.profileObj.googleId
        })
        .then(function (response) {
          if (typeof(response.data) === "object"){
            props.setUserId(response.data.id);
            props.setUserName(res.profileObj.name);
            props.setLogin(true);
          } else {
            alert('Something went wrong! Please try again in a few minutes.')
          }
        })
        .catch(function (error) {
          alert('Something went wrong! Please try again in a few minutes.')
          console.log(error);
        });
      } else if (response.data.command){
        // create user was successful. send axios request to get id
        axios.post(`${config.api_url}/users/auth`, {
          email: res.profileObj.email,
          googleId: res.profileObj.googleId
        })
        .then(function (response) {
          if (typeof(response.data) === "object"){
            props.setUserId(response.data.id);
            props.setUserName(res.profileObj.name);
            props.setLogin(true);
          } else {
            alert('Something went wrong! A different error occured.')
          }
        })
      } else {
        alert('Something went wrong! Please try again in a few minutes.')
      }
    })
    .catch(function (error) {
      alert('Something went wrong! Please try again in a few minutes.')
      console.log(error);
    })
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login.`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
