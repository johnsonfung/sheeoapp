import React, { useState, useEffect } from "react";
import { withAuthorization } from "../Session";
import { Row, Col, Container } from "react-bootstrap";
import Sidebar from "./Sidebar";
import PersonalInfo from "./PersonalInfo";

const Filing = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    const clientId = props.match.params.client;
    let uid = props.firebase.auth.currentUser.uid;
    if (clientId) {
      setClientId(clientId);
      uid = clientId;
    }
    const doc = props.firebase.user(uid);

    const observer = doc.onSnapshot(
      (docSnapshot) => {
        //console.log(`Received doc snapshot: ${docSnapshot}`);
        // ...
        setUserInfo(docSnapshot.data());
      },
      (err) => {
        console.error(`Encountered error: ${err}`);
        props.history.push("/access-denied");
      }
    );
  }, []);

  useEffect(() => {
    // console.log(userInfo);
  });

  let step = "";

  switch (props.match.params.step) {
    case "personalInfo":
      step = (
        <PersonalInfo
          userInfo={userInfo}
          step={props.match.params.step}
          clientId={clientId}
        />
      );
      break;
    default:
      step = "";
  }

  return (
    <Row>
      <Col xs={12} sm={4} md={4} lg={3} xl={2}>
        <Sidebar
          data={userInfo.data}
          url={props.match.url}
          clientId={clientId}
        />
      </Col>
      <Col>{step}</Col>
    </Row>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Filing);
