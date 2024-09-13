"use client";
import "./profile.css";
import DeviceLinksPreview from "@/app/components/DeviceLinksPreview";
import { useLinkContext } from "../LinkContext";
import Image from "next/image";
import imageUploadBox from "@/app/images/uploadImageBox.svg";

const Profile = () => {

  const { createLinkObjects, name, email, image, editName, editEmail, editImage } = useLinkContext();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    editName(event.target.value);
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    editEmail(event.target.value);
  }

  return (
    <div className="linksContainer">
      <DeviceLinksPreview linkArray={createLinkObjects} name={name} email={email} image={image} />
      <div className="editPanel">
        <div className="linkPageHeadingBar">
          <h1 className="linkHeading">Profile Details</h1>
          <p className="headingP">Add your details to create a personal touch to your profile.</p>
        </div>
        <div className="editPanelBody">
          <div className="profileSubArea">
            <p className="profilePhotoText">Profile photo</p>
            <div className="uploadImageBoxContainer">
              <Image
                className="imageUploadBox"
                src={imageUploadBox}
                alt="imageUploadBox"
              />
              <p className="uploadImageBoxText">
                Image must be below 1024x1024px. <br />Use PNG or JPG format.
              </p>
            </div>
          </div>
          <div className="profileTextSubArea">
            <div className="profileTextContainer">
              <p className="profileText">First Name*</p>
              <div className="textInputContainer">
                <input required type="text" className="textInput" name="name" placeholder="e.g. John Appleseed" value={name} onChange={handleNameChange} />
              </div>
            </div>
            <div className="profileTextContainer">
              <p className="profileText">Email</p>
              <div className="textInputContainer">
                <input type="email" className="textInput" name="email" placeholder="e.g. email@example.com" value={email} onChange={handleEmailChange} />
              </div>
            </div>
          </div>
        </div>
        <div className="profileSavePanel">
          <hr />
          <button className="profileSaveButton">Save</button>
        </div>
      </div>
    </div>
  )
}

export default Profile;