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
    const [credentials, setCredentials] = useState<Credentials>({
      email: "",
      password: "",
    })
  
    useEffect(() => {
      if(credentials.email && credentials.password) {
        setCredentialValid(true);
      }
      else if (credentials.email === "" || credentials.password === "") {
        setCredentialValid(false);
      }
    }, [credentials])
  
  
  
    const handleCredChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
      const {name, value} = e.target;
  
      setCredentials((prevValues) => ({...prevValues, [name]: value}));
    }

  return (
    <div className="inputElements">
            <div className="credentialsInputContainer">
              <label htmlFor="emailInput" className="credentialInputContainer">
                <p className="labelText">Email address</p>
                <div className="credentialInputElementContainer">
                  <Image 
                  width={16}
                  height={16}
                  src={envelope} 
                  alt="envelope" 
                  />
                  <input onChange={handleCredChange} className="credentialInputElement" id="emailInput" type="email" name="email" placeholder="e.g. alex@email.com" />
                </div>
              </label>
            </div>
            <div className="credentialInputContainer">
              <label htmlFor="passwordInput" className="credentialInputContainer">
                <p className="labelText">Password</p>
                <div className="credentialInputElementContainer">
                  <Image 
                  width={16}
                  height={16}
                  src={lock} 
                  alt="padlock" />
                  <input onChange={handleCredChange} className="credentialInputElement" id="passwordInput" type="password" name="password" placeholder="Enter your password" />
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