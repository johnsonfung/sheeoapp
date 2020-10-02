import React, { useState } from "react";
import Checkbox from "../Form/Checkbox";
import InputField from "../Form/InputField";
import Dropdown from "../Form/Dropdown";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import ProgressBarContainer from "./ProgressBarContainer";
import { monthlyIncome } from "../../utils/contentConfig";
import TableForm from "../Form/TableForm";
import NextButton from "../Form/NextButton";

const MonthlyIncome = (props) => {
  return (
    <div className="stepContainer">
      <div className="filingTitle">
        Section 3: Monthly Non-Discretionary Income and Expenses
      </div>
      <div className="filingDescription">
        Estimated completion time: 40 min.
      </div>
      <ProgressBarContainer
        dataNeeded={monthlyIncome.dataNeeded}
        data={props.userInfo.data}
      />
      <TableForm
        clientId={props.clientId}
        userInfo={props.userInfo}
        columns={[
          { label: "Bankrupt/Debtor", subField: "debtor" },
          {
            label: "Other members of the family unit",
            subField: "otherFamily",
          },
        ]}
        rows={[
          {
            label: "Net employment income",
            field: "netEmploymentIncome",
          },
          {
            label: "Net pension/annuities",
            field: "netPensionAnnuities",
          },
          {
            label: "Net child support",
            field: "netChildSupport",
          },
          {
            label: "Net spousal support",
            field: "netSpousalSupport",
          },
          {
            label: "Net employment insurance benefits",
            field: "netEI",
          },
          {
            label: "Net social assistance",
            field: "netSocial",
          },
          {
            label: "Self-employment income",
            description:
              "Enter your total gross amount below and net amounts in the table",
            field: "selfEmploymentIncome",
            primerField: true,
            primerMoney: true,
          },
          {
            label: "Other net income",
            description: "Provide details below",
            field: "otherNetIncome",
            primerField: true,
            primerMoney: false,
          },
        ]}
        parent="monthlyIncome"
        moneyField={true}
      />
      <div className="sectionBottom">
        <Checkbox
          clientId={props.clientId}
          description="Flag this section for my Trustee"
          parent="monthlyIncome"
          field="flag"
          data={props.userInfo}
        />
        <Checkbox
          clientId={props.clientId}
          description="I've completed this section"
          parent="monthlyIncome"
          field="complete"
          data={props.userInfo}
        />
        <NextButton step={props.step} />
      </div>
    </div>
  );
};

export default MonthlyIncome;
