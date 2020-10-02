import React from "react";
import { Link } from "react-router-dom";
import { AuthUserContext, withAuthorization } from "../Session";

import * as ROUTES from "../../constants/routes";
import SignOutButton from "../SignOut";

import { Row, Col } from "react-bootstrap";
import { withFirebase } from "../Firebase";

import logo from "./sheeologo.png";

const Navigation = (props, { authUser }) => {
  return (
    <div className="navBar">
      <div className="logo">
        <img src={logo} />
      </div>
      <AuthUserContext.Consumer>
        {(authUser) => {
          return authUser ? (
            <NavigationAuth {...props} />
          ) : (
            <NavigationNonAuth {...props} />
          );
        }}
      </AuthUserContext.Consumer>
    </div>
  );
};

const NavigationAuth = (props) => {
  return (
    <div className="navGroup">
      {/*
      <div className="navLink">
        <Link to={ROUTES.LANDING}>Landing</Link>
      </div>
      {props.claims.trustee && (
        <div className="navLink">
          <Link to={ROUTES.CLIENTS}>My Clients</Link>
        </div>
         <div className="navLink">
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </div>
      )}*/}

      <div className="navLink">
        <Link to={ROUTES.PROFILE}>My Profile</Link>
      </div>
      <div className="navLink">
        <Link to={ROUTES.ACTIVATORFLOW}>Become an Activator</Link>
      </div>
      <div className="navLink">
        <Link to={ROUTES.EVENTS}>Events</Link>
      </div>

      <div className="navLink">
        <SignOutButton />
      </div>
    </div>
  );
};

const NavigationNonAuth = (props) => (
  <div className="navGroup">
    <div className="navLink">
      <Link to={ROUTES.LANDING}>Landing</Link>
    </div>
    <div className="navLink">
      <Link to={ROUTES.SIGN_UP}>Login/Register</Link>
    </div>
  </div>
);

export default withAuthorization(() => {
  return true;
})(Navigation);
