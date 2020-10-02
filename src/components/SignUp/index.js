import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { compose } from "recompose";
import { Button } from "react-bootstrap";

import signUpIcon from "./signupIcon.svg";

const SignUpPage = () => (
  <div className="signup">
    <img className="icon" src={signUpIcon} />
    <h1>Register / Sign-In</h1>
    <div className="description">
      Enter your email below and we'll send you a secure link to start or access
      your filing.
    </div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    if (this.props.firebase.auth.isSignInWithEmailLink(window.location.href)) {
      var email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      this.props.firebase.auth
        .signInWithEmailLink(email, window.location.href)
        .then((authUser) => {
          // Create a user in your Firebase realtime database
          return this.props.firebase.user(authUser.user.uid).set(
            {
              email,
            },
            { merge: true }
          );
        })
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
          this.props.history.push(ROUTES.PROFILE);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { email } = this.state;

    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: "http://localhost:3000/signup",
      // This must be true.
      handleCodeInApp: true,
    };

    this.props.firebase
      .doSendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        console.log("email sent");
        window.localStorage.setItem("emailForSignIn", email);
        this.props.history.push(ROUTES.CHECK_EMAIL);
      })
      .catch((error) => {
        console.log(error);
        // Some error occurred, you can inspect the code: error.code
      });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === "";
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Button disabled={isInvalid} type="submit">
          Register / Sign In
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
