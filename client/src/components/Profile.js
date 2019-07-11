import React, { useState } from "react";
import SvgIcon from "./SvgIcon";

import { withAuthorization } from './Session';


const bmiTable = {
  age: [{
    "16": {
      female: [ 18,19, 24,  28,29 ],
      male: [{ u: "19", n: "24", l: "28" }]
    },
    "25": {
      female: [{ u: "20", n: "25", l: "29" }],
      male: [{ u: "19", n: "24", l: "28" }]
    },
    "35": {
      female: [{ u: "21", n: "26", l: "30" }],
      male: [{ u: "20", n: "25", l: "29" }]
    },
    "45": {
      female: [{ u: "22", n: "27", l: "31" }],
      male: [{ u: "21", n: "26", l: "30" }]
    },
    "55": {
      female: [{ u: "23", n: "28", l: "32" }],
      male: [{ u: "22", n: "27", l: "31" }]
    },
    "65": {
      female: [{ u: "24", n: "29", l: "33" }],
      male: [{ u: "23", n: "28", l: "32" }]
    },
    "90": {
      female: [{ u: "25", n: "30", l: "34" }],
      male: [{ u: "24", n: "29", l: "33" }]
    }
  }]
};
const Mass = {
  0: "untergewicht",
        1: "normal",
        2: "leicht ü",
        3: "übergewicht",
        4: "übergewicht"
}
/*
  male: 
16-24 Jahre	<19	19–24	25–28	>28
25–34 Jahre	<20	20–25	26–29	>29
35–44 Jahre	<21	21–26	27–30	>30
45-54 Jahre	<22	22–27	28–31	>31
55-64 Jahre	<23	23–28	29–32	>32
65-90 Jahre	<24	24–29	30–33	>33

female: {
16 Jahre  	<19	19–24	25–28	>28
17-24 Jahre	<20	20–25	26–29	>29
25-34 Jahre	<21	21–26	27–30	>30
35-44 Jahre	<22	22–27	28–31	>31
45-54 Jahre	<23	23–28	29–32	>32
55-64 Jahre	<24	24–29	30–33	>33
65-90 Jahre	<25	25–30	31–34	>34
*/

function Profile() {
  const [form, setValues] = useState({
    feWeight: "",
    feHeight: "",
    feAge: ""
  });
  const [bmi, setBMI] = useState();

  const calcBMI = e => {
    e.preventDefault();

    //Gewicht / (Körpergröße in Metern * Körpergröße in Metern)
    const bmi =
    parseInt(      parseInt(form.feWeight) /
      (parseFloat(form.feHeight / 100) * parseFloat(form.feHeight / 100)) );
    console.log(
      "bmi:" + bmi,
      parseFloat(form.feHeight / 100) * parseFloat(form.feHeight / 100)
    );
    const age = parseInt(form.feAge);

        
        
    var closestAge = bmiTable.age.reduce(function(prev, curr) {
      return (Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev);
    });
console.log(closestAge)
/*
        var closestBMI = bmiTable.age[closestAge].female.reduce(function(prev, curr) {
          return (Math.abs(curr - bmi) < Math.abs(prev - bmi) ? curr : prev);
        });
  
        console.log(Mass[bmiTable.age[bmiTable.age.indexOf(closestAge)].female.indexOf(closestBMI)],bmiTable.age[16].female.indexOf(closestBMI));
setBMI(bmi +" : " +Mass[bmiTable.age[bmiTable.age.indexOf(closestAge)].female.indexOf(closestBMI)],bmiTable.age[16].female.indexOf(closestBMI));
        //0 untergewicht
        //1 normal
        //2 leicht ü
        //3 übergewicht
*/

  
  };

  const handleChange = e => {
    setValues({
      ...form,
      [e.target.id]: e.target.value
    });
    
  };

  return (
    <>
      <section>
        <h4>Overview</h4>
        <h1>Profile</h1>

        <div
          action="/api/exercise/log"
          method="get"
          id="usrfrm3"
          className="box"
          
                  >
          
          <fieldset>
          <legend>Account Settings</legend>
          <div className="fieldrow">
          <div className="field">
              <label htmlFor="feEmail">Username</label>
              <input
                type="username"
                id="feUsername"
                placeholder="Username"
                autoComplete="username"
                value=""
              />
            </div>
            <div className="field">
              <label htmlFor="feEmail">Email</label>
              <SvgIcon name="Profile" /> <input
                type="email"
                id="feEmail"
                placeholder="Email Address"
                autoComplete="email"
                value=""
              />
            </div>
            </div>
            <div className="fieldrow">
            <div className="field">
              <label htmlFor="fePassword">Password</label>
              <input
                type="password"
                id="fePassword"
                placeholder="Password"
                autoComplete="current-password"
                value=""
              />
            </div>
            <div className="field">
              <label htmlFor="fePasswordCheck">Password Check</label>
              <input
                type="password"
                id="fePasswordCheck"
                placeholder="Password"
                value=""
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
              <label htmlFor="feWeight">Weight</label>
              <input
                onChange={handleChange}
                type="number"
                min="25"
                max="250"
                id="feWeight"
                placeholder="kg"
              />
            </div>
            <div className="field">
              <label htmlFor="feHeight">Height</label>
              <input
                onChange={handleChange}
                type="number"
                min="100"
                max="250"
                id="feHeight"
                placeholder="cm"
              />
            </div>
            
            <div className="field">
              <label htmlFor="Age">Age</label>
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
              <label>Gender</label>

              <select>
                <option>Please select</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="field">
            <legend>Calculated BMI:</legend> {bmi}
            <div id="BMI" />
            NOTE: At best, the BMI can provide a first indication of weight
            assessment. However, to calculate the ideal weight, it is not
            suitable if it is used alone and not supplemented by further body
            fat measurements.
          </div>
          <button onClick={calcBMI} className="btn btn-accent">
            Calc BMI
          </button>
          </fieldset>
        
          <button className="btn btn-accent">Update Account</button>
        </div>
      </section>
    </>
  );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Profile);