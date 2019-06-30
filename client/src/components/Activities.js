import React from 'react';
import FetchData from "./FetchData";

const Activities = () => {
  const data = FetchData("http://localhost:4000/api/exercise/users");
  return (
  <section>
     <h1>Add Activitys</h1>
        <form action="/api/exercise/add" id="usrfrm2" method="post">
            <div className="fieldrow">
                <div className="field">
                <label htmlFor="selectUser">Create / Select Activity
                    <input list="selectUser" name="browser" />
                    <datalist id="selectUser" name="selectUser">
                    
        {data.map(el => (
          <option key={el.id}>{el.username}</option>
        ))}

                    </datalist>
                </label>
                </div>
        </div>
       </form>
  </section>
)}

export default Activities;