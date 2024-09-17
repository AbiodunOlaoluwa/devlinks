"use client";
import { LinkProvider } from "../links/LinkContext";
import PreviewContent from "./PreviewContent";

const Preview = () => {
  return (
    <LinkProvider>
      <PreviewContent />
    </LinkProvider>
  )
}

export default Preview;