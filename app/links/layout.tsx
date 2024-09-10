import NavBar from "./NavBar";
import "./layout.css";
import { LinkProvider } from "./LinkContext";

const layout = ({children,}: Readonly<{children: React.ReactNode;}>) => {
  return (
    <LinkProvider>
    <div className="linksLayoutContainer">
        <NavBar />
        <div className="linksChildren">{children}</div>
    </div>
    </LinkProvider>
  )
}

export default layout;