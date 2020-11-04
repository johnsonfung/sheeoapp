import React, { useState } from "react";
import logo from "../images/sheeologo.png";
import { Row, Col, Card } from "react-bootstrap";
import RegionButton from "./RegionButton";
const BecomeActivator = (props) => {
  const [region, setRegion] = useState("CA");
  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);

  const handleClick = (value) => {
    setRegion(value);
  };

  const pricing = {
    CA: {
      monthly: "$92",
      yearly: "$1100",
    },
    US: {
      monthly: "$92",
      yearly: "$1100",
    },
    AU: {
      monthly: "$92",
      yearly: "$1100",
    },
    NZ: {
      monthly: "$92",
      yearly: "$1100",
    },
    UK: {
      monthly: "£71",
      yearly: "£850",
    },
  };

  return (
    <div className="landingContainer">
      <div className="topBar"></div>
      <div className="logoBar">
        <div className="logo">
          <img src={logo} />
        </div>
      </div>
      <h1>Become an activator</h1>
      <div className="description">
        Join a global community of radically generous women + together we'll
        work to transform systems.
      </div>
      <div className="regionContainer">
        <div className="description">Choose your region:</div>
        <RegionButton
          click={setRegion}
          label="Canada"
          region="CA"
          selected={region}
        />
        <RegionButton
          click={setRegion}
          label="US"
          region="US"
          selected={region}
        />
        <RegionButton
          click={setRegion}
          label="UK"
          region="UK"
          selected={region}
        />
        <RegionButton
          click={setRegion}
          label="New Zealand"
          region="NZ"
          selected={region}
        />
        <RegionButton
          click={setRegion}
          label="Australia"
          region="AU"
          selected={region}
        />{" "}
      </div>

      <div className="paymentOptions">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Monthly Payments</Card.Title>
                <div className="price">{pricing[region].monthly}</div>
                <div className="period">per month</div>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <div className="ctaContainer">
                  <a
                    href="javascript:void(0)"
                    data-cb-type="checkout"
                    data-cb-plan-id="ca-1-year-activation"
                    className="primary-cta"
                  >
                    Pay Monthly
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Annual Payments</Card.Title>
                <div className="price">{pricing[region].yearly}</div>
                <div className="period">per year</div>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <div className="ctaContainer">
                  <a
                    href="javascript:void(0)"
                    data-cb-type="checkout"
                    data-cb-plan-id="ca-1-year-activation"
                    className="primary-cta"
                  >
                    Pay Annually
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BecomeActivator;
