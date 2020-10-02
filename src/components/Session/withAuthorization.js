import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);
      this.state = { claims: "" };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        (authUser) => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_UP);
          } else {
            this.props.firebase.auth.currentUser
              .getIdTokenResult()
              .then((idTokenResult) => {
                this.setState({ claims: idTokenResult.claims });
                return idTokenResult.claims;
              })
              .catch((error) => {
                console.error(error);
              });
          }
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) =>
            condition(authUser) ? (
              <Component claims={this.state.claims} {...this.props} />
            ) : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(withRouter, withFirebase)(WithAuthorization);
};

export default withAuthorization;
