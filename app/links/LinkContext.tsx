"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type LinkObject = {
  platformOption: string;
  linkText: string;
};

interface LinkContextType {
  createLinkObjects: LinkObject[];
  addLink: (platform: string, link: string) => void;
  removeLink: (id: number) => void;
  editLink: (id: number, platform: string, link: string) => void;
}

const LinkContext = createContext<LinkContextType | undefined>(undefined);

export const LinkProvider = ({ children }: { children: ReactNode }) => {
  const [createLinkObjects, setCreateLinkObjects] = useState<LinkObject[]>([]);

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

  return (
    <LinkContext.Provider value={{ createLinkObjects, addLink, removeLink, editLink }}>
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
