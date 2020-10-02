import React, { useState } from "react";
import Checkbox from "../Form/Checkbox";
import InputField from "../Form/InputField";
import Dropdown from "../Form/Dropdown";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import ProgressBarContainer from "./ProgressBarContainer";
import { householdOccupation } from "../../utils/contentConfig";
import NextButton from "../Form/NextButton";

const HouseholdOccupation = (props) => {
  let dateOfMartialEvent = "";
  if (props.userInfo.data) {
    if (props.userInfo.data.householdOccupation) {
      if (
        props.userInfo.data.householdOccupation.martialStatus &&
        props.userInfo.data.householdOccupation.martialStatus !== "single"
      ) {
        dateOfMartialEvent = (
          <InputField
            clientId={props.clientId}
            label="Specify month and year of event if it occurred in the last five years:"
            description="mm/yy"
            parent="householdOccupation"
            field="dateOfMartialEvent"
            data={props.userInfo}
          />
        );
      }
    }
  }

  let numberOfMinors = "";
  if (props.userInfo.data) {
    if (props.userInfo.data.householdOccupation) {
      if (
        props.userInfo.data.householdOccupation.personsInHousehold &&
        props.userInfo.data.householdOccupation.personsInHousehold > 1
      ) {
        numberOfMinors = (
          <Dropdown
            clientId={props.clientId}
            label="Number of persons 17 years of age or younger:"
            parent="householdOccupation"
            field="minorsInHousehold"
            description="choose..."
            data={props.userInfo}
            options={[
              { label: "1", value: 1 },
              { label: "2", value: 2 },
              { label: "3", value: 3 },
              { label: "4", value: 4 },
              { label: "5", value: 5 },
              { label: "6", value: 6 },
              { label: "7", value: 7 },
              { label: "8", value: 8 },
              { label: "9", value: 9 },
              { label: "10", value: 10 },
            ]}
          />
        );
      }
    }
  }

  return (
    <div className="stepContainer">
      <div className="filingTitle">Section 2: Household and Occupation</div>
      <div className="filingDescription">Estimated completion time: 2 min.</div>
      <ProgressBarContainer
        dataNeeded={householdOccupation.dataNeeded}
        data={props.userInfo.data}
      />
      <Form.Row>
        <Col>
          <Dropdown
            clientId={props.clientId}
            label="Marital Status"
            parent="householdOccupation"
            field="martialStatus"
            description="choose..."
            data={props.userInfo}
            options={[
              { label: "Single", value: "single" },
              { label: "Married", value: "married" },
              { label: "Widowed", value: "widowed" },
              { label: "Separated", value: "separated" },
              { label: "Divorced", value: "divorced" },
              { label: "Common-law Partner", value: "commonlawPartner" },
            ]}
          />
        </Col>
        <Col xs={4}>{dateOfMartialEvent}</Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <Dropdown
            clientId={props.clientId}
            label="Number of persons in household family unit, including individual filing for bankruptcy"
            parent="householdOccupation"
            field="personsInHousehold"
            description="choose..."
            data={props.userInfo}
            options={[
              { label: "1", value: 1 },
              { label: "2", value: 2 },
              { label: "3", value: 3 },
              { label: "4", value: 4 },
              { label: "5", value: 5 },
              { label: "6", value: 6 },
              { label: "7", value: 7 },
              { label: "8", value: 8 },
              { label: "9", value: 9 },
              { label: "10", value: 10 },
            ]}
          />
        </Col>
        <Col>{numberOfMinors}</Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <InputField
            clientId={props.clientId}
            label="Name of present employer"
            description="or enter 'umemployed'"
            parent="householdOccupation"
            field="employer"
            data={props.userInfo}
          />
        </Col>
        <Col>
          <InputField
            clientId={props.clientId}
            label="Occupation"
            description="(e.g. Waiter)"
            parent="householdOccupation"
            field="occupation"
            data={props.userInfo}
          />
        </Col>
      </Form.Row>
      <div className="sectionBottom">
        {/*
        <Checkbox
          clientId={props.clientId}
          description="Flag this section for my Trustee"
          parent="householdOccupation"
          field="flag"
          data={props.userInfo}
        />*/}
        <NextButton step={props.step} />
      </div>
    </div>
  );
};

export default HouseholdOccupation;
