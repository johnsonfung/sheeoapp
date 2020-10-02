import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import QuestionMark from "./questionMark.svg";
import ModalContainer from "./ModalContainer";

const ContentModalEmploymentIncome = (props) => {
  return (
    <ModalContainer
      title="Employment Income"
      body={
        <p>
          This includes all income you would get from a job, contract, or gig
          work.
        </p>
      }
    />
  );
};

export default ContentModalEmploymentIncome;
