import React, { useState } from "react";
import Checkbox from "../Form/Checkbox";
import InputField from "../Form/InputField";
import Dropdown from "../Form/Dropdown";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import ProgressBarContainer from "./ProgressBarContainer";
import { personalInfo } from "../../utils/contentConfig";
import NextButton from "../Form/NextButton";
import ContentModalLegalName from "../Modals/ContentModalLegalName";
import ContentModalProvince from "../Modals/ContentModalProvince";

const PersonalInfo = (props) => {
  return (
    <div className="stepContainer">
      <div className="filingTitle">Section 1: Personal Information</div>
      <div className="filingDescription">Estimated completion time: 5 min.</div>
      <ProgressBarContainer
        dataNeeded={personalInfo.dataNeeded}
        data={props.userInfo.data}
      />
      <Form.Row>
        <Col xs={4}>
          <InputField
            clientId={props.clientId}
            label="Given name(s)"
            description="This is your legal first name on your identification"
            parent="personalInfo"
            field="givenName"
            data={props.userInfo}
            modal={<ContentModalLegalName />}
          />
        </Col>
        <Col xs={4}>
          <InputField
            clientId={props.clientId}
            label="Family name"
            description="This is your legal last name on your identification"
            parent="personalInfo"
            field="familyName"
            data={props.userInfo}
            modal={<ContentModalLegalName />}
          />
        </Col>
        <Col>
          <InputField
            clientId={props.clientId}
            label="Other name(s)"
            description="Any other names you might go by"
            parent="personalInfo"
            field="otherName"
            data={props.userInfo}
          />
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <Dropdown
            clientId={props.clientId}
            label="Gender"
            parent="personalInfo"
            field="gender"
            data={props.userInfo}
            description="choose..."
            options={[
              { label: "Female", value: "female" },
              { label: "Male", value: "male" },
              { label: "Non-Binary", value: "nonBinary" },
            ]}
          />
        </Col>
        <Col>
          <InputField
            clientId={props.clientId}
            label="Date of birth"
            description="dd/mm/yy"
            parent="personalInfo"
            field="dateOfBirth"
            data={props.userInfo}
          />
        </Col>
      </Form.Row>
      <Form.Row>
        <Col xs={8}>
          <InputField
            clientId={props.clientId}
            label="Street address"
            description="(e.g. 235 Appleton St.)"
            parent="personalInfo"
            field="streetAddress"
            data={props.userInfo}
          />
        </Col>
        <Col>
          <InputField
            clientId={props.clientId}
            label="Address line 2"
            description="(e.g. Apt. 4B)"
            parent="personalInfo"
            field="streetAddress2"
            data={props.userInfo}
          />
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <InputField
            label="City"
            description="(e.g. Windsor)"
            parent="personalInfo"
            field="city"
            data={props.userInfo}
          />
        </Col>
        <Col>
          <Dropdown
            clientId={props.clientId}
            label="Province"
            parent="personalInfo"
            field="province"
            description="choose..."
            data={props.userInfo}
            options={[
              { label: "Alberta", value: "AB" },
              { label: "British Columbia", value: "BC" },
              { label: "Manitoba", value: "MB" },
              { label: "Newfoundland and Labrador", value: "NL" },
              { label: "Northwest Territories", value: "NT" },
              { label: "Nova Scotia", value: "NS" },
              { label: "Nunavut", value: "NU" },
              { label: "Ontario", value: "ON" },
              { label: "Prince Edward Island", value: "PEI" },
              { label: "Quebec", value: "QC" },
              { label: "Saskatchewan", value: "SK" },
              { label: "Yukon", value: "YT" },
            ]}
            modal={<ContentModalProvince />}
          />
        </Col>
        <Col>
          <InputField
            clientId={props.clientId}
            label="Postal code"
            description="(e.g. A1B 2C3)"
            parent="personalInfo"
            field="postalCode"
            data={props.userInfo}
          />
        </Col>
        <Col>
          <InputField
            clientId={props.clientId}
            label="Phone number"
            description="(e.g. 416-555-5555)"
            parent="personalInfo"
            field="phone"
            data={props.userInfo}
          />
        </Col>
      </Form.Row>
      <div className="sectionBottom">
        <NextButton step={props.step} />
      </div>
    </div>
  );
};

export default PersonalInfo;
