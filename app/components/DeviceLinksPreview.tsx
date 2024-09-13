// "use client";
import "./deviceLinksPreview.css";
import { LinkObject } from "../links/page";
import rightArrow from "@/app/images/icon-arrow-right.svg";
import github from "@/app/images/icon-github.svg";
import frontendMentor from "@/app/images/icon-frontend-mentor.svg";
import twitter from "@/app/images/icon-twitter.svg";
import linkedIn from "@/app/images/icon-linkedin.svg";
import youTube from "@/app/images/icon-youtube.svg";
import faceBook from "@/app/images/icon-facebook.svg";
import twitch from "@/app/images/icon-twitch.svg";
import devTo from "@/app/images/icon-devto.svg";
import codeWars from "@/app/images/icon-codewars.svg";
import codepen from "@/app/images/icon-codepen.svg";
import freeCodeCamp from "@/app/images/icon-freecodecamp.svg";
import gitLab from "@/app/images/icon-gitlab.svg";
import hashNode from "@/app/images/icon-hashnode.svg";
import stackOverFlow from "@/app/images/icon-stack-overflow.svg";
import personalSite from "@/app/images/icon-link copy.svg";
import Image from "next/image";

type DevicePreviewProps = {
  linkArray: LinkObject[];
  name: string;
  email: string;
  image: string;
}

const DeviceLinksPreview = (props: React.PropsWithChildren<DevicePreviewProps>) => {
  const {linkArray, name, email, image} = props;

  const getImageSource = (platformOption: string) => {
    switch (platformOption) {
      case "GitHub":
        return github;
      case "Frontend Mentor":
        return frontendMentor;
      case "Twitter":
        return twitter;
      case "LinkedIn":
        return linkedIn;
      case "YouTube":
        return youTube;
      case "Facebook":
        return faceBook;
      case "Twitch":
        return twitch;
      case "Dev.to":
        return devTo;
      case "Codewars":
        return codeWars;
      case "Codepen":
        return codepen;
      case "freeCodeCamp":
        return freeCodeCamp;
      case "GitLab":
        return gitLab;
      case "Hashnode":
        return hashNode;
      case "Stack Overflow":
        return stackOverFlow;
      case "Personal Site":
        return personalSite;
      default:
        return ""; // Return an empty string or a default icon if needed
    }
  };

  const getBgColorClass = (platformOption: string) => {
    switch (platformOption) {
      case "GitHub":
        return "github";
      case "Frontend Mentor":
        return "frontendMentor";
      case "Twitter":
        return "twitter";
      case "LinkedIn":
        return "linkedIn";
      case "YouTube":
        return "youTube";
      case "Facebook":
        return "facebook";
      case "Twitch":
        return "twitch";
      case "Dev.to":
        return "devTo";
      case "Codewars":
        return "codeWars";
      case "Codepen": 
        return "codepen"
      case "freeCodeCamp":
        return "freeCodeCamp";
      case "GitLab":
        return "gitLab";
      case "Hashnode":
        return "hashNode";
      case "Stack Overflow":
        return "stackOverFlow";
      case "Personal Site":
        return "personalSite";
      default:
        return ""; // Return a default class if needed
    }
  };

  return (
    <div className="previewContainer">
      <div className="deviceOutline">
        <div className="outerOutline">
          <div className="innerOutline">
            <div className="outlineContent">
              <div className="profileContent">
                <svg className="profilePhotoAlternative" xmlns="http://www.w3.org/2000/svg" width="97" height="96" viewBox="0 0 97 96" fill="none">
                  <circle cx="48.5" cy="48" r="48" fill="#EEEEEE" />
                </svg>
                <div className="nameAndDescription">
                  {name === "" ? 
                  <div className="nameAlternative"></div>
                  :
                  <div className="nameContainer">{name}</div>
                }
                  {email === "" ? 
                  <div className="descriptionAlternative"></div> 
                  :
                  <a href={`mailto:${email}`}>
                  <div className="emailContainer">{email}</div>
                  </a>
                }
                </div>
              </div>
              <div className="linksListBox">
                {props.linkArray?.length === 0 ? (
                  <>
                    <div className="linkBoxAlternative"></div>
                    <div className="linkBoxAlternative"></div>
                    <div className="linkBoxAlternative"></div>
                    <div className="linkBoxAlternative"></div>
                    <div className="linkBoxAlternative"></div>
                  </>
                ) : (
                  props.linkArray?.map((link, index) => (
                    (link.platformOption && link.linkText) ? 
                    <a key={index} href={link.linkText} target="_blank" className={`linkBox`}>
                    <div className={`linkBoxAlternative ${getBgColorClass(link.platformOption)} whiteText`}>
                      <div className="imgTextBox">
                        <Image src={getImageSource(link.platformOption)} alt={`${link.platformOption} logo`} />
                        <p className="linkText">{link.platformOption}</p>
                      </div>
                      <div className="rightArrowContainer">
                        <Image src={rightArrow} alt="rightArrow" />
                      </div>
                    </div>
                    </a>
                    : null
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceLinksPreview;
