import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BecomeActivator from "./components/BecomeActivator";
import RegisterForEvent from "./components/RegisterForEvent";

import Home from "./components/Home";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/activate">
            <BecomeActivator />
          </Route>
          <Route path="/register-for-event">
            <RegisterForEvent />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
