import React from 'react';

import { withFirebase } from './Firebase';


const Logout = ({ firebase }) => (

    <div onClick={firebase.doSignOut} className="dropdownmenu">
      Sign Out
    </div>
  );
  
  export default withFirebase(Logout);