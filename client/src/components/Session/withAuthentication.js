import React from 'react';

import AuthUserContext from './context';
import AuthUserObjectContext from './contextUser';
import { withFirebase } from '../Firebase';
import axios from "axios";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
        userobj:   "ettset"
      };
    }

     componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.setState({ authUser });
        },
        () => {
          localStorage.removeItem('authUser');
          this.setState({ authUser: null });
        },
      );
   
        axios.post("/api/exercise/user",{
          usermail: this.state.authUser.email
        }).then(response => {
          this.setState({ ...this.state, userobj: response.data })
        })
        .catch(error => {
          console.log(error);
        });
        
    
  
      

    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <AuthUserObjectContext.Provider value={this.state.userobj}>
          <Component {...this.props} />
          </AuthUserObjectContext.Provider>
          </AuthUserContext.Provider>
        
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
