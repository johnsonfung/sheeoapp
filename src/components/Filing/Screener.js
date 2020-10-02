import React, { useState, useEffect } from "react";
import Checkbox from "../Form/Checkbox";
import InputField from "../Form/InputField";
import Dropdown from "../Form/Dropdown";
import Form from "react-bootstrap/Form";
import { Row, Col, Button, Modal } from "react-bootstrap";
import ProgressBarContainer from "./ProgressBarContainer";
import { screener } from "../../utils/contentConfig";
import TableForm from "../Form/TableForm";
import NextButton from "../Form/NextButton";
import * as tools from "../../utils/functions";
import ContentModalEmploymentIncome from "../Modals/ContentModalEmploymentIncome";

const Screener = (props) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [surplusIncome, setSurplusIncome] = useState(0);
  const [qualify, setQualify] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let incomeSum = 0;
    let expensesSum = 0;
    if (props.userInfo && props.userInfo.data && props.userInfo.data.screener) {
      // sum income
      const screenerData = props.userInfo.data.screener;
      const incomeFields = [
        "incomeEmployment",
        "incomeGST",
        "incomeSpousal",
        "incomePension",
        "incomeChildSupport",
        "incomeAlimony",
      ];
      const expensesFields = [
        "expensesChildSupport",
        "expensesAlimony",
        "expensesChildcare",
      ];
      incomeFields.forEach((item, index) => {
        if (screenerData[item] && screenerData[item].income > 0) {
          incomeSum += screenerData[item].income;
        }
      });
      expensesFields.forEach((item, index) => {
        if (screenerData[item] && screenerData[item].expenses > 0) {
          expensesSum += screenerData[item].expenses;
        }
      });
      let surplusIncome = incomeSum - expensesSum;
      if (props.userInfo.data.householdOccupation) {
        let personsInHousehold =
          props.userInfo.data.householdOccupation.personsInHousehold;
        if (!personsInHousehold) {
          personsInHousehold = 1;
        }
        let qualifyValue = tools.surplusIncomeEligible(
          surplusIncome,
          personsInHousehold
        );
        setQualify(qualifyValue);
      } else {
        alert(
          "Error: Please fill in Household and Occpation info before proceeding"
        );
      }
      setTotalIncome(incomeSum);
      setTotalExpenses(expensesSum);
      setSurplusIncome(surplusIncome);
    }
  });

  let modalHeader = "";
  let modalDescription = "";
  let modalCTA = "";
  if (qualify) {
    modalHeader = "Great news! You're eligible for our services.";
    modalDescription = (
      <div>
        <Row>
          <Col>
            <div className="prePrice">Cost to file:</div>
            <div className="price">$1599</div>
          </Col>
          <Col>
            <div className="priceDescription">
              We can file your bankrupcy documents for you. To proceed, click
              the button below to <strong>set up an appointment.</strong>
            </div>
          </Col>
        </Row>
      </div>
    );
    modalCTA = (
      <Button variant="primary" onClick={handleClose}>
        Set up an appointment
      </Button>
    );
  } else {
    modalHeader = "Hmm, we'll need more information to see if you're eligible.";
    modalDescription = (
      <div>
        <Row>
          <Col>
            <div className="priceDescription">
              We'll need to ask you some more questions. To proceed, click the
              button below to <strong>set up an appointment.</strong>
            </div>
          </Col>
        </Row>
      </div>
    );
    modalCTA = (
      <Button variant="primary" onClick={handleClose}>
        Set up an appointment
      </Button>
    );
  }

  return (
    <div className="stepContainer">
      <div className="filingTitle">Eligibility Screener</div>
      <div className="filingDescription">
        In order to see if you're eligible for our services, please enter below
        all numbers that are applicable to you:
      </div>
      <hr></hr>
      <h2>Do you have any of the following sources of income?</h2>
      <TableForm
        clientId={props.clientId}
        userInfo={props.userInfo}
        columns={[{ label: "Monthly Income", subField: "income" }]}
        rows={[
          {
            label: "Employment income",
            field: "incomeEmployment",
            modal: <ContentModalEmploymentIncome />,
          },
          {
            label: "GST refund",
            field: "incomeGST",
          },
          {
            label: "Spousal income",
            field: "incomeSpousal",
          },
          {
            label: "Pension income",
            field: "incomePension",
          },
          {
            label: "Child support",
            field: "incomeChildSupport",
          },
          {
            label: "Alimony",
            field: "incomeAlimony",
          },

          {
            label: "Total",
            field: "total",
            totalField: true,
          },
        ]}
        parent="screener"
        moneyField={true}
      />
      <hr></hr>
      <h2>Do you have any of the following expenses?</h2>
      <TableForm
        clientId={props.clientId}
        userInfo={props.userInfo}
        columns={[{ label: "Monthly Expenses", subField: "expenses" }]}
        rows={[
          {
            label: "Child support payments",
            field: "expensesChildSupport",
          },
          {
            label: "Alimony payments",
            field: "expensesAlimony",
          },
          {
            label: "Childcare",
            field: "expensesChildcare",
          },
          {
            label: "Total",
            field: "total",
            totalField: true,
          },
        ]}
        parent="screener"
        moneyField={true}
      />
      <div className="sectionBottom">
        <Button size="lg" block variant="primary" onClick={handleShow}>
          Check Eligibility
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalHeader}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalDescription}</Modal.Body>
          <Modal.Footer>{modalCTA}</Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Screener;
