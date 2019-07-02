import React from 'react';
import SvgIcon from "./SvgIcon";

const Exercises = () => (
  <>
        <h1>Add Activity</h1>
        <section>
        <form action="/api/exercise/add" id="usrfrm2" class="box" method="post">
            <div class="fieldrow">
                <div class="field">
                <label for="selectUser">Create / Select Activity
                    

                    <input list="selectUser" name="browser" /><a href="#selectUser">asd</a>
                    <datalist id="selectUser" name="selectUser">

                    </datalist>
                </label>
                </div>
                <div class="field">
                <a href="#addUser" class="plus" id="plus">
                <SvgIcon name="Exercises" />
                </a>

            
        </div>
                
            </div>
            <div class="field">
                <label for="desc">Description *</label>
                <input id="desc" type="text" name="description" required/>
            </div>
            <div class="fieldrow">
                <div class="field">
                    <label for="dur">Duration *(mins.)</label>
                    <input id="dur" type="number" min="0" name="duration" required/>
                </div>
                <div class="field">
                    <label for="dat">Date </label>
                    <input id="dat" type="date" name="date"/>
                </div>
            </div>
            <button type="submit">Save</button>
            <div class="field">
                <h2>Successfully created a new user 'test', User ID = 'a7fd89e'</h2>
                <h2>Successfully added a new exercise on '09-27-2018' for User ID 'a7fd89e'
                    (user 'test'), description is 'my exercise description', duration set to '10' mins. </h2>

            </div>
        </form>
        </section>
    </>
)

export default Exercises;