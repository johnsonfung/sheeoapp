import React, { useState, useEffect } from "react";
import Checkbox from "../Form/Checkbox";
import Dropdown from "../Form/Dropdown";
import TableForm from "../Form/TableForm";
import NextButton from "../Form/NextButton";
import { businessOwnership } from "../../utils/contentConfig";
import { Form, Button } from "react-bootstrap";
import ProgressBarContainer from "./ProgressBarContainer";

const BusinessOwnership = (props) => {
  const [rows, setRow] = useState([
    {
      label: "1",
      field: "1",
    },
  ]);

  const addRow = () => {
    let newRow = {};
    newRow.label = (rows.length + 1).toString();
    newRow.field = (rows.length + 1).toString();
    setRow((oldArray) => [...oldArray, newRow]);
  };

  const addSpecificRow = (label) => {
    let newRow = {};
    newRow.label = label;
    newRow.field = label;
    setRow((oldArray) => [...oldArray, newRow]);
  };

  useEffect(() => {
    if (
      props.userInfo &&
      props.userInfo.data &&
      props.userInfo.data.businessOwnership
    ) {
      const keys = Object.keys(props.userInfo.data.businessOwnership);
      keys.forEach((item, index) => {
        if (!isNaN(item)) {
          if (!rows.filter((e) => e.label === item).length > 0) {
            addSpecificRow(item);
          }
        }
      });
    }
  }, [props]);

  let businessTable;
  if (
    props.userInfo &&
    props.userInfo.data &&
    props.userInfo.data.businessOwnership &&
    props.userInfo.data.businessOwnership.ownedBusiness === "true"
  ) {
    businessTable = (
      <React.Fragment>
        <br />
        <br />
        <TableForm
          clientId={props.clientId}
          userInfo={props.userInfo}
          firstColumnSize="equal"
          columns={[
            {
              label: "Business name",
              subField: "businessName",
              fieldType: "text",
            },
            {
              label: "Business type",
              subField: "businessType",
              fieldType: "businessType",
            },
            {
              label: "Period of operation",
              placeholder: "e.g. 2 years 5 months",
              subField: "operationalPeriod",
              fieldType: "text",
            },
            {
              label:
                "Short summary of business activites and reason for exiting",
              subField: "businessSummary",
              fieldType: "textarea",
              size: 4,
            },
          ]}
          rows={rows}
          parent="businessOwnership"
          moneyField={true}
        />

        <Button
          onClick={() => {
            addRow();
          }}
        >
          + Add another business
        </Button>
      </React.Fragment>
    );
  }

  return (
    <div className="stepContainer">
      <div className="filingTitle">Section 14: Business Ownership</div>
      <div className="filingDescription">
        Estimated completion time: 10 min.
      </div>
      <ProgressBarContainer
        dataNeeded={businessOwnership.dataNeeded}
        data={props.userInfo.data}
      />
      <Form.Row>
        <Dropdown
          clientId={props.clientId}
          label="Have you owned or operated a business within the last five years?"
          parent="businessOwnership"
          field="ownedBusiness"
          data={props.userInfo}
          description="choose..."
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false },
          ]}
        />
      </Form.Row>
      {businessTable}

      <div className="sectionBottom">
        <Checkbox
          clientId={props.clientId}
          description="Flag this section for my Trustee"
          parent="businessOwnership"
          field="flag"
          data={props.userInfo}
        />
        <Checkbox
          clientId={props.clientId}
          description="I've completed this section"
          parent="businessOwnership"
          field="complete"
          data={props.userInfo}
        />
        <NextButton step={props.step} />
      </div>
    </div>
  );
};

export default BusinessOwnership;
