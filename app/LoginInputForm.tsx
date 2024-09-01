"use client";

import Image from "next/image";
import envelope from "@/public/emailEnvelope.svg";
import lock from "@/public/passwordKeylock.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Spinner from "@/app/components/Spinner";
import {signIn } from "next-auth/react";


type Credentials = {
  email: string;
  password: string;
};

const LoginInputForm = () => {

  const [isCredentialValid, setCredentialValid] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("Try Again");
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const router = useRouter();
  

  useEffect(() => {
    if (credentials.email && credentials.password) {
      setCredentialValid(true);
    }
    else if (credentials.email === "" || credentials.password === "") {
      setCredentialValid(false);
    }
  }, [credentials])



  const handleCredChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setError(false);
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[:;/\,|"'`]/g, "");
    setCredentials((prevValues) => ({ ...prevValues, [name]: sanitizedValue }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const email = credentials.email;
    const password = credentials.password;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log(res);
      if (!res?.error) {
        router.push("/links");
        router.refresh();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(true)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="inputElements">
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
            <input
              autoFocus
              onChange={handleCredChange}
              value={credentials.email}
              className="credentialInputElement"
              id="emailInput"
              type="email"
              pattern={`[^"'\`]*`}
              name="email"
              placeholder="e.g. alex@email.com" />
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
            <input
              onChange={handleCredChange}
              value={credentials.password}
              className="credentialInputElement"
              id="passwordInput"
              type="password"
              pattern={`[^"'\`]*`}
              name="password"
              placeholder="Enter your password" />
            <p className={`${error && `errorText`} ${!error && `hidden`}`}>{errorText}</p>
          </div>
        </label>
      </div>
      <div className="loginButtonContainer">
        <button type="submit" disabled={!isCredentialValid} className={`loginButton ${!isCredentialValid && 'disabled'}`}>
          {
            loading ?
                       <Spinner />  :
              "Login"
          }
        </button>
      </div>
      <div className="redirectLinkContainer">
        <p className="redirectLinkText">
          Don&apos;t have an account? <span className="purpleText"><a href="/createaccount">Create account</a></span>
        </p>
      </div>
    </form>
  )
}

export default LoginInputForm;