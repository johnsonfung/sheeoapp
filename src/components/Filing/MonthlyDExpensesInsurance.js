import React, { useState } from "react";
import Checkbox from "../Form/Checkbox";
import InputField from "../Form/InputField";
import Dropdown from "../Form/Dropdown";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import ProgressBarContainer from "./ProgressBarContainer";
import { monthlyDExpensesInsurance } from "../../utils/contentConfig";
import TableForm from "../Form/TableForm";
import NextButton from "../Form/NextButton";

const MonthlyDExpensesInsurance = (props) => {
  return (
    <div className="stepContainer">
      <div className="filingTitle">
        Section 9: Monthly Discretionary Expenses (Family Unit) - Insurance
      </div>
      <div className="filingDescription">
        Please enter the following questions as the total household amount for
        the family unit. Family unit is defined as married couples with or
        without children, unmarried couples in a common law relationship with or
        without children as well as lone or single parents with children.
        Estimated completion time: 40 min.
      </div>
      <ProgressBarContainer
        dataNeeded={monthlyDExpensesInsurance.dataNeeded}
        data={props.userInfo.data}
      />
      <TableForm
        clientId={props.clientId}
        userInfo={props.userInfo}
        columns={[{ label: "Family Unit", subField: "family" }]}
        rows={[
          {
            label: "Vehicle",
            field: "vehicle",
          },
          {
            label: "House",
            field: "house",
          },
          {
            label: "Furniture/contents",
            field: "furniture",
          },
          {
            label: "Life insurance",
            field: "life",
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
        parent="monthlyDExpensesInsurance"
        moneyField={true}
      />
      <div className="sectionBottom">
        <Checkbox
          clientId={props.clientId}
          description="Flag this section for my Trustee"
          parent="monthlyDExpensesInsurance"
          field="flag"
          data={props.userInfo}
        />
        <Checkbox
          clientId={props.clientId}
          description="I've completed this section"
          parent="monthlyDExpensesInsurance"
          field="complete"
          data={props.userInfo}
        />
        <NextButton step={props.step} />
      </div>
    </div>
  );
};

export default MonthlyDExpensesInsurance;
