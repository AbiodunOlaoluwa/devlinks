import prisma from "@/prisma/db";
import { notFound } from "next/navigation";
import Image from "next/image";
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
import "@/app/preview/preview.css";
import "@/app/components/deviceLinksPreview.css";

interface LinkPageProps {
    params: {
        linkId: string;
    };
}

export async function generateMetadata({ params }: LinkPageProps) {
    const { linkId } = params;

    // Fetch data associated with the linkid from the Prisma database
    const sharableData = await prisma.sharable.findUnique({
        where: {
            id: linkId, // Assuming your model has a `linkId` field
        },
    });

    if (!sharableData) {
        return {
            title: 'Not Found | devlinks',
            description: 'The requested page was not found.',
        };
    }

    return {
        title: `${sharableData.name} | devlinks`,
        description: 'Custom devlinks page',
    };
}


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


const SharedLinkPage = async ({ params }: LinkPageProps) => {
    const { linkId } = params;

    const sharableData = await prisma.sharable.findUnique({
        where: { id: linkId },
    });


    if (!sharableData) {
        notFound();
    }

    const name: string = sharableData?.name ?? "";
    const email: string = sharableData?.email ?? "";
    const image: string = sharableData?.image ?? "";
    const createLinkObjects: LinkObject[] = sharableData?.createLinkObjects as LinkObject[] ?? [];

    return (
        <div className="mainPreviewContainer">
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

export default SharedLinkPage;