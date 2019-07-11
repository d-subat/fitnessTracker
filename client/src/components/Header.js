import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SvgIcon from "./SvgIcon";
import Logo from "../logo.svg";
import Logout from "./Logout";

const Header = props => {
  const [showDropDown, toggleSettings] = useState(false);
  const [darkMode, toggleDarkMode] = useState(true);

  useEffect(() => {
    const localTheme = window.localStorage.getItem("fitnesstracker-theme");
    if (localTheme) {
      document.documentElement.setAttribute("data-theme", localTheme);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      window.localStorage.setItem("fitnesstracker-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      window.localStorage.setItem("fitnesstracker-theme", "light");
    }
    toggleDarkMode(!darkMode);
    toggleSettings(!showDropDown)
  };

  return (
    <>
      <header>
        <Link to="/home">
          <img src={Logo} alt="FitnessTracker Logo" />
          FitnessTracker v1.0
        </Link>
        <div>
          <button
            onClick={() => toggleSettings(!showDropDown)}
            className="settings">
            <SvgIcon name="User" />
          </button>
          <button
            className={props.sideBar ? "menuToggle active" : "menuToggle"}
            onClick={() => props.toggleSideBar(!props.sideBar)}>
            <span />
          </button>
        </div>
      </header>
      <div className={showDropDown ? "dropdown active" : "dropdown"}>
        <a href="/settings" className="dropdownmenu">
          Settings
        </a>
        <div onClick={() => toggleTheme()} className="dropdownmenu">
          DarkMode
        </div>
        <Logout />
      </div>
    </>
  );
};
export default Header;
