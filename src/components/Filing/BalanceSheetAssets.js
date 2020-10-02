import React, { useState } from "react";
import Checkbox from "../Form/Checkbox";
import InputField from "../Form/InputField";
import Dropdown from "../Form/Dropdown";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import ProgressBarContainer from "./ProgressBarContainer";
import { balanceSheetAssets } from "../../utils/contentConfig";
import TableForm from "../Form/TableForm";
import NextButton from "../Form/NextButton";

const BalanceSheetAssets = (props) => {
  return (
    <div className="stepContainer">
      <div className="filingTitle">Section 12: Balance Sheet - Assets</div>
      <div className="filingDescription">
        Please enter an amount for the following assets that apply to you
      </div>
      <ProgressBarContainer
        dataNeeded={balanceSheetAssets.dataNeeded}
        data={props.userInfo.data}
      />
      <TableForm
        clientId={props.clientId}
        userInfo={props.userInfo}
        columns={[
          {
            label: "Description",
            subField: "description",
            fieldType: "textarea",
          },
          { label: "Estimate dollar value", subField: "estValue" },
          {
            label: "Exempt property",
            subField: "exempt",
            fieldType: "checkbox",
          },
          { label: "Secured amount/liens", subField: "securedAmount" },
          {
            label: "Est. net realizable dollar value",
            subField: "estNetValue",
          },
        ]}
        rows={[
          {
            label: "Cash on hand",
            field: "cash",
          },
          {
            label: "Furniture",
            field: "furniture",
          },
          {
            label:
              "Cash-surrender value of life insurance policies, RRSPs, etc.",
            field: "cashSurrender",
          },
          {
            label: "Securities",
            field: "securities",
          },
          {
            label: "House",
            field: "house",
          },
          {
            label: "Cottage",
            field: "cottage",
          },
          {
            label: "Land",
            field: "land",
          },
          {
            label: "Automobile",
            field: "automobile",
          },
          {
            label: "Motorcycle",
            field: "motorcycle",
          },
          {
            label: "Snowmobile",
            field: "snowmobile",
          },
          {
            label: "Other vehicle",
            field: "otherVehicle",
          },
          {
            label: "Recreational equipment",
            field: "recEquipment",
          },
          {
            label: "Tax refund",
            field: "taxRefund",
          },
          {
            label: "Other",
            field: "other",
          },
        ]}
        parent="balanceSheetAssets"
        moneyField={true}
      />
      <div className="sectionBottom">
        <Checkbox
          clientId={props.clientId}
          description="Flag this section for my Trustee"
          parent="balanceSheetAssets"
          field="flag"
          data={props.userInfo}
        />
        <Checkbox
          clientId={props.clientId}
          description="I've completed this section"
          parent="balanceSheetAssets"
          field="complete"
          data={props.userInfo}
        />
        <NextButton step={props.step} />
      </div>
    </div>
  );
};

export default BalanceSheetAssets;
