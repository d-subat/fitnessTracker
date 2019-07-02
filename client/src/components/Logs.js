import React from 'react';

const Logs = () => (
  <>
  <h1>Activity log</h1>
  <section>
  <form action="/api/exercise/log" method="get" id="usrfrm3" class="box">
      <div class="field">
          <label for="selectUser2">Show log for *
              <select id="selectUser2">
                  <option>User</option>
                  <option>User</option>
                  <option>User</option>
              </select>
          </label>
      </div>
      <div class="fieldrow    ">
          <div class="field">
              <label for="from">From (Date)</label>
              <input id="from" type="date" name="from"/>
          </div>
          <div class="field">
              <label for="to">To (Date)</label>
              <input id="to" min="" onfocus="document.getElementById('to').min = document.getElementById('from').value "
                  type="date" name="to"/>
          </div>
          <div class="field">
              <label for="limit">Limit Count </label>
              <input id="limit" type="number" min="1" name="limit"/>
          </div>
      </div>
      <button type="submit">Search</button>
      <h2>Successfully searched for exercises for User ID 'a7fd89e' (user 'test') from
          '08-11-2017' to '09-27-2018':</h2>
      <div id="result3">

          <h3>View as List Grid</h3>
          <div class="log">
              <div class="exercise">
                  <div class="date"> 01-06-2018</div>
                  <div class="description"> useful description</div>
                  <div class="duration"> 2 mins</div>
              </div>
              <div class="exercise">
                  <div class="date"> 02-07-2018</div>
                  <div class="description"> useful description</div>
                  <div class="duration"> 20 mins</div>
              </div>
              <div class="exercise">
                  <div class="date"> 03-06-2018</div>
                  <div class="description"> useful description</div>
                  <div class="duration"> 2 mins</div>
              </div>
          </div>
      </div>
  </form>
  </section>
</>
)

export default Logs;