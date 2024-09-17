"use client";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import { useLinkContext } from "../links/LinkContext";
import Spinner from "../components/Spinner";
import { useRouter } from "next/navigation";
import "./preview.css";
import { UserType } from "../links/page";
import Link from "next/link";


const PreviewContent = () => {

    const {createLinkObjects, name, email, image, setUserData} = useLinkContext();
    const {status, data: session} = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [link, setLink] = useState(process.env.SHARABLE_LINK!);
    const [linkId, setLinkId] = useState("");


    useEffect(() => {
        if (status === "loading") return;
        if (status === "unauthenticated") {
            router.push("/");
        } else if (status === "authenticated") {
            setUserData(session.user as UserType);
            setTimeout(() => setLoading(false), 600);
        }
    }, [status, session, setUserData, router])

    // useEffect (() => {
    //     const url = new URL(link);
    //     const customlink = url.pathname.replace("/", "");
    //     setLinkId(customlink);
    // }, [link])

    const handleLinkInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setLink(event.target.value);
    };

  return (
    <div className="mainPreviewContainer">
        <div className="navBarContainer">
            <div className="backToEditor"><Link href={"/links"}>Back to Editor</Link></div>
            <div className="shareLinkTextContainer">
                <input onChange={handleLinkInputChange} type="text" name="link" id="link" className="shareLinkTextInput" value={link}  />
            </div>
            <button className="shareButton">Share Link</button>
        </div>
    </div>
  )
}

export default PreviewContent;