"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useLinkContext } from "../links/LinkContext";
import Spinner from "../components/Spinner";
import { useRouter } from "next/navigation";
import "./preview.css";
import "@/app/components/deviceLinksPreview.css";
import { UserType } from "../links/page";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Clipboard from "clipboard";
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


const PreviewContent = () => {

  const { createLinkObjects, name, email, image, userId, setUserData } = useLinkContext();
  const { status, data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [shareLinkLoading, setShareLinkLoading] = useState(false);
  const [link, setLink] = useState("");
  const [linkId, setLinkId] = useState("");
  const [linkCopy, setLinkCopy] = useState(false);




  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      setLoading(false);
      setUserData(session.user as UserType);
      setTimeout(() => setLoading(false), 600);
      if (process.env.NODE_ENV === "development") setLink(`http://localhost:3000/${userId}`);
      else if (process.env.NODE_ENV === "production") setLink(`https://aosdevlinks.vercel.app/${userId}`);
    }

  }, [userId, status, session, setUserData, router])

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


  const handleLinkInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLink(event.target.value);
  };

  const updateLinkId = async (newLinkId: string) => {
    try {
      const response = await fetch("/api/updateSharableLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sharableId: userId, newLinkId }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to update your link");
      }

      const result = await response.json();

      return result.success;
    } catch (error: any) {
      toast.error(error.message || "An error has occured while updating the link.");
      return false;
    }
  }

  const handleShareClick = async () => {
    setShareLinkLoading(true);

      const url = new URL(link);
      const newLinkId = url.pathname.replace("/", "");
      console.log(newLinkId)

      if (!newLinkId) {
        toast.error("Invalid Link.");
        return;
      }

      const success = await updateLinkId(newLinkId);

      if (success) {
        toast.success("Your Link has been updated Succesfully.");
        const clipboard = new Clipboard(".shareButton", {
          text: () => link,
        });
        clipboard.on("success", () => {
          toast.success("Your link has been copied to the clipboard!");
          clipboard.destroy();
        });
        clipboard.on("error", () => {
          toast.error("Failed to copy the link.");
          clipboard.destroy();
        })
        setShareLinkLoading(false);
        setLinkCopy(true);
        setTimeout(() => setLinkCopy(false), 1500);
      } else {
        setShareLinkLoading(false);
        toast.error("Failed to update your link. Please try a different one.")
      }
  }

  return (
    <div className="mainPreviewContainer">
      <Toaster />
      <div className="navBarContainer">
        {loading ? <Spinner color="black" /> : <Link className="backToEditor" href={"/links"} onClick={() => setLoading(true)}>Back to Editor</Link>}
        <div className="shareLinkTextContainer">
          <input autoFocus autoComplete="off" onChange={handleLinkInputChange} type="text" name="link" id="link" className="shareLinkTextInput" value={link} />
        </div>
        <button className="shareButton" onClick={handleShareClick}>{shareLinkLoading ? <Spinner color="white" /> : linkCopy ? "Copied!" : "Share Link"}</button>
      </div>
      <div className="previewBox">
        <div className="outlineContent">
          <div className="profileContent">
            {
              image === "" ?
                <div className="profilePhotoSkeleton skeleton"></div>
                :
                <div className="profilePhotoContainer">
                  <Image
                    src={image}
                    alt="userProfilePhoto"
                    width={97}
                    height={97}
                    className="profilePhoto"
                  />
                </div>
            }
            <div className="nameAndDescription">
              {name === "" ?
                <div className="nameSkeleton skeleton"></div>
                :
                <div className="nameContainer">{name}</div>
              }
              {email === "" ?
                <div className="emailSkeleton skeleton"></div>
                :
                <a href={`mailto:${email}`}>
                  <div className="emailContainer">{email}</div>
                </a>
              }
            </div>
          </div>
          <div className="linksListBox">
            {createLinkObjects?.length === 0 ? (
              <>
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="linkSkeleton skeleton"></div>
                ))}
              </>
            ) : (
              createLinkObjects?.map((link, index) => (
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
  )
}

export default PreviewContent;