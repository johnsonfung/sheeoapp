import React, { useState, useEffect } from "react";
import logo from "../images/sheeologo.png";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import RegionButton from "./RegionButton";
import axios from "axios";
import * as tools from "../functions";
import * as EmailValidator from "email-validator";

const RegisterForEvent = (props) => {
  const [guestR, setGuestR] = useState("");
  const [memberR, setMemberR] = useState("");
  const [event, setEvent] = useState("");
  const [contactExists, setContactExists] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const checkAndRedirect = (email) => {
    if (!EmailValidator.validate(email)) {
      setError("Hmm...that email doesn't seem right.");
    } else {
      setError("");
      setLoading(true);
      axios
        .get(
          "https://sheeo-server-core.herokuapp.com/salesforce/checkContactByEmail",
          {
            params: {
              email: email,
            },
          }
        )
        .then((response) => {
          if (response.data === false) {
            // Simulate a mouse click:
            window.location.href =
              "https://survey.alchemer.com/s3/" + guestR + "?email=" + email;
          } else if (response.data === true) {
            window.location.href =
              "https://survey.alchemer.com/s3/" + memberR + "?email=" + email;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setGuestR(tools.getUrlParameter("guest"));
    setMemberR(tools.getUrlParameter("member"));
    setEvent(tools.getUrlParameter("event"));
  }, []);

  return (
    <div className="landingContainer">
      <div className="topBar"></div>
      <div className="logoBar">
        <div className="logo">
          <img src={logo} />
        </div>
      </div>
      <h4>Registration</h4>
      <div className="eventName">
        {event && event}
        {!event && "SheEO Events"}
      </div>

      <div className="emailEntry">
        <Row>
          <Col>
            <input
              className="emailInput"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
            ></input>
            {error && <div className="valError">{error}</div>}
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="cta">
              {!loading && (
                <Button
                  className="primary-cta"
                  onClick={() => {
                    checkAndRedirect(email);
                  }}
                >
                  Continue
                </Button>
              )}
              {loading && (
                <Button variant="primary" className="loading-cta" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="spinner"
                  />
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RegisterForEvent;
