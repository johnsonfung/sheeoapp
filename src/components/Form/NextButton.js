import React, { useState } from "react";
import { stepOrder } from "../../utils/contentConfig";
import { findWithAttr } from "../../utils/functions";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

const NextButton = (props) => {
  const history = useHistory();
  let text = "Next Section";

  let route;
  let preRoute;

  let currentIndex;
  if (stepOrder && props.step) {
    currentIndex = findWithAttr(stepOrder, "slug", props.step);
  }
  if (currentIndex !== -1) {
    if (currentIndex + 1 < stepOrder.length) {
      route = stepOrder[currentIndex + 1].slug;
    } else {
      route = "completeFiling";
      text = "Complete Filing";
    }
    if (currentIndex - 1 > -1) {
      preRoute = stepOrder[currentIndex - 1].slug;
    }
  }

  const goToNext = () => {
    history.push(route);
  };

  const goToPrev = () => {
    history.push(preRoute);
  };

  return (
    <React.Fragment>
      <div
        className="nextButton"
        onClick={() => {
          goToNext();
        }}
      >
        <Button variant="success">{text}</Button>
      </div>
      {preRoute && (
        <div
          className="prevButton"
          onClick={() => {
            goToPrev();
          }}
        >
          <Button variant="light">Previous</Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default NextButton;
