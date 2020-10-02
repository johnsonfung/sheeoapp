import React, { useState, useEffect } from "react";
import { withAuthorization } from "../Session";
import { Row, Col, Container, Table, Button } from "react-bootstrap";
import Dropdown from "../Form/Dropdown";

const Clients = (props) => {
  const [clientList, setClientList] = useState({});
  const [clientData, _setClientData] = useState({});
  const clientDataRef = React.useRef(clientData);
  const setClientData = (data) => {
    clientDataRef.current = data;
    _setClientData(data);
  };

  useEffect(() => {
    const uid = props.firebase.auth.currentUser.uid;
    const doc = props.firebase.clientList(uid);

    const observer = doc.onSnapshot(
      (docSnapshot) => {
        //console.log(`Received doc snapshot: ${docSnapshot}`);
        // ...
        setClientList(docSnapshot.data());
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }, []);

  useEffect(() => {
    let clientListArray = Object.keys(clientList);
    clientListArray.forEach((item, index) => {
      const addNewClientInfo = props.firebase.user(item).onSnapshot(
        (docSnapshot) => {
          let userData = docSnapshot.data();
          userData.id = item;
          console.log("something changed");
          setClientData({ ...clientDataRef.current, [item]: userData });
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
    });
  }, [clientList]);

  useEffect(() => {
    console.log(clientData);
  }, [clientData]);

  let step = "";

  console.log(clientData);
  let clientDataArray = [];
  let clientDataArrayNames = Object.keys(clientData);
  clientDataArrayNames.forEach((id, index) => {
    clientDataArray.push(clientData[id]);
  });
  console.log(clientDataArray);
  return (
    <div className="clients">
      <h1>My Clients</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Filing</th>
            <th>Eligible</th>
          </tr>
        </thead>
        <tbody>
          {clientDataArray.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.email}</td>
                {item.data && item.data.personalInfo ? (
                  <td>{item.data.personalInfo.givenName}</td>
                ) : (
                  <td></td>
                )}
                {item.data && item.data.personalInfo ? (
                  <td>{item.data.personalInfo.familyName}</td>
                ) : (
                  <td></td>
                )}
                <td>
                  <Button href={"/filing/personalInfo/" + item.id}>
                    See Filing
                  </Button>
                </td>
                <td>
                  <Dropdown
                    clientId={item.id}
                    parent="status"
                    field="eligible"
                    description=""
                    data={item}
                    options={[
                      { label: "Pending", value: "pending" },
                      { label: "Eligible", value: "eligible" },
                      { label: "Not Eligible", value: "notEligible" },
                    ]}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Clients);
