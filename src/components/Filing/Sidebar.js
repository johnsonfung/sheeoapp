import React, { useState, useEffect } from "react";
import { Row, Col, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { checkProgress } from "../../utils/functions";
import { stepOrder } from "../../utils/contentConfig";

const Sidebar = (props) => {
  let steps = stepOrder;

  let links = steps.map((step, index) => {
    let badge = "";
    if (props.data && props.data[step.key] && props.data[step.key].flag) {
      badge = <Badge variant="danger">Flagged</Badge>;
    } else if (step.dataNeeded) {
      let progress = checkProgress(step.dataNeeded, props.data);
      if (progress > 0) {
        if (progress === 100) {
          badge = <Badge variant="success">Done</Badge>;
        } else {
          badge = <Badge variant="warning">In progress</Badge>;
        }
      } else {
        badge = <Badge variant="light">To-Do</Badge>;
      }
    } else {
      badge = <Badge variant="light">To-Do</Badge>;
    }

    let activeSection = "";
    if (props.url.includes(step.slug)) {
      activeSection = " activeSection";
    }

    let clientIdUrl = "";
    if (props.clientId) {
      clientIdUrl = "/" + props.clientId;
    }

    // if not approved, do not show other data links
    let approvedStatus = false;
    if (props.data && props.data.status && props.data.status) {
      if (props.data.status.eligible === "eligible") {
        approvedStatus = true;
      }
    }

    if (!approvedStatus && !step.prescreen) {
      return "";
    } else {
      return (
        <div key={index} className="sidebarLinkContainer">
          <Link
            className={"sidebarLink" + activeSection}
            to={"/profile/" + step.slug + clientIdUrl}
          >
            <span className="section">Section {index}</span>
            {badge}
            <br />
            {step.name}
            <br />
          </Link>
        </div>
      );
    }
  });

  return <div className="sidebar">{links}</div>;
};

export default Sidebar;
