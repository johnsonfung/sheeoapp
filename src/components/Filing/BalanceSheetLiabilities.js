import React, { useState, useEffect } from "react";
import Checkbox from "../Form/Checkbox";
import InputField from "../Form/InputField";
import Dropdown from "../Form/Dropdown";
import Form from "react-bootstrap/Form";
import { Col, Button } from "react-bootstrap";
import ProgressBarContainer from "./ProgressBarContainer";
import { balanceSheetLiabilities } from "../../utils/contentConfig";
import TableForm from "../Form/TableForm";
import NextButton from "../Form/NextButton";

const BalanceSheetLiabilities = (props) => {
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
      props.userInfo.data.balanceSheetLiabilities
    ) {
      const keys = Object.keys(props.userInfo.data.balanceSheetLiabilities);
      keys.forEach((item, index) => {
        if (!isNaN(item)) {
          if (!rows.filter((e) => e.label === item).length > 0) {
            addSpecificRow(item);
          }
        }
      });
    }
  }, [props]);

  return (
    <div className="stepContainer">
      <div className="filingTitle">Section 13: Balance Sheet - Liabilities</div>
      <div className="filingDescription">
        Please enter an amount for the following liabilities that apply to you
      </div>
      <ProgressBarContainer
        dataNeeded={balanceSheetLiabilities.dataNeeded}
        data={props.userInfo.data}
      />
      <TableForm
        clientId={props.clientId}
        userInfo={props.userInfo}
        firstColumnSize="equal"
        columns={[
          {
            label: "Creditor",
            subField: "creditor",
            fieldType: "text",
            size: 2,
          },
          {
            label: "Address",
            subField: "address",
            fieldType: "text",
          },
          {
            label: "Province/Territory",
            subField: "province",
            fieldType: "province",
            size: 1,
          },
          {
            label: "Postal code",
            subField: "postalCode",
            fieldType: "text",
            size: 1,
          },
          {
            label: "Account No.",
            subField: "accountNo",
            fieldType: "text",
          },
          { label: "Unsecured Debt", subField: "debtUnsecured" },
          { label: "Secured Debt", subField: "debtSecured" },
          { label: "Preferred Debt", subField: "debtPreferred" },
          {
            label: "Liability Type",
            subField: "liabilityType",
            fieldType: "liabilityType",
            size: 2,
          },
        ]}
        rows={rows}
        parent="balanceSheetLiabilities"
        moneyField={true}
        textSize="small"
      />
      <Button
        onClick={() => {
          addRow();
        }}
      >
        + Add another liability
      </Button>
      <div className="sectionBottom">
        <Checkbox
          clientId={props.clientId}
          description="Flag this section for my Trustee"
          parent="balanceSheetLiabilities"
          field="flag"
          data={props.userInfo}
        />
        <Checkbox
          clientId={props.clientId}
          description="I've completed this section"
          parent="balanceSheetLiabilities"
          field="complete"
          data={props.userInfo}
        />
        <NextButton step={props.step} />
      </div>
    </div>
  );
};

export default BalanceSheetLiabilities;
