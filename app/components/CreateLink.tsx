"use client";
import { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import "./createLinks.css";
import Image from 'next/image';
import draganddropIcon from "@/app/images/icon-drag-and-drop.svg";
import { LinkObject, useLinkContext } from "@/app/links/LinkContext";

type CreateLinkProps = {
    key: number;
    id: number;
    index: number;
    deleteLink: (id: number) => void;
    platformOption: string;
    linkText: string;
    createLinkObjects: LinkObject[];
    setAppPlatform: Dispatch<SetStateAction<string>>;
    setAppLink: Dispatch<SetStateAction<string>>;
};

const ITEM_TYPE = "LINK";

const CreateLink: React.FC<CreateLinkProps> = ({
    id,
    index,
    deleteLink: deleteLink,
    platformOption,
    linkText,
    createLinkObjects,
    setAppPlatform,
    setAppLink,
}) => {

    const { editLink, moveLink } = useLinkContext();
    const [platform, setPlatform] = useState(platformOption || "")
    const [link, setLink] = useState(linkText || "");
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (platformOption && linkText) {
            setPlatform(platformOption);
            setLink(linkText);
        }
    }, [platformOption, linkText])

    const getLinkPrefix = (platformOption: string) => {
        switch (platformOption) {
          case "GitHub":
            return "https://github.com/";
          case "Frontend Mentor":
            return "https://frontendmentor.io/";
          case "Twitter":
            return "https://x.com/";
          case "LinkedIn":
            return "https://linkedin.com/in/";
          case "YouTube":
            return "https://youtube.com/";
          case "Facebook":
            return "https://facebook.com/";
          case "Twitch":
            return "https://twitch.com/";
          case "Dev.to":
            return "https://dev.to/";
          case "Codewars":
            return "https://codewars.com/users/";
          case "Codepen": 
            return "https://codepen.io/"
          case "freeCodeCamp":
            return "https://freecodecamp.org/";
          case "GitLab":
            return "https://gitlab.com/";
          case "Hashnode":
            return "https://hashnode.com/@";
          case "Stack Overflow":
            return "https://stackoverflow.com/users/";
          case "Personal Site":
            return "https://";
          default:
            return ""; // Return a default class if needed
        }
      };

    const [{ isDragging }, drag] = useDrag({
        type: ITEM_TYPE,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover: (item: { index: number }, monitor) => {
            if (item.index !== index) {
                moveLink(item.index, index); // Call moveLink when the item is hovered
                item.index = index; // Update the dragged item's index
            }

            const container = containerRef.current;
            if (!container) return;

            const { x, y } = monitor.getClientOffset() || { x: 0, y: 0 };
            const rect = container.getBoundingClientRect();

            const edgeThreshold = 35; // Distance from the edge to trigger scrolling
            const scrollSpeed = 10; // Pixels to scroll per interval

            if (y - rect.top < edgeThreshold) {
                container.scrollTop -= scrollSpeed; // Scroll up
            } else if (rect.bottom - y < edgeThreshold) {
                container.scrollTop += scrollSpeed; // Scroll down
            }
        },
    });

    // Function to handle touch move and autoscroll for touch devices
    const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const y = touch.clientY;

        const edgeThreshold = 35; // Distance from the edge to trigger scrolling
        const scrollSpeed = 10; // Pixels to scroll per interval

        if (y - rect.top < edgeThreshold) {
            container.scrollTop -= scrollSpeed; // Scroll up
        } else if (rect.bottom - y < edgeThreshold) {
            container.scrollTop += scrollSpeed; // Scroll down
        }
    };

    // Attach touch event listeners
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener("touchmove", handleTouchMove);

        // Cleanup function to remove event listeners
        return () => {
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    function handlePlatformChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        setAppPlatform(event.target.value);
        setPlatform(event.target.value);
        editLink(index, event.target.value, getLinkPrefix(event.target.value));
    }

    function handleLinkChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setAppLink(event.target.value);
        setLink(event.target.value);
        editLink(index, platform, event.target.value);
    }

    const combinedRef = (node: HTMLDivElement | null) => {
        drag(node); // Attach drag behavior
        drop(node); // Attach drop behavior
    };

    return (
        <div ref={combinedRef} className={`createLinkContainer ${isDragging ? "dragging" : ""}`}>
            <div className="container">
                <div className="createLinkHeader">
                    <div className="createLinkDnDSN">
                        <Image src={draganddropIcon} alt='draganddrop' />
                        <p><span>Link #
                            {index + 1}
                        </span></p>
                    </div>
                    <p onClick={() => {
                        deleteLink(id)
                    }} className="createLinkRemoveButton">Remove</p>
                </div>
                <div className="inputBox">
                    <div className="platform">
                        <label htmlFor="platform">Platform</label>
                        <br />
                        <div className="selectContainer">
                            <select name="platform" id="platform" onChange={handlePlatformChange} value={platform}>
                                <option value="">Select a Platform</option>
                                <hr />
                                <option value="GitHub">GitHub</option>
                                <hr />
                                <option value="Frontend Mentor">Frontend Mentor</option>
                                <hr />
                                <option value="Twitter">Twitter</option>
                                <hr />
                                <option value="LinkedIn">LinkedIn</option>
                                <hr />
                                <option value="YouTube">YouTube</option>
                                <hr />
                                <option value="Facebook">Facebook</option>
                                <hr />
                                <option value="Twitch">Twitch</option>
                                <hr />
                                <option value="Dev.to">Dev.to</option>
                                <hr />
                                <option value="Codewars">Codewars</option>
                                <hr />
                                <option value="Codepen">Codepen</option>
                                <hr />
                                <option value="freeCodeCamp">freeCodeCamp</option>
                                <hr />
                                <option value="GitLab">GitLab</option>
                                <hr />
                                <option value="Hashnode">Hashnode</option>
                                <hr />
                                <option value="Stack Overflow">Stack Overflow</option>
                                <hr />
                                <option value="Personal Site">Personal Site</option>

                            </select>
                        </div>
                    </div>
                    <div className="link">
                        <label htmlFor="link">Link</label>
                        <br />
                        <div className="linkInputContainer">
                            <svg className="link-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#737373" d="M8.523 11.72a.749.749 0 0 1 0 1.063l-.371.371A3.751 3.751 0 1 1 2.847 7.85l1.507-1.506A3.75 3.75 0 0 1 9.5 6.188a.753.753 0 0 1-1 1.125 2.25 2.25 0 0 0-3.086.091L3.908 8.91a2.25 2.25 0 0 0 3.183 3.183l.37-.371a.748.748 0 0 1 1.062 0Zm4.63-8.874a3.756 3.756 0 0 0-5.305 0l-.371.37A.751.751 0 1 0 8.539 4.28l.372-.37a2.25 2.25 0 0 1 3.182 3.182l-1.507 1.507a2.25 2.25 0 0 1-3.086.09.753.753 0 0 0-1 1.125 3.75 3.75 0 0 0 5.144-.152l1.507-1.507a3.756 3.756 0 0 0 .002-5.307v-.001Z" /></svg>
                            <input type="text" className="linkTextInput" value={link} onChange={handleLinkChange} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateLink