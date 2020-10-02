import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import Filing from "../Filing/Filing";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import CheckEmail from "../CheckEmail";
import Clients from "../Clients";
import ActivatorFlow from "../ActivatorFlow";
import Events from "../Events";

import "../../App.scss";

import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import { withAuthentication } from "../Session";
import AccessDenied from "../AccessDenied";

const App = () => (
  <Router>
    <div className="rootContainer">
      <Navigation />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.ACCESS_DENIED} component={AccessDenied} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.CHECK_EMAIL} component={CheckEmail} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.CLIENTS} component={Clients} />
      <Route exact path={ROUTES.FILINGSTEPCLIENT} component={Filing} />
      <Route exact path={ROUTES.PROFILESTEP} component={Filing} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.ACTIVATORFLOW} component={ActivatorFlow} />
      <Route exact path={ROUTES.EVENTSFORM} component={Events} />
      <Route exact path={ROUTES.EVENTS} component={Events} />
    </div>
  </Router>
);

export default withAuthentication(App);
