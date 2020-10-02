import React, { useState, useEffect } from "react";
import Checkbox from "../Form/Checkbox";
import Dropdown from "../Form/Dropdown";
import TableForm from "../Form/TableForm";
import NextButton from "../Form/NextButton";
import { otherTransactions } from "../../utils/contentConfig";
import { Row, Col, Form, Button } from "react-bootstrap";
import ProgressBarContainer from "./ProgressBarContainer";
import InputField from "../Form/InputField";

const OtherTransactions = (props) => {
  return (
    <div className="stepContainer">
      <div className="filingTitle">Section 15: Other Transactions</div>
      <div className="filingDescription">
        Estimated completion time: 10 min.
      </div>
      <ProgressBarContainer
        dataNeeded={otherTransactions.dataNeeded}
        data={props.userInfo.data}
      />
      <h3>
        Within 12 months prior to the date of the initial bankruptcy event, have
        you, either in Canada or elsewhere
      </h3>
      <Row>
        <Col>
          <Dropdown
            clientId={props.clientId}
            label="Sold or disposed of any of your property"
            parent="otherTransactions"
            field="twelveMonthsSoldProperty"
            data={props.userInfo}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
          />
        </Col>
        <Col>
          <Dropdown
            clientId={props.clientId}
            label="Made payments in excess of the regular payments to creditors?"
            parent="otherTransactions"
            field="twelveMonthsExcessPayments"
            data={props.userInfo}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
          />
        </Col>
        <Col>
          <Dropdown
            clientId={props.clientId}
            label="Had any property seized by a creditor?"
            parent="otherTransactions"
            field="twelveMonthsSeizedProperty"
            data={props.userInfo}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
          />
        </Col>
      </Row>
      {props.userInfo &&
        props.userInfo.data &&
        props.userInfo.data.otherTransactions &&
        (props.userInfo.data.otherTransactions.twelveMonthsSoldProperty ===
          "true" ||
          props.userInfo.data.otherTransactions.twelveMonthsExcessPayments ===
            "true" ||
          props.userInfo.data.otherTransactions.twelveMonthsSeizedProperty ===
            "true") && (
          <Row>
            <Col>
              <InputField
                clientId={props.clientId}
                label="Please describe details"
                parent="otherTransactions"
                field="twelveMonthsDetails"
                data={props.userInfo}
                fieldType="textarea"
              />
            </Col>
          </Row>
        )}
      <h3>
        Within 5 years prior to the date of the initial bankruptcy event, have
        you, either in Canada or elsewhere:
      </h3>
      <Row>
        <Col>
          <Dropdown
            clientId={props.clientId}
            label="Sold or disposed of any of your property"
            parent="otherTransactions"
            field="fiveYearsSoldProperty"
            data={props.userInfo}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
          />
        </Col>
        <Col>
          <Dropdown
            clientId={props.clientId}
            label="Made any gifts to relatives or others in excess of $500?"
            parent="otherTransactions"
            field="fiveYearsGifts"
            data={props.userInfo}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
          />
        </Col>
      </Row>
      {props.userInfo &&
        props.userInfo.data &&
        props.userInfo.data.otherTransactions &&
        (props.userInfo.data.otherTransactions.fiveYearsSoldProperty ===
          "true" ||
          props.userInfo.data.otherTransactions.fiveYearsGifts === "true") && (
          <Row>
            <Col>
              <InputField
                clientId={props.clientId}
                label="Please describe details"
                parent="otherTransactions"
                field="fiveYearsDetails"
                data={props.userInfo}
                fieldType="textarea"
              />
            </Col>
          </Row>
        )}

      <div className="sectionBottom">
        <Checkbox
          clientId={props.clientId}
          description="Flag this section for my Trustee"
          parent="otherTransactions"
          field="flag"
          data={props.userInfo}
        />
        <Checkbox
          clientId={props.clientId}
          description="I've completed this section"
          parent="otherTransactions"
          field="complete"
          data={props.userInfo}
        />
        <NextButton step={props.step} />
      </div>
    </div>
  );
};

export default OtherTransactions;
