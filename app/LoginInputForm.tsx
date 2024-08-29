"use client";

import Image from "next/image";
import envelope from "@/public/emailEnvelope.svg";
import lock from "@/public/passwordKeylock.svg";
import { useEffect, useState } from "react";

type Credentials = {
    email: string;
    password: string;
  };

const LoginInputForm = () => {

    const [isCredentialValid, setCredentialValid] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("Try Again");
    const [credentials, setCredentials] = useState<Credentials>({
      email: "",
      password: "",
    });
  
    useEffect(() => {
      if(credentials.email && credentials.password) {
        setCredentialValid(true);
      }
      else if (credentials.email === "" || credentials.password === "") {
        setCredentialValid(false);
      }
    }, [credentials])
  
  
  
    const handleCredChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
      setError(false);
      const {name, value} = e.target;
      setCredentials((prevValues) => ({...prevValues, [name]: value}));
    }

  return (
    <div className="inputElements">
            <div className="credentialsInputContainer">
              <label htmlFor="emailInput" className="credentialInputContainer">
                <p className={`labelText ${error && `error`}`}>Email address</p>
                <div className={`credentialInputElementContainer ${error && `error`}`}>
                  <Image 
                  width={16}
                  height={16}
                  src={envelope} 
                  alt="envelope" 
                  />
                  <input autoFocus onChange={handleCredChange} className="credentialInputElement" id="emailInput" type="email" name="email" placeholder="e.g. alex@email.com" />
                  <p className={`${error && `errorText`} ${!error && `hidden`}`}>{errorText}</p>
                </div>
              </label>
            </div>
            <div className="credentialInputContainer">
              <label htmlFor="passwordInput" className="credentialInputContainer">
                <p className={`labelText ${error && `error`}`}>Password</p>
                <div className={`credentialInputElementContainer ${error && `error`}`}>
                  <Image 
                  width={16}
                  height={16}
                  src={lock} 
                  alt="padlock" />
                  <input onChange={handleCredChange} className="credentialInputElement" id="passwordInput" type="password" name="password" placeholder="Enter your password" />
                  <p className={`${error && `errorText`} ${!error && `hidden`}`}>{errorText}</p>
                </div>
              </label>
            </div>
            <div className="loginButtonContainer">
              <button disabled={!isCredentialValid} className={`loginButton ${!isCredentialValid && 'disabled'}`}>Login</button>
            </div>
            <div className="redirectLinkContainer">
              <p className="redirectLinkText">
                Don&apos;t have an account? <span className="purpleText"><a href="/createaccount">Create account</a></span>
              </p>
            </div>
          </div>
  )
}

export default LoginInputForm;