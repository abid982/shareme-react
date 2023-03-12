import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';

// import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import shareVideo from './../assets/share.mp4';
import logo from './../assets/logo.png';

import { client } from './../client';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const responseGoogle = response => {
    console.log('Response:');
    console.log(response);
  };
  const responseMessage = response => {
    console.log(response);
  };
  const errorMessage = error => {
    console.log(error);
  };

  const login = useGoogleLogin({
    onSuccess: codeResponse => setUser(codeResponse),
    onError: error => console.log('Login Failed:', error),
  });

  // console.log(login);

  useEffect(() => {
    console.log('Use Effect Hook');
    console.log('User:');
    console.log(user);
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        .then(res => {
          // setProfile(res.data);
          console.log('Response user:');
          console.log(res.data);

          // const name = res.data.name;
          // const email = res.data.email;
          // const picture = res.data.picture;
          // const verifiedEmail = res.data.verified_email;

          localStorage.setItem('user', JSON.stringify(res.data));

          const { name, email, id, picture } = res.data;
          console.log(name, email, id, picture);

          // Create new user and save to the database
          const doc = {
            _id: id,
            _type: 'user',
            userName: name,
            image: picture,
          };

          // How to connect frontend with sanity to populate the database
          // Create document if it is already not exists in the database
          client.createIfNotExists(doc).then(() => {
            navigate('/', { replace: true });
          });
        })
        .catch(err => console.log(err));
    }
  }, [user]);

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay={true}
          className="w-full h-full object-cover"
        ></video>
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <button
              type="button"
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={login}
            >
              <FcGoogle className="mr-4" /> Sign in with google
            </button>
            {/* <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              render={renderProps => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            /> */}
            {/* <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={renderProps => (
                // renderProps.onClick is coming from render function which is coming from GoogleLogin
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            /> */}
            {/* <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            /> */}
            {/* <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            /> */}
            {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
          </div>
        </div>
      </div>
    </div>
  );
  // const [user, setUser] = useState([]);
  // const [profile, setProfile] = useState([]);
  // const login = useGoogleLogin({
  //   onSuccess: codeResponse => setUser(codeResponse),
  //   onError: error => console.log('Login Failed:', error),
  // });
  // useEffect(() => {
  //   console.log('Use Effect Hook');
  //   console.log('User:');
  //   console.log(user);
  //   if (user) {
  //     axios
  //       .get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${user.access_token}`,
  //             Accept: 'application/json',
  //           },
  //         }
  //       )
  //       .then(res => {
  //         setProfile(res.data);
  //         console.log('Response user:');
  //         console.log(res.data);
  //       })
  //       .catch(err => console.log(err));
  //   }
  // }, [user]);
  // // log out function to log the user out of google and set the profile array to null
  // const logOut = () => {
  //   googleLogout();
  //   setProfile(null);
  // };
  // return (
  //   <div>
  //     <h2>React Google Login</h2>
  //     <br />
  //     <br />
  //     {profile ? (
  //       <div>
  //         <img src={profile.picture} alt="user image" />
  //         <h3>User Logged in</h3>
  //         <p>Name: {profile.name}</p>
  //         <p>Email Address: {profile.email}</p>
  //         <br />
  //         <br />
  //         <button onClick={logOut}>Log out</button>
  //       </div>
  //     ) : (
  //       <button onClick={() => login()}>Sign in with Google 🚀 </button>
  //     )}
  //   </div>
  // );
};

export default Login;
