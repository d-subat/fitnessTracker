import React  from 'react';
import Logo from "../logo.jpg";
import { NavLink } from "react-router-dom";

const Home = (props) => (
    <>
    <section>
        
          <h4>FitnessTracker</h4>
          <h1>Home</h1>
          <div className="box">
<img src={Logo} style={{width:"100%"}} alt="FitnessTracker Logo"/>
<p></p><p>
The Fitnesstracker app is your personal assistant when it comes to supporting your sporting ambitions. Do you focus on sporting and health ambitions? Then the fitness tracker app is right for you.
</p><p>
It is known that restful sleep and regular exercise are important for personal well-being. Get to know your body and do something good for your health and fitness. With the FitnessTracker App, you can record all your activities, get clear analyzes and can set motivating sporting goals.
</p>

    
<NavLink to="/login" className="btn">Start Today</NavLink>

</div>


</section>  
</>
)

export default Home;