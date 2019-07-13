import React, { useState } from "react";

import { withAuthorization } from "./Session";


/*
  male: 
16-24 Jahre	<19	19–24	25–28	>28
25–34 Jahre	<20	20–25	26–29	>29
35–44 Jahre	<21	21–26	27–30	>30
45-54 Jahre	<22	22–27	28–31	>31
55-64 Jahre	<23	23–28	29–32	>32
65-90 Jahre	<24	24–29	30–33	>33

Female: {
35-44 Jahre	<22	22–27	28–31	>31
45-54 Jahre	<23	23–28	29–32	>32
55-64 Jahre	<24	24–29	30–33	>33
65-90 Jahre	<25	25–30	31–34	>34
*/
const bmiTable = {
  age: {
    "16": {
      Female: [18, 19, 24, 28, 29],
      Male:   [18, 19, 24, 28, 29]
    },
    "25": {
      Female: [19,20, 25, 29,30],
      Male:   [19,20, 25, 29,30]
    },
    "35": {
      Female: [20,21, 26, 30, 31],
      Male:   [20,21, 26, 30, 31],
    },
    "45": {
      Female:  [22,23,28,32,33],
      Male:   [21,22,27,31,32]
    },
    "55": {
      Female: [23,24,29,33,34],
      Male:   [22,23,28,32,33]
    },
    "65": {
      Female: [24,25,30,34,35],
      Male:   [23,24,29,33,34]
    },
    "90": {
      Female: [24,25,30,34,35],
      Male:   [23,24,29,33,34]
    }
  }
};
const Mass = {
  0: "Underweight",
  1: "normal Weight",
  2: "slightly Overweight",
  3: "slightly Overweight",
  4: "Overweight"
};


function Profile() {
  const [form, setValues] = useState({
    feWeight: "",
    feHeight: "",
    feAge: "",
    feGender: ""
  });
  const [bmi, setBMI] = useState();
  const [status, setStatus] = useState();

  const calcBMI = e => {
    e.preventDefault();
    setStatus("");
    //Gewicht / (Körpergröße in Metern * Körpergröße in Metern)
    try {
      const bmi = parseInt(
        parseInt(form.feWeight) /
          (parseFloat(form.feHeight / 100) * parseFloat(form.feHeight / 100))
      );
      console.log(
        "bmi:" + bmi,
        parseFloat(form.feHeight / 100) * parseFloat(form.feHeight / 100)
      );
      const age = parseInt(form.feAge);

      const feGender = form.feGenderMale ? "Male" : "Female";

      var closestAge = Object.keys(bmiTable.age).reduce(function(prev, curr) {
        return Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev;
      });

      var closestBMI = bmiTable.age[closestAge].Female.reduce(function(
        prev,
        curr
      ) {
        return Math.abs(curr - bmi) < Math.abs(prev - bmi) ? curr : prev;
      });

      setBMI(
        bmi +
          " " +
          Mass[
            Object.values(bmiTable.age)[
              Object.keys(bmiTable.age).indexOf(closestAge)
            ][feGender].indexOf(closestBMI)
          ]
      );
    } catch (err) {
      setStatus("Please fill out mandatory fields (marked with *).");
    }
    //  console.log(Mass[bmiTable.age[bmiTable.age.indexOf(closestAge)].Female.indexOf(closestBMI)],bmiTable.age[16].Female.indexOf(closestBMI));
    //setBMI(bmi +" : " +Mass[bmiTable.age[bmiTable.age.indexOf(closestAge)].Female.indexOf(closestBMI)],bmiTable.age[16].Female.indexOf(closestBMI));
    //0 untergewicht
    //1 normal
    //2 leicht ü
    //3 übergewicht
  };

  const handleChange = e => {
    setValues({
      ...form,
      [e.target.id]: e.target.value
    });
  };
  const updateAccount = e => {
    e.preventDefault();
  };
  return (
    <>
      {status && <div className="statusMessage"> {status}</div>}
      <section>
        <h4>Overview</h4>
        <h1>Profile</h1>

        <form
          action="/api/exercise/log"
          onSubmit={updateAccount}
          method="get"
          id="usrfrm3"
          className="box"
        >
          <fieldset>
            <legend>Account Settings</legend>
            <div className="fieldrow">
              <div className="field">
                <label htmlFor="feEmail">Username *</label>
                <input
                  type="username"
                  id="feUsername"
                  placeholder="Username"
                  autoComplete="username"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="feEmail">Email *</label>
                <input
                  type="email"
                  id="feEmail"
                  placeholder="Email Address"
                  autoComplete="email"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="fieldrow">
              <div className="field">
                <label htmlFor="fePassword">Password *</label>
                <input
                  type="password"
                  id="fePassword"
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="fePasswordCheck">Password Check *</label>
                <input
                  type="password"
                  id="fePasswordCheck"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Adress Information</legend>
            <div className="fieldrow">
              <div className="field">
                <label htmlFor="feFirstName">First Name</label>
                <input id="feFirstName" placeholder="First Name" value="" />
              </div>
              <div className="field">
                <label htmlFor="feLastName">Last Name</label>
                <input id="feLastName" placeholder="Last Name" value="" />
              </div>
            </div>
            <div className="fieldrow">
              <div className="field">
                <label htmlFor="feAddress">Address</label>
                <input id="feAddress" placeholder="Address" value="" />
              </div>

              <div className="field">
                <label htmlFor="feCity">City</label>
                <input id="feCity" placeholder="City" />
              </div>
            </div>
            <div className="fieldrow">
              <div className="field">
                <label htmlFor="feZipCode">Zip</label>
                <input id="feZipCode" placeholder="Zip" />
              </div>

              <div className="field">
                <label htmlFor="feZipCountry">Country</label>
                <input id="feZipCountry" placeholder="Country" />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Health Details </legend>
            <div className="fieldrow">
              <div className="field">
                <label htmlFor="feWeight">Weight *</label>
                <input
                  onChange={handleChange}
                  type="number"
                  min="25"
                  max="250"
                  id="feWeight"
                  placeholder="kg"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="feHeight">Height *</label>
                <input
                  onChange={handleChange}
                  type="number"
                  min="100"
                  max="250"
                  id="feHeight"
                  placeholder="cm"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="Age">Age *</label>
                <input
                  onChange={handleChange}
                  type="number"
                  min="6"
                  max="120"
                  id="feAge"
                  placeholder="years"
                />
              </div>

              <div className="field">
                <label>Gender *</label>
                <div className="customselect">
                  <input
                    type="radio"
                    name="s1"
                    id="feGenderFemale"
                    defaultValue="Female"
                    hidden
                  />
                  <label for="feGenderFemale" class="switch switch--on">
                    Female
                  </label>

                  <input
                    type="radio"
                    name="s1"
                    id="feGenderMale"
                    defaultValue="Male"
                    hidden
                  />
                  <label for="feGenderMale" class="switch switch--off">
                    Male
                  </label>
                </div>
              </div>
            </div>
            <div className="fieldrow">
              <div className="field">
                <label htmlFor="feWeight">Calculated BMI:</label>
                <input
                value={bmi}
                className="readonlyInput"
                />
                <button onClick={calcBMI} className="btn btn-accent">
              ReCalc BMI
            </button>
              </div>
              <div id="BMI" />
              NOTE: At best, the BMI can provide a first indication of weight
              assessment. However, to calculate the ideal weight, it is not
              suitable if it is used alone and not supplemented by further body
              fat measurements.
            </div>
            
          </fieldset>

          <button type="submit" className="btn btn-accent">
            Update Account
          </button>
        </form>
      </section>
    </>
  );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Profile);
