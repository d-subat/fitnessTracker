import React from 'react';

const Profile = () => (
  <>
  <section>
  <h4>Overview</h4>
  <h1>Personal Information</h1>
  
  <div action="/api/exercise/log" method="get" id="usrfrm3" class="box">
          
          <div class="field">
                    <label for="feFirstName">First Name</label>
                    <input
                      id="feFirstName"
                      placeholder="First Name"
                      
                      value="Sierra"
                    />
                  </div>
                  <div class="field">
                    <label for="feLastName">Last Name</label>
                    <input
                      id="feLastName"
                      placeholder="Last Name"
                      
                      value="Brooks"
                    />
                  </div>


                  <div class="field">
                    <label for="feEmail">Email</label>
                    <input
                      type="email"
                      id="feEmail"
                      placeholder="Email Address"
                      autocomplete="email"
                      
                      value="sierra@example.com"
                    />
                  </div>
                  <div class="field">
                    <label for="fePassword">Password</label>
                    <input
                      type="password"
                      id="fePassword"
                      placeholder="Password"
                      autocomplete="current-password"
                      
                      value="EX@MPL#P@$$w0RD"
                    />
                  </div>
                
                <div class="field">
                  <label for="feAddress">Address</label>
                  <input
                    id="feAddress"
                    placeholder="Address"
                    
                    value="1234 Main St."
                  />
                </div>
                <div class="fieldrow">
                  <div class="field">
                    <label for="feCity">City</label>
                    <input
                      id="feCity"
                      placeholder="City"
                      
                    />
                  </div>
                  <div class="field">
                    <label for="feZipCode">Zip</label>
                    <input
                      id="feZipCode"
                      placeholder="Zip"
                      
                    />
                  </div>
                </div>
                
 
                
                <button class="btn btn-accent">Update Account</button>
                
    </div>
  </section>
  </>
)

export default Profile;