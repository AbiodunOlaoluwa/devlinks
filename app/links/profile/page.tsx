"use client";

import "./profile.css";
import DeviceLinksPreview from "@/app/components/DeviceLinksPreview";
import { useLinkContext } from "../LinkContext";

const Profile = () => {

  const { createLinkObjects } = useLinkContext();

  return (
    <div>
      <h1>Profle</h1>
      <DeviceLinksPreview linkArray={createLinkObjects} />
    </div>
  )
}

export default Profile;