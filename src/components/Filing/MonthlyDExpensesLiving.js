import React, { useState } from "react";
import Checkbox from "../Form/Checkbox";
import InputField from "../Form/InputField";
import Dropdown from "../Form/Dropdown";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import ProgressBarContainer from "./ProgressBarContainer";
import { monthlyDExpensesLiving } from "../../utils/contentConfig";
import TableForm from "../Form/TableForm";
import NextButton from "../Form/NextButton";

const MonthlyDExpensesLiving = (props) => {
  return (
    <div className="stepContainer">
      <div className="filingTitle">
        Section 7: Monthly Discretionary Expenses (Family Unit) - Living
      </div>
      <div className="filingDescription">
        Please enter the following questions as the total household amount for
        the family unit. Family unit is defined as married couples with or
        without children, unmarried couples in a common law relationship with or
        without children as well as lone or single parents with children.
        Estimated completion time: 40 min.
      </div>
      <ProgressBarContainer
        dataNeeded={monthlyDExpensesLiving.dataNeeded}
        data={props.userInfo.data}
      />
      <TableForm
        clientId={props.clientId}
        userInfo={props.userInfo}
        columns={[{ label: "Family Unit", subField: "family" }]}
        rows={[
          {
            label: "Food/Groceries",
            field: "groceries",
          },
          {
            label: "Laundry/dry cleaning",
            field: "laundry",
          },
          {
            label: "Grooming/toiletries",
            field: "grooming",
          },
          {
            label: "Clothing",
            field: "clothing",
          },
          {
            label: "Other",
            field: "other",
          },
          {
            label: "Total",
            field: "total",
            totalField: true,
          },
        ]}
        parent="monthlyDExpensesLiving"
        moneyField={true}
      />
      <div className="sectionBottom">
        <Checkbox
          clientId={props.clientId}
          description="Flag this section for my Trustee"
          parent="monthlyDExpensesLiving"
          field="flag"
          data={props.userInfo}
        />
        <Checkbox
          clientId={props.clientId}
          description="I've completed this section"
          parent="monthlyDExpensesLiving"
          field="complete"
          data={props.userInfo}
        />
        <NextButton step={props.step} />
      </div>
    </div>
  );
};

export default MonthlyDExpensesLiving;
