import React from 'react';
import FetchData from "./FetchData";

const Activities = () => {
  const data = FetchData("http://localhost:4000/api/exercise/users");
  return (
    <>
    <h4>Overview</h4>
    <h1>Select / Add Activity</h1>
  <section>
     
        <form action="/api/exercise/add" id="usrfrm2" method="post" class="box">
            <div className="fieldrow">
                <div className="field">
                <label htmlFor="selectUser">New Activity
                    <input list="selectUser" name="browser" />
                    <button>Create</button>
                    
                    
                </label>
                </div>
        </div>
       </form>
       <div class="container">          
        {data.map(el => (
          <div class="activity">
          <img src=""/>
          {el.username}
          </div>
        ))}
</div>
  </section>
  </>
)}

export default Activities;