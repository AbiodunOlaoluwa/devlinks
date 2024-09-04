import NavBar from "./NavBar";
import "./layout.css";

const layout = ({children,}: Readonly<{children: React.ReactNode;}>) => {
  return (
    <div className="linksLayoutContainer">
        <NavBar />
        <div>{children}</div>
    </div>
  )
}

export default layout;