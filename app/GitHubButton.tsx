"use client"

import "./githubButton.css";
import Image from "next/image";
import github from "@/public/github.svg";
import React from "react";
import Spinner from "@/app/components/Spinner";

type Props = {
    handleGitHubSignIn: (e: React.FormEvent) => void;
    loading: boolean;
}

const GitHubButton = ({handleGitHubSignIn, loading}: Props) => {

  

  return (
    <div className="gitHubButtonContainer">
        <button type="button" className="gitHubButton" onClick={handleGitHubSignIn}>
            {
              loading ? <Spinner color={"black"} /> : 
              <><Image 
            className="githubLogo"
            src={github} 
            alt="github" 
            width={26} 
            height={26} />
            <p>Sign In With GitHub</p></>
            }
        </button>
    </div>
  )
}

export default GitHubButton;