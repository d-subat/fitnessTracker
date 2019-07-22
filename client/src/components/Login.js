import React, { Component } from "react";
import SvgIcon from "./SvgIcon";
import FormInput from "./FormInput";

import { withFirebase } from "./Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "./routes";

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
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {}
        });
      })
      .then(socialAuthUser => {
        this.setState({ error: null });

        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
        this.props.showStatus(error);
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button className="btn btn-google" type="submit">
          <SvgIcon name="google" />Login with  Google
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

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
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {}
        });
      })
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
        this.props.showStatus(error);
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button className="btn btn-facebook" type="submit">
          <SvgIcon name="facebook" />Login with  Facebook
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

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
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {}
        });
      })
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
        this.props.showStatus(error);
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button className="btn btn-twitter" type="submit">
          <SvgIcon name="twitter" /> Login with  Twitter
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

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
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {}
        });
      })
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
        this.props.showStatus(error);
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button className="btn btn-github" type="submit">
          <SvgIcon name="github" />Login with  Github
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}


class SignInEmailBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    console.log(".-....----")
    event.preventDefault();
    /*
    this.props.firebase
      .doSignInWithGithub()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {}
        });
      })
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
        this.props.showStatus(error);
      });
*/
    
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button onClick={this.props.onClick} className="btn btn-email" >
          <SvgIcon name="feUserMail" />Login with EMail
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInGoogle = compose(
  withRouter,
  withFirebase
)(SignInGoogleBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase
)(SignInFacebookBase);

const SignInTwitter = compose(
  withRouter,
  withFirebase
)(SignInTwitterBase);

const SignInGithub = compose(
  withRouter,
  withFirebase
)(SignInGithubBase);

const SignInEmail = compose(
  withRouter,
  withFirebase
)(SignInEmailBase);

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      status: null,
      signEmail: ""};
  }
  showStatus = msg => {
    const status = Object.values(msg).join(" ");
    this.setState({ status: status });
  };
 toggleEmail = () => {
  
  this.setState({ signEmail: !this.state.signEmail });}

  render() {
    return (
      <>
        {this.state.status && (
          <div className="statusMessage"> {this.state.status}</div>
        )}
        <section>
          <h4>FitnessTracker</h4>
          <h1>Login</h1>

          <div
            action="/api/exercise/login"
            id="usrfrm1"
            className="box"
            method="post"
          >   
          

            <div className="fieldset">
        
              <div class="field">
                
                <div className="fieldrow">
                  <SignInGoogle showStatus={this.showStatus} />
                  <SignInGithub showStatus={this.showStatus} />
                  <SignInTwitter showStatus={this.showStatus} />
                  <SignInFacebook showStatus={this.showStatus} />
                  <SignInEmail onClick={this.toggleEmail} showStatus={this.showStatus} />
                </div>
              </div>
              {
              <>
              
              <div className={this.state.signEmail? "field manually " : "field manually closed"}>
              <legend>Create New Account</legend>
              <div className="fieldrow">
                <FormInput
                  fieldName={"UserName"}
                  type={"text"}
                  required={true}
                  handler={"e => this.handleMessageInput(e)"}
                />
              </div>
              <div className="fieldrow">
                <FormInput
                  fieldName={"Password"}
                  type={"text"}
                  required={true}
                  handler={"e => this.handleMessageInput(e)"}
                />
              </div>
              <div className="fieldrow">
                <FormInput
                  fieldName={"PasswordCheck"}
                  type={"text"}
                  required={true}
                  handler={"e => this.handleMessageInput(e)"}
                />
              </div>
              
              <div className="fieldrow">
                <button className="btn" disabled>
                  Create Your Free Account
                </button>
              </div>
              </div>
              
            
          </>
              }
              </div>
          </div>
        </section>
      </>
    );
  }
}

export { SignInGoogle };
export default Login;
