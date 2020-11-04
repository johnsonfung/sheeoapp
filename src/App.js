import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BecomeActivator from "./components/BecomeActivator";
import Home from "./components/Home";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/become-an-activator">
            <BecomeActivator />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
