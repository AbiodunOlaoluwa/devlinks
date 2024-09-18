import LoginInputForm from "./LoginInputForm";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import Image from "next/image";
import devlinksTextLogo from "@/public/devlinks.svg";
import devlinksVectorLogo from "@/public/devlinksLogoImage.svg";
import "./authPages.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | devlinks",
  description: "devlinks login page"
}

// export const fetchCache = "force-no-store";

export default async function Home() {

  const session = await getServerSession();

  if (session) {
    redirect("/links");
  }

  return (
    <div className="loginPageContainer">
      <div className="loginFormCardContainer">
        <div className="loginFormLogoContainer">
          <Image
            width={40}
            height={40}
            src={devlinksVectorLogo}
            alt="devlinksLogo"
            className="loginLogoImage"
          />
          <Image
          height={26}
            src={devlinksTextLogo}
            alt="devlinks"
            className="loginLogoText"
          />
        </div>
        <div className="loginFormCard mt-10 bg-white p-10 rounded-xl">
          <div className="loginTitleContainer">
            <p className="loginTitleHeader">Login</p>
            <p className="loginTitleText">Add your details below to get back into the app</p>
          </div>
          <LoginInputForm />
        </div>
      </div>
    </div>
  );
}
