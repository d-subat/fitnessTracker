import React from "react";

import { NavLink } from "react-router-dom";
import SvgIcon from "./SvgIcon";

const Sidebar = props => (    
      <nav className={props.sideBar && "active" } >
         <NavLink activeClassName='active' to='/dashboard'>
            <SvgIcon name='Stats Panel' />Stats Panel
          </NavLink>
        {props.routes.map(route => (
          <NavLink activeClassName='active' key={route.name}   to={route.path}>
            <SvgIcon name={route.name} />{route.name}
          </NavLink>
        ))}
      </nav>
    
);

export default Sidebar;
