import React, { useState,useEffect } from "react";
import FormInput from "./FormInput";
import SvgIcon from "./SvgIcon";

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
      Male: [18, 19, 24, 28, 29]
    },
    "25": {
      Female: [19, 20, 25, 29, 30],
      Male: [19, 20, 25, 29, 30]
    },
    "35": {
      Female: [20, 21, 26, 30, 31],
      Male: [20, 21, 26, 30, 31]
    },
    "45": {
      Female: [22, 23, 28, 32, 33],
      Male: [21, 22, 27, 31, 32]
    },
    "55": {
      Female: [23, 24, 29, 33, 34],
      Male: [22, 23, 28, 32, 33]
    },
    "65": {
      Female: [24, 25, 30, 34, 35],
      Male: [23, 24, 29, 33, 34]
    },
    "90": {
      Female: [24, 25, 30, 34, 35],
      Male: [23, 24, 29, 33, 34]
    }
  }
};
const Mass = {
  0: "underweight",
  1: "normal weight",
  2: "slightly overweight",
  3: "slightly overweight",
  4: "overweight"
};



function Profile() {
  const [form, setValues] = useState({
    feWeight: "",
    feHeight: "",
    feAge: "",
    feGender: ""
  });
  const [genderEmpty, checkGender] = useState(false);
  const [bmi = [], setBMI] = useState();
  const [status, setStatus] = useState();

  useEffect(() => setValues(form),
  [form]
  
)

useEffect(() => {
    //const isEmpty = ! new Set (Object.values(form)).has ("");
    const isEmpty = ! Object.values(form).some( (el) => el === "")
    if(isEmpty )  {
     calcBMI();
   }
})
  const calcBMI = e => {
   // e.preventDefault();
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
        [bmi,
          " - That is " +
          Mass[
            Object.values(bmiTable.age)[
              Object.keys(bmiTable.age).indexOf(closestAge)
            ][feGender].indexOf(closestBMI)
          ]
        ]);
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
    const fieldName = e.target.type === "radio" ? e.target.name : e.target.id; // special case for radio
  
    setValues({
      ...form,
      [fieldName]: e.target.value
    });
  };
  const updateAccount = e => {
    console.log(form.feGender)
    if (form.feGender === "") {
      setStatus("Please fill out mandatory fields (marked with *).");
      checkGender(true);
      
    e.preventDefault();
    }
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
              <FormInput fieldName={"UserName"} pattern={"^[a-zA-Z0-9]{1,20}$"} type={"text"} required={true} handler={e => handleChange(e)} />
              <FormInput fieldName={"UserMail"} type={"email"} required={true} handler={e => handleChange(e)} />
            </div>
            <div className="fieldrow">
             <FormInput fieldName={"Password"}  pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" type={"password"} required={true} handler={e => handleChange(e)} />
             <FormInput fieldName={"PasswordCheck"} type={"password"} required={true} handler={e => handleChange(e)} />             
            </div>
            <div className="requirement">Passwort must be min 8 Characters and contain: UpperCase, LowerCase, Number/Special Char" </div>
          </fieldset>
          <fieldset>
          <legend>Adress Information</legend>
          <details>
          <summary>Mandatory</summary>
            
           
            <div className="fieldrow">
            <FormInput fieldName={"FirstName"} type={"text"} required={true} handler={e => handleChange(e)} />
            <FormInput fieldName={"LastName"} type={"text"} required={true} handler={e => handleChange(e)} />
            </div>
            <div className="fieldrow">
              <FormInput fieldName={"Address"} type={"text"} required={true} handler={e => handleChange(e)} />
              <FormInput fieldName={"City"} type={"text"} required={true} handler={e => handleChange(e)} />
            </div>
            <div className="fieldrow">
              <FormInput fieldName={"Zip"} type={"number"} required={true} handler={e => handleChange(e)} />
              <FormInput fieldName={"Country"} type={"text"} required={true} handler={e => handleChange(e)} />
            </div>
            </details>
            
          </fieldset>
          <fieldset>
            <legend>Health Details </legend>
            <div className="fieldrow">
             <FormInput fieldName={"Weight"} type={"number"} minmax={["10","250"]} required={true} handler={e => handleChange(e)} />
             <FormInput fieldName={"Height"} placeholder="cm" minmax={["100","250"]} type={"number"} required={true} handler={e => handleChange(e)} />
             <FormInput fieldName={"Age"} type={"number"} minmax={["16","120"]}required={true} handler={e => handleChange(e)} />

              <div className="field">
                <label>Gender *</label>
                 <div className="customselect">
                <div className="input">
                  <input type="radio" name="feGender" id="feGenderFemale"  onClick={e => handleChange(e)}  required defaultValue="Female" hidden />
                  <label htmlFor="feGenderFemale" className= { genderEmpty ? "switch switch--on switchInvalid":"switch switch--on"}>
                    Female
                  </label>
                  <input type="radio" name="feGender" id="feGenderMale" onClick={e => handleChange(e)} required defaultValue="Male" hidden />
                  <label htmlFor="feGenderMale" className={ genderEmpty ? "switch switch--off switchInvalid":"switch switch--off"}>
                    Male
                  </label>
                  <span className={ form.feGender === "" &&genderEmpty ? "switchInvalid":""}>
                   <SvgIcon name={"feGender"} />
                </span>
                  </div>
                  </div>
                </div>
             
                 {(bmi[0]) && <div className="fieldrow">
                  <div className="field bmi">
                <label htmlFor="feWeight">Calculated Result:</label>
                
          <div>
            BMI: {bmi[0]}
          </div>
          <div>
            {bmi[1]}
          </div>

        </div>
      </div>
      }
              
      NOTE: In order to calculate calories burnt with an actity, first we need to calculate your BMI. 
              At best, the BMI can provide a first indication of weight
              assessment.
              </div>
          </fieldset>

          <button onSubmit={(e) => updateAccount(e)} className="btn btn-accent">
            Update Account
          </button>
        </form>
      </section>
    </>
  );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Profile);
