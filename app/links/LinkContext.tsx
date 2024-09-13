"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { UserType } from "./page";

export type LinkObject = {
  platformOption: string;
  linkText: string;
};

interface LinkContextType {
  createLinkObjects: LinkObject[];
  name: string;
  email: string;
  image: string;
  setUserData: (user: UserType) => void;
  editName: (name: string) => void;
  editEmail: (email: string) => void;
  editImage: (image: string) => void;
  addLink: (platform: string, link: string) => void;
  removeLink: (id: number) => void;
  editLink: (id: number, platform: string, link: string) => void;
  moveLink: (fromIndex: number, toIndex: number) => void;
  saveLinks: () => Promise<{success: boolean; message: string}>;
  saveProfile: () => Promise<{success: boolean; message: string}>;
}

const LinkContext = createContext<LinkContextType | undefined>(undefined);

export const LinkProvider = ({ children }: { children: ReactNode }) => {
  const { status, data: session } = useSession();
  const [createLinkObjects, setCreateLinkObjects] = useState<LinkObject[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [user, setUser] = useState<UserType | null>(null);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (status === "loading") return;
      if (status === "unauthenticated") return;
  
      if (status === "authenticated" && user?.email) {
        try {
          const response = await fetch(`/api/fetchUserData?email=${user.email}`);
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          const data = await response.json();
          if (data) {
            setUserId(data.id);
            setName(data.name);
            setEmail(data.email);
            setImage(data.image);
            setCreateLinkObjects(data.createLinkObjects as LinkObject[]);
          } else {
            console.error("No data returned from fetchUserData");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
  
    fetchData();
  }, [status, user]);


  const saveLinks = async () => {
    try {
      const response = await fetch(`/api/saveUserLinks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          createLinkObjects: createLinkObjects
        })
      });
  
      const data = await response.json();
      const { success, message } = data;
      return { success, message };
    } catch (error) {
      console.error("Error saving links:", error);
      return { success: false, message: "Error saving links" };
    }
  };
  

  const saveProfile = async () => {
    try {
      const response = await fetch(`/api/saveUserProfile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          name: name,
          email: email,
          image: image
        })
      });
  
      const data = await response.json();
      const { success, message } = data;
      return { success, message };
    } catch (error) {
      console.error("Error saving profile:", error);
      return { success: false, message: "Error saving profile" };
    }
  };
  

  const setUserData = (user: UserType) => {
    setUser(user);
  };

  //on mount, we're going to use effect hook to pull the user links data and be updating it when they click "save" with a 
  //function to patch the links data of the user in the database...

  const addLink = (platform: string, link: string) => {
    setCreateLinkObjects((prevLinks) => [...prevLinks, { platformOption: platform, linkText: link }]);
  };

  const removeLink = (id: number) => {
    setCreateLinkObjects((prevLinks) => prevLinks.filter((_, index) => index !== id));
  };

  const editLink = (id: number, platform: string, link: string) => {
    setCreateLinkObjects((prevLinks) =>
      prevLinks.map((linkObj, index) =>
        index === id ? { platformOption: platform, linkText: link } : linkObj
      )
    );
  };

  const moveLink = (fromIndex: number, toIndex: number) => {
    setCreateLinkObjects((prevLinks) => {
      const updatedLinks = [...prevLinks];
      const [movedLink] = updatedLinks.splice(fromIndex, 1); // Remove the dragged item
      updatedLinks.splice(toIndex, 0, movedLink); // Insert it at the new position
      return updatedLinks;
    });
  };

  const editName = (name: string) => {
    setName(name);
  }

  const editEmail = (email: string) => {
    setEmail(email);
  }

  const editImage = (image: string) => {
    setImage(image);
  }

  return (
    <LinkContext.Provider value={{ createLinkObjects, name, email, image, setUserData, addLink, removeLink, editLink, moveLink, editName, editEmail, editImage, saveLinks, saveProfile }}>
      {children}
    </LinkContext.Provider>
  );
};

export const useLinkContext = () => {
  const context = useContext(LinkContext);
  if (!context) {
    throw new Error("useLinkContext must be used within a LinkProvider");
  }
  return context;
};
