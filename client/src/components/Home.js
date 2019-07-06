import React from 'react';
import SvgIcon from "./SvgIcon";

const Home = (props) => (
    <>
    <section>
          <h4>FitnessTracker</h4>
          <h1>Login</h1>

          <div
            action="/api/exercise/login"
            id="usrfrm2"
            className="box"
            method="post"
          ><div className="field">
     <label for="feFirstName">Username</label>
                    <input
                      id="username"
                      placeholder="Username"
                      
                      value=""
                    />
                  </div>
                  <div className="field">
                    <label for="feLastName">Password</label>
                    <input
                      id="password"
                      placeholder="Password"
                      
                      value=""
                    />
                  </div>
                  <button className="btn">Login</button>
                  <hr style={{width:"100%"}}/>
                  or you can 
                  <div className="fieldrow">
                  <button className="btn btn-google"><SvgIcon name="google" />Google</button>
                  <button className="btn btn-github"><SvgIcon name="github" />Github</button>
                  <button className="btn btn-twitter"><SvgIcon name="twitter" />Twitter</button>
                  <button className="btn btn-facebook"><SvgIcon name="facebook" />Facebook</button>
                  </div>
          </div>
    
</section>
</>
)

export default Home;