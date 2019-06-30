import React from 'react';

const Header = (props) => 
(
    <header>
    <label>
        FitnessTracker v1.0
    </label>
    <button className={props.sideBar? "menuToggle active" : "menuToggle" } onClick={() => props.toggleSideBar (!props.sideBar)}>
        <span></span>
    </button>
</header>
)



export default Header;