"use client";
import { useState } from "react";
import "./logoutButton.css";
import Spinner from "./Spinner";

import { signOut } from "next-auth/react";

const LogoutButton = () => {

  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    signOut({callbackUrl: "/"});
  }

  return (
    <button className="logoutButtonContainer" onClick={handleLogout}>
      {loading ? <Spinner /> : "Log Out"}
    </button>
  )
}

export default LogoutButton;