import React, {	useState }  from "react";
import { Link } from "react-router-dom";
import SvgIcon from "./SvgIcon";
import Logo from "../logo.svg";
import Logout from './Logout';


const Header = props => {

const [showDropDown, toggleSettings] = useState(false);

return (
  <>
    <header>
        <Link to="/home">
            <img src={Logo} alt="FitnessTracker Logo"/>
          FitnessTracker v1.0
        </Link>
      <div>
 
	  <button onClick={() => toggleSettings(!showDropDown)} className="settings">
        <SvgIcon name="User" />
	  </button> 	  
	
        <button
          className={props.sideBar ? "menuToggle active" : "menuToggle"}
          onClick={() => props.toggleSideBar(!props.sideBar)}
        >
          <span />
        </button>
      </div>	  
    </header>
	<div className={showDropDown? "dropdown active" : "dropdown"}>
	  <a href="/settings" className="dropdownmenu">Settings
	  </a>
	  <a href="/something" className="dropdownmenu">Something more
	  </a>
	  <Logout />
	  
	  </div>
  </>
);
}
export default Header; 

