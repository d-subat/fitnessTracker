import React, {Component} from 'react';
import SvgIcon from "./SvgIcon";

import { withFirebase } from './Firebase';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from './routes';

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: {},
          });
      })
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button className="btn btn-google" type="submit"><SvgIcon name="github" /> Google</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: socialAuthUser.additionalUserInfo.profile.email,
            roles: {},
          });
      })
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button className="btn btn-facebook" type="submit"><SvgIcon name="facebook" /> Facebook</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase);

class SignInTwitterBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: socialAuthUser.additionalUserInfo.profile.email,
            roles: {},
          });
      })
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button className="btn btn-twitter" type="submit"><SvgIcon name="twitter" /> Twitter</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}


const SignInTwitter = compose(
  withRouter,
  withFirebase,
)(SignInTwitterBase);


class SignInGithubBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGithub()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: socialAuthUser.additionalUserInfo.profile.email,
            roles: {},
          });
      })
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button className="btn btn-github" type="submit"><SvgIcon name="github" /> Github</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}


const SignInGithub = compose(
  withRouter,
  withFirebase,
)(SignInGithubBase);

const Login = (props) => (
    <>
    <section>
          <h4>FitnessTracker</h4>
          <h1>Login</h1>

          <div
            action="/api/exercise/login"
            id="usrfrm2"
            className="box"
            method="post"
          ><div className="field">
     <label for="feFirstName">Username</label>
                    <input
                      id="username"
                      placeholder="Username"
                      
                      value=""
                    />
                  </div>
                  <div className="field">
                    <label for="feLastName">Password</label>
                    <input
                      id="password"
                      placeholder="Password"
                      
                      value=""
                    />
                  </div>
                  <button className="btn">Login</button>
                  <hr style={{width:"100%"}}/>
                  or you can 
                  <div className="fieldrow">
                  <SignInGoogle />
                  <SignInGithub />
                  <SignInTwitter />                  
                  <SignInFacebook />
                  </div>
          </div>
    
</section>
</>
)

export { SignInGoogle };
export default Login;