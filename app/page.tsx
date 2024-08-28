import Image from "next/image";
import devlinksTextLogo from "@/public/devlinks.svg";
import devlinksVectorLogo from "@/public/devlinksLogoImage.svg";
import "./page.css";

export default function Home() {
  return (
    <div className="loginPageContainer">
      <div className="loginFormCardContainer">
        <div className="loginFormLogoContainer flex gap-3 items-center justify-center">
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
        <div className="loginFormCard mt-20 bg-white p-8 rounded-xl">login form</div>
      </div>
    </div>
  );
}
