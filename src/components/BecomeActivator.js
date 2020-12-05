import React, { useState, useEffect } from "react";
import logo from "../images/sheeologo.png";
import { Row, Col, Card, Form } from "react-bootstrap";
import RegionButton from "./RegionButton";
import axios from "axios";

const BecomeActivator = (props) => {
  const [region, setRegion] = useState("CA");
  const [autoRenewAnnual, setAutoRenewAnnual] = useState(true);
  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);

  const loadChargebee = (callback) => {
    const existingScript = document.getElementById("chargebee");

    const environment = "stage";

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://js.chargebee.com/v2/chargebee.js";
      if (environment === "stage") {
        script["data-cb-site"] = "sheeo-test";
      } else if (environment === "prod") {
        script["data-cb-site"] = "sheeo";
      }
      script.id = "chargebee";
      document.body.appendChild(script);

      script.onload = () => {
        if (callback) callback();
      };
    }

    if (existingScript && callback) callback();
  };

  const scriptStatus = () => {
    console.log("scriptloaded");
  };

  const handleAutoRenewCheck = (e) => {
    setAutoRenewAnnual(!autoRenewAnnual);
  };

  useEffect(() => {
    loadChargebee(scriptStatus);
  }, [region]);

  useEffect(() => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        console.log(data);
        if (
          data["country_code"] === "CA" ||
          data["country_code"] === "US" ||
          data["country_code"] === "UK" ||
          data["country_code"] === "NZ" ||
          data["country_code"] === "AU"
        ) {
          setRegion(data["country_code"]);
        }
        if (data["country_code"] === "GB" || data["country_code"] === "IE") {
          setRegion("UK");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const config = {
    CA: {
      monthly: { pricing: "$92", id: "ca-monthly" },
      yearly: { pricing: "$1100", id: "ca-annual" },
      yearlySingle: { pricing: "$1100", id: "ca-single-year" },
    },
    US: {
      monthly: { pricing: "$92", id: "us-monthly" },
      yearly: { pricing: "$1100", id: "us-annual" },
      yearlySingle: { pricing: "$1100", id: "us-single-year" },
    },
    AU: {
      monthly: { pricing: "$92", id: "au-monthly" },
      yearly: { pricing: "$1100", id: "au-annual" },
      yearlySingle: { pricing: "$1100", id: "au-single-year" },
    },
    NZ: {
      monthly: { pricing: "$92", id: "nz-monthly" },
      yearly: { pricing: "$1100", id: "nz-annual" },
      yearlySingle: { pricing: "$1100", id: "nz-single-year" },
    },
    UK: {
      monthly: { pricing: "£71", id: "uk-monthly" },
      yearly: { pricing: "£850", id: "uk-annual" },
      yearlySingle: { pricing: "£850", id: "uk-single-year" },
    },
  };

  let regionArray = Object.keys(config);

  let monthlyButtons = regionArray.map((regionCode, index) => {
    let hideClass = "";
    if (regionCode !== region) {
      hideClass = "hidden";
    }
    return (
      <Card className={hideClass}>
        <Card.Body>
          <Card.Title>Monthly Payments</Card.Title>
          <div className="price">{config[regionCode].monthly.pricing}</div>
          <div className="period">per month</div>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <div className="ctaContainer">
            <a
              href="javascript:void(0)"
              data-cb-type="checkout"
              data-cb-plan-id={config[regionCode].monthly.id}
              className="primary-cta"
            >
              Pay Monthly
            </a>
          </div>
        </Card.Body>
      </Card>
    );
  });

  let yearlyButtons = regionArray.map((regionCode, index) => {
    let hideClass = "";
    if (regionCode !== region) {
      hideClass = "hidden";
    }

    let hideAnnualClass = "";
    let hideAnnualSingleClass = "";
    if (!autoRenewAnnual) {
      hideAnnualClass = " hidden";
    } else {
      hideAnnualSingleClass = " hidden";
    }

    return (
      <Card className={hideClass}>
        <Card.Body>
          <Card.Title>Annual Payments</Card.Title>
          <div className="price">{config[regionCode].yearly.pricing}</div>
          <div className="period">per year</div>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <div className="ctaContainer">
            <a
              href="javascript:void(0)"
              data-cb-type="checkout"
              data-cb-plan-id={config[regionCode].yearly.id}
              className={"primary-cta" + hideAnnualClass}
            >
              Pay Annually
            </a>
            <a
              href="javascript:void(0)"
              data-cb-type="checkout"
              data-cb-plan-id={config[regionCode].yearlySingle.id}
              className={"primary-cta" + hideAnnualSingleClass}
            >
              Pay Annually
            </a>
            <Form.Check
              type="checkbox"
              label="Auto-renew at the end of the year"
              checked={autoRenewAnnual}
              onChange={handleAutoRenewCheck}
              className="autoRenewCheckbox"
            />
          </div>
        </Card.Body>
      </Card>
    );
  });

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
          <div className="menuContainer">
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
          </div>
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
          <Col xs={12} sm={6}>
            {monthlyButtons}
          </Col>
          <Col xs={12} sm={6}>
            {yearlyButtons}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BecomeActivator;
