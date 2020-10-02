import React, { useState } from "react";
import Checkbox from "../Form/Checkbox";
import InputField from "../Form/InputField";
import Dropdown from "../Form/Dropdown";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import ProgressBarContainer from "./ProgressBarContainer";
import { monthlyDExpensesMedical } from "../../utils/contentConfig";
import TableForm from "../Form/TableForm";
import NextButton from "../Form/NextButton";

const MonthlyDExpensesMedical = (props) => {
  return (
    <div className="stepContainer">
      <div className="filingTitle">
        Section 11: Monthly Discretionary Expenses (Family Unit) -
        Non-recoverable medical expenses
      </div>
      <div className="filingDescription">
        Please enter the following questions as the total household amount for
        the family unit. Family unit is defined as married couples with or
        without children, unmarried couples in a common law relationship with or
        without children as well as lone or single parents with children.
        Estimated completion time: 40 min.
      </div>
      <ProgressBarContainer
        dataNeeded={monthlyDExpensesMedical.dataNeeded}
        data={props.userInfo.data}
      />
      <TableForm
        clientId={props.clientId}
        userInfo={props.userInfo}
        columns={[{ label: "Family Unit", subField: "family" }]}
        rows={[
          {
            label: "Prescriptions",
            field: "prescriptions",
          },
          {
            label: "Dental",
            field: "dental",
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
        parent="monthlyDExpensesMedical"
        moneyField={true}
      />
      <div className="sectionBottom">
        <Checkbox
          clientId={props.clientId}
          description="Flag this section for my Trustee"
          parent="monthlyDExpensesMedical"
          field="flag"
          data={props.userInfo}
        />
        <Checkbox
          clientId={props.clientId}
          description="I've completed this section"
          parent="monthlyDExpensesMedical"
          field="complete"
          data={props.userInfo}
        />
        <NextButton step={props.step} />
      </div>
    </div>
  );
};

export default MonthlyDExpensesMedical;
