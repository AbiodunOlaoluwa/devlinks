"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type LinkObject = {
  platformOption: string;
  linkText: string;
};

interface LinkContextType {
  createLinkObjects: LinkObject[];
  name: string;
  email: string;
  image: string;
  editName: (name: string) => void;
  editEmail: (email: string) => void;
  editImage: (image: string) => void;
  addLink: (platform: string, link: string) => void;
  removeLink: (id: number) => void;
  editLink: (id: number, platform: string, link: string) => void;
  moveLink: (fromIndex: number, toIndex: number) => void;
}

const LinkContext = createContext<LinkContextType | undefined>(undefined);

export const LinkProvider = ({ children }: { children: ReactNode }) => {
  const [createLinkObjects, setCreateLinkObjects] = useState<LinkObject[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string>("");

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
    <LinkContext.Provider value={{ createLinkObjects, name, email, image, addLink, removeLink, editLink, moveLink, editName, editEmail, editImage }}>
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
