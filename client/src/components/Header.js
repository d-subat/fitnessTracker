import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SvgIcon from "./SvgIcon";
import Logout from "./Logout";
import { withAuthorization}  from './Session';
import { NavLink } from "react-router-dom";

const Header = props => {
  const [showDropDown, toggleSettings] = useState(false);
  const [darkMode, toggleDarkMode] = useState(true);
  const [showSearch, toggleSearch] = useState(false);

  useEffect(() => {
    const localTheme = window.localStorage.getItem("fitnesstracker-theme");
    if (localTheme) {
      document.documentElement.setAttribute("data-theme", localTheme);
    }
  }, []);

  const toggleTheme = () => {
    toggleDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      window.localStorage.setItem("fitnesstracker-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      window.localStorage.setItem("fitnesstracker-theme", "light");
    }

    toggleSettings(!showDropDown)
  };

  return (
    <>
      <header>
        <Link to="/home">
        <SvgIcon name="rocket" />
          <div>FitnessTracker v1.0</div>
        </Link>
        
        {props.history.location.pathname!=="/" && 
        <NavLink activeClassName="breadcrumb"  to="/">
        <SvgIcon name="Back" />{props.history.location.pathname.substr(1,) }
      </NavLink>
}
        <div>
        <button className="searchButton" onClick={() => toggleSearch(!showSearch)}>
            <SvgIcon name="search" />         
        </button>
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
      <div className={showSearch ? "search active" : "search"}>
        <input  type="text" placeholder="search" id="search"/> 
      </div>
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
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Header);

