import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import InputField from "./InputField";
import { withFirebase } from "../Firebase";
import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";

const TableForm = (props) => {
  let rows = props.rows;
  let columns = props.columns;

  let firstColumnSize = 3;
  if (props.firstColumnSize) {
    firstColumnSize = props.firstColumnSize;
  } else if (props.firstColumnSize === "equal") {
    firstColumnSize = "";
  }

  let rowsJSX = rows.map((item, index) => {
    let columnsJSX = columns.map((column, index2) => {
      if (column.fieldType === "checkbox") {
        return (
          <Col key={index2}>
            <Checkbox
              description="Yes"
              parent={props.parent}
              field={item.field}
              subField={column.subField}
              data={props.userInfo}
              clientId={props.clientId}
            />
          </Col>
        );
      } else if (column.fieldType === "textarea") {
        return (
          <Col xl={column.size} key={index2}>
            <InputField
              label=""
              description=""
              parent={props.parent}
              field={item.field}
              subField={column.subField}
              data={props.userInfo}
              fieldType={column.fieldType}
              moneyField={false}
              totalField={false}
              clientId={props.clientId}
            />
          </Col>
        );
      } else if (column.fieldType === "province") {
        return (
          <Col key={index2} xs={column.size}>
            <Dropdown
              label=""
              parent={props.parent}
              field={item.field}
              subField={column.subField}
              description=""
              data={props.userInfo}
              textSize="small"
              options={[
                { label: "AB", value: "AB" },
                { label: "BC", value: "BC" },
                { label: "MB", value: "MB" },
                { label: "NL", value: "NL" },
                { label: "NT", value: "NT" },
                { label: "NS", value: "NS" },
                { label: "NU", value: "NU" },
                { label: "ON", value: "ON" },
                { label: "PEI", value: "PEI" },
                { label: "QC", value: "QC" },
                { label: "SK", value: "SK" },
                { label: "YT", value: "YT" },
              ]}
              clientId={props.clientId}
            />
          </Col>
        );
      } else if (column.fieldType === "liabilityType") {
        return (
          <Col key={index2} xs={column.size}>
            <Dropdown
              label=""
              parent={props.parent}
              field={item.field}
              subField={column.subField}
              description=""
              data={props.userInfo}
              textSize="small"
              options={[
                {
                  label: "Real property or immovable mortgage or hypothec",
                  value: "property",
                },
                {
                  label: "Bank loans (except real property mortgage)",
                  value: "bankLoans",
                },
                { label: "Finance company loans", value: "financeCoLoans" },
                {
                  label: "Credit cards - bank/trust company issuers",
                  value: "ccBank",
                },
                { label: "Credit cards - other issuers", value: "ccOther" },
                {
                  label: "Taxes - Federal/Provincial/Municipal",
                  value: "taxes",
                },
                { label: "Student loans", value: "studentLoans" },
                { label: "Loans from individuals", value: "individualLoans" },
                { label: "Other", value: "other" },
              ]}
              clientId={props.clientId}
            />
          </Col>
        );
      } else if (column.fieldType === "businessType") {
        return (
          <Col key={index2} xs={column.size}>
            <Dropdown
              label=""
              parent={props.parent}
              field={item.field}
              subField={column.subField}
              description=""
              data={props.userInfo}
              options={[
                {
                  label: "Sole Proprietorship",
                  value: "soleProprietorship",
                },
                {
                  label: "General Partnership",
                  value: "genPartnership",
                },
                { label: "Limited Partnership", value: "limitedPartnership" },
                {
                  label: "Private Corporation",
                  value: "privateCorp",
                },
                { label: "Public Corporation", value: "publicCorp" },
                {
                  label: "Cooperative",
                  value: "coop",
                },
              ]}
              clientId={props.clientId}
            />
          </Col>
        );
      } else if (column.fieldType === "text") {
        return (
          <Col key={index2} xs={column.size}>
            <InputField
              label=""
              description={column.description}
              placeholder={column.placeholder}
              parent={props.parent}
              field={item.field}
              subField={column.subField}
              data={props.userInfo}
              fieldType={column.fieldType}
              moneyField={false}
              totalField={false}
              clientId={props.clientId}
            />
          </Col>
        );
      } else {
        return (
          <Col key={index2}>
            <InputField
              label=""
              description=""
              parent={props.parent}
              field={item.field}
              subField={column.subField}
              data={props.userInfo}
              fieldType={column.fieldType}
              moneyField={props.moneyField}
              totalField={item.totalField}
              clientId={props.clientId}
            />
          </Col>
        );
      }
    });
    return (
      <Row key={index} className="tableRow">
        <Col xs={firstColumnSize}>
          <div className="label">
            {item.label}
            {item.modal}
          </div>
          {item.description && (
            <React.Fragment>
              <br />
              <span className="text-muted">{item.description}</span>
            </React.Fragment>
          )}
          {item.primerField && (
            <InputField
              label=""
              description=""
              parent={props.parent}
              field={item.field}
              subField="main"
              data={props.userInfo}
              moneyField={item.primerMoney}
              clientId={props.clientId}
            />
          )}
        </Col>
        {columnsJSX}
      </Row>
    );
  });

  let columnLabels = columns.map((column, index) => {
    if (column.size) {
      return (
        <Col
          xl={column.size}
          lg={column.size}
          md={column.size}
          sm={column.size}
          xs={column.size}
          key={index}
        >
          {column.label}
        </Col>
      );
    } else {
      return <Col key={index}>{column.label}</Col>;
    }
  });

  let firstRow = (
    <Row className="firstRow">
      <Col xs={firstColumnSize}></Col>
      {columnLabels}
    </Row>
  );

  let textSize;
  if (props.textSize) {
    textSize = props.textSize;
  }
  return (
    <div className="tableForm">
      <div className={textSize}>
        {firstRow}
        {rowsJSX}
      </div>
    </div>
  );
};

export default withFirebase(TableForm);
