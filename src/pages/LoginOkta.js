import React, { useState } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios'
import  {useForm} from 'react-hook-form'
import { useHistory } from "react-router-dom";

const LoginForm = ({ issuer }) => { 
  const { authService } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {handleSubmit, register, errors} = useForm();
  const history = useHistory();
  const [loginError, setLoginError] = useState("")
  
  const onSubmit = values => {
    console.log("these are the values in values", values)
    const oktaAuth = new OktaAuth({ issuer: issuer });
    const username = values.email
    const password = values.password
    oktaAuth.signIn({ username: username,  password: password })
      .then(res => {
        res.user.sessionToken = res.data.sessionToken;
        axios.post(`${process.env.REACT_APP_BE_API_URL}/auth/okta/verify`, res.user)
        .then(res=>{
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('id', res.data.id)
          history.push(`/profile`)
        })
        })
      .catch(err => {
        console.log('Failed to login', err)
        setLoginError("The username or password you entered was incorrect")
      });
  };

  // const handleUsernameChange = (e) => {
  //   setUsername(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  if (sessionToken) {
    authService.redirect({ sessionToken });
    return null;
  }
  
  
  return (
    <div className='loginHero'>
      <form className='oktaForm' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='oktaTitle'>Welcome to Sauti Design Studio</h2>
          {loginError.length > 0 ? <span className="oktaError">{loginError}</span> : <></>}
        <label className='oktaLabel'>
          Email:
          <input
            className='oktaInput' type="text" name="email" placeholder="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} 
           />
           {errors.email && <span className="oktaError">Please use a valid email address"</span>}
        </label>
        <label className='oktaLabel'>
          Password:
          <input
           className='oktaInput' type="password" name="password" placeholder="password" ref={register({ required: true, minLength:{ value: 8, message: "Password must have at least 8 characters"}, pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/i, message: " your password must contain at least one upper case letter, one lower case letter and one number" }  })}
             />
             {errors.password && <span className="oktaError">{errors.password.message}</span>}
        </label>
        <input className='oktaSubmit' id="submit" type="submit" value="Submit" />
        <p className='oktaSignUp'>Don't have an account?</p>
        <button className="oktaSubmit" onClick={()=>history.push("/register")}>Create one here</button>
      </form>
      {console.log("this is errors", errors)}
    </div>
  );
};
export default LoginForm;