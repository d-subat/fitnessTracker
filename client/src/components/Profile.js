import React from 'react';

const Profile = () => (
  <>
  <h4>Overview</h4>
  <h1>Personal Information</h1>
  <section>
  <form action="/api/exercise/log" method="get" id="usrfrm3" class="box">
      <ul class="list-group list-group-flush">
        <li class="p-3 list-group-item">
          <div class="row">
            <div class="col">
              <form class="">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="feFirstName">First Name</label>
                    <input
                      id="feFirstName"
                      placeholder="First Name"
                      class="form-control"
                      value="Sierra"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="feLastName">Last Name</label>
                    <input
                      id="feLastName"
                      placeholder="Last Name"
                      class="form-control"
                      value="Brooks"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="feEmail">Email</label>
                    <input
                      type="email"
                      id="feEmail"
                      placeholder="Email Address"
                      autocomplete="email"
                      class="form-control"
                      value="sierra@example.com"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="fePassword">Password</label>
                    <input
                      type="password"
                      id="fePassword"
                      placeholder="Password"
                      autocomplete="current-password"
                      class="form-control"
                      value="EX@MPL#P@$$w0RD"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="feAddress">Address</label>
                  <input
                    id="feAddress"
                    placeholder="Address"
                    class="form-control"
                    value="1234 Main St."
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="feCity">City</label>
                    <input
                      id="feCity"
                      placeholder="City"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="feInputState">State</label>
                    <select
                      id="feInputState"
                      class="form-control custom-select"
                    >
                      <option>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                  <div class="form-group col-md-2">
                    <label for="feZipCode">Zip</label>
                    <input
                      id="feZipCode"
                      placeholder="Zip"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="feDescription">Description</label>
                    <textarea
                      id="feDescription"
                      rows="5"
                      class="form-control"
                    />
                  </div>
                </div>
                <button class="btn btn-accent">Update Account</button>
              </form>
            </div>
          </div>
        </li>
      </ul>
    </form>
  </section>
  </>
)

export default Profile;