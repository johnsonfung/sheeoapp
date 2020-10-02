import React, { useState } from "react";
import Checkbox from "../Form/Checkbox";
import InputField from "../Form/InputField";
import Dropdown from "../Form/Dropdown";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import ProgressBarContainer from "./ProgressBarContainer";
import { monthlyNonDExpenses } from "../../utils/contentConfig";
import TableForm from "../Form/TableForm";
import NextButton from "../Form/NextButton";

const MonthlyNonDExpenses = (props) => {
  return (
    <div className="stepContainer">
      <div className="filingTitle">
        Section 4: Monthly Non-Discretionary Expenses
      </div>
      <div className="filingDescription">
        Estimated completion time: 40 min.
      </div>
      <ProgressBarContainer
        dataNeeded={monthlyNonDExpenses.dataNeeded}
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
            label: "Child support payments",
            field: "childSupportPayments",
          },
          {
            label: "Spousal support payments",
            field: "spousalSupportPayments",
          },
          {
            label: "Child care",
            field: "childCare",
          },
          {
            label: "Fines/penalties imposed by the Court",
            field: "courtFines",
          },
          {
            label: "Expenses as a condition of employment",
            field: "expensesEmployment",
          },
          {
            label: "Debts where stay has been lifted",
            field: "stayLiftedDebts",
          },
          {
            label: "Other expenses",
            description: "Provide details below",
            field: "otherExpenses",
            primerField: true,
            primerMoney: false,
          },
        ]}
        parent="monthlyNonDExpenses"
        moneyField={true}
      />
      <div className="sectionBottom">
        <Checkbox
          clientId={props.clientId}
          description="Flag this section for my Trustee"
          parent="monthlyNonDExpenses"
          field="flag"
          data={props.userInfo}
        />
        <Checkbox
          clientId={props.clientId}
          description="I've completed this section"
          parent="monthlyNonDExpenses"
          field="complete"
          data={props.userInfo}
        />
        <NextButton step={props.step} />
      </div>
    </div>
  );
};

export default MonthlyNonDExpenses;
