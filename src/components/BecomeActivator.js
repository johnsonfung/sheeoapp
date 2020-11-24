import React, { useState, useEffect } from "react";
import logo from "../images/sheeologo.png";
import { Row, Col, Card } from "react-bootstrap";
import RegionButton from "./RegionButton";
import axios from "axios";

const BecomeActivator = (props) => {
  const [region, setRegion] = useState("CA");
  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);

  const loadChargebee = (callback) => {
    const existingScript = document.getElementById("chargebee");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://js.chargebee.com/v2/chargebee.js";
      script["data-cb-site"] = "sheeo-test";
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
    },
    US: {
      monthly: { pricing: "$92", id: "us-monthly" },
      yearly: { pricing: "$1100", id: "us-annual" },
    },
    AU: {
      monthly: { pricing: "$92", id: "au-monthly" },
      yearly: { pricing: "$1100", id: "au-annual" },
    },
    NZ: {
      monthly: { pricing: "$92", id: "nz-monthly" },
      yearly: { pricing: "$1100", id: "nz-annual" },
    },
    UK: {
      monthly: { pricing: "£71", id: "uk-monthly" },
      yearly: { pricing: "£850", id: "uk-annual" },
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
              className="primary-cta"
            >
              Pay Annually
            </a>
          </div>
        </Card.Body>
      </Card>
    );
  });

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
          <Col>{monthlyButtons}</Col>
          <Col>{yearlyButtons}</Col>
        </Row>
      </div>
    </div>
  );
};

export default BecomeActivator;
