"use client";
import "./profile.css";
import DeviceLinksPreview from "@/app/components/DeviceLinksPreview";
import { useLinkContext } from "../LinkContext";
import Image from "next/image";
import imageUploadBox from "@/app/images/uploadImageBox.svg";
import { useState, useEffect } from "react";
import { UserType } from "../page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import { CldUploadWidget } from "next-cloudinary";

const Profile = () => {

  const { createLinkObjects, name, email, image, editName, editEmail, editImage, saveProfile, setUserData } = useLinkContext();
  const { status, data: session } = useSession();
  const [user, setUser] = useState<UserType | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifcation, setNotification] = useState(false);

  const router = useRouter();


  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      setUser(session.user as UserType);
      setUserData(session.user as UserType);
      setTimeout(() => setLoading(false), 800);
    }
  }, [status, session, setUserData, router]);


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNotification(true);
    editName(event.target.value);
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNotification(true);
    editEmail(event.target.value);
  }

  const handleSave = async () => {
    setSaving(true);

    try {
      const response = await saveProfile();

      if (response.success) {
        setSaving(false);
        setNotification(false);
      } else {
        setSaving(false);
      }
    } catch (error) {
      setSaving(false);
    }
  }

  const handleUpload = (result: any) => {
    if (result.event === "success") {
      const newImageUrl = result.info.secure_url;
      editImage(newImageUrl);
      setNotification(true);
    }
  };

  return (
    <div className="linksContainer">
      <DeviceLinksPreview linkArray={createLinkObjects} name={name} email={email} image={image} />
      <div className="editPanel">
        <div className="linkPageHeadingBar">
          <h1 className="linkHeading">Profile Details</h1>
          <p className="headingP">Add your details to create a personal touch to your profile.</p>
        </div>
        {loading === true ?
          <div className="editPanelBody"><Spinner color="black" /></div> :
          <div className="editPanelBody">
            <div className="profileSubArea">
              <p className="profilePhotoText">Profile photo</p>
              <div className="uploadImageBoxContainer">
                <CldUploadWidget
                  uploadPreset="kpxnhcqo"
                  onSuccess={handleUpload}
                >
                  {({ open }) => (
                    <>
                      {image ? (
                        <>
                          <div className="uploadImageContainer">
                            <Image
                              onClick={() => open()}
                              className="uploadedImageBox"
                              src={image}
                              alt="uploadedImage"
                              width={193}
                              height={193}
                            />
                          </div>
                          <p className="uploadImageBoxText">
                            Image must be below 1024x1024px. <br /> Use PNG or JPG format. <br />
                            <span className={`text-red-600 font-semibold ${notifcation ? "" : "hidden"}`} >*Remember to Save your updated profile.</span>
                          </p>
                        </>
                      ) : (
                        <>
                          <Image
                            onClick={() => open()}
                            className="imageUploadBox"
                            src={imageUploadBox}
                            alt="uploadImagePlaceholder"
                          />
                          <p className="uploadImageBoxText">
                            Image must be below 1024x1024px. <br /> Use PNG or JPG format.
                          </p>
                        </>
                      )}
                    </>
                  )}
                </CldUploadWidget>
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
          </div>}
        <div className="profileSavePanel">
          <hr />
          <button onClick={handleSave} className={`profileSaveButton ${saving ? 'disabled' : ''}`}>{saving ? "Saving" : "Save"}</button>
        </div>
      </div>
    </div>
  )
}

export default Profile;