import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import QuestionMark from "./questionMark.svg";
import ModalContainer from "./ModalContainer";

const ContentModalLegalName = (props) => {
  return (
    <ModalContainer
      title="Legal Name"
      body={
        <p>
          Please use your legal name as displayed on official identification
          such as a driver's license, birth certificate, or passport.
        </p>
      }
    />
  );
};

export default ContentModalLegalName;
