import React, { useState, useEffect } from "react";
import { Row, Col, Container, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { checkProgress } from "../../utils/functions";

const ProgressBarContainer = (props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(checkProgress(props.dataNeeded, props.data));
  });

  return (
    <ProgressBar
      animated
      className="progressBar"
      striped
      variant="success"
      now={progress}
      label={`${progress}%`}
    />
  );
};

export default ProgressBarContainer;
