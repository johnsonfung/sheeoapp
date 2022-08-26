import React, { useState, useEffect } from "react";
import logo from "../images/coraluslogo.png";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import RegionButton from "./RegionButton";
import axios from "axios";
import * as tools from "../functions";
import * as EmailValidator from "email-validator";
import Markdown from "markdown-to-jsx";
import Moment from "react-moment";

const RegisterForEvent = (props) => {
  const [formUrl, setFormUrl] = useState("");
  const [contactExists, setContactExists] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [eventId, setEventId] = useState("");
  const [eventDetails, setEventDetails] = useState({});

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
              formUrl + "?email=" + email + "&type=new&eventid=" + eventId;
          } else if (response.data === true) {
            window.location.href =
              formUrl +
              "?email=" +
              email +
              "&type=returning&eventid=" +
              eventId;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getEventFromAirtable = (id) => {
    axios
      .get("https://sheeo-server-core.herokuapp.com/airtable/event", {
        params: {
          eventId: id,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (
          response &&
          response.data &&
          response.data.length > 0 &&
          response.data[0].fields
        ) {
          setEventDetails(response.data[0].fields);
        } else {
          return {};
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setEventId(tools.getUrlParameter("eventID"));
  }, []);

  useEffect(() => {
    if (eventId) {
      console.log(eventId);
      getEventFromAirtable(eventId);
    }
  }, [eventId]);

  useEffect(() => {
    setFormUrl(eventDetails.formUrl);
  }, [eventDetails]);

  return (
    <div className="landingContainer">
      <div className="topBar"></div>
      <div className="logoMenuBar">
        <div className="logoMenuContainer">
          <div className="logo">
            <a href="https://sheeo.world">
              <img src={logo} />
            </a>
          </div>
          {/* <div className="menuContainer">
            <div className="menu">
              <div className="menuText">
                <a href="https://sheeo.world/about-us/">About Us</a>
              </div>
            </div>
            <div className="menu">
              <div className="menuText">
                <a href="https://sheeo.world/activators/">Activators</a>
              </div>
            </div>
            <div className="menu">
              <div className="menuText">
                <a href="https://sheeo.world/ventures/">Ventures</a>
              </div>
            </div>
            <div className="menu">
              <div className="menuText">
                <a href="https://community.sheeo.world/events">Events</a>
              </div>
            </div>
            <div className="menu">
              <div className="menuText">
                <a href="https://sheeo.world/learn/">Learn</a>
              </div>
            </div>
            <div className="menu">
              <div className="menuText">
                <a href="https://sheeo.world/connect/">Connect</a>
              </div>
            </div>
          </div>*/}
        </div>
      </div>

      {eventDetails.eventImage &&
        eventDetails.eventImage.length > 0 &&
        eventDetails.eventImage[0].url && (
          <div className="eventImage">
            <img src={eventDetails.eventImage[0].url} />
          </div>
        )}
      <h4>Registration</h4>
      <div className="eventName">
        {eventDetails.eventName && eventDetails.eventName}
        {!eventDetails.eventName && "Coralus Events"}
      </div>
      {eventDetails.eventDate && (
        <div className="eventDate">
          <Moment format="MMMM D, YYYY" date={eventDetails.eventDate} />
        </div>
      )}
      {eventDetails.eventDescription && (
        <div className="eventDescription">
          <Markdown>{eventDetails.eventDescription}</Markdown>
        </div>
      )}

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
