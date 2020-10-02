import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import QuestionMark from "./questionMark.svg";
import ModalContainer from "./ModalContainer";

const ContentModalProvince = (props) => {
  return (
    <ModalContainer
      title="Province"
      body={<p>This is the province in which you claim taxes.</p>}
    />
  );
};

export default ContentModalProvince;
