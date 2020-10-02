import React, { useState } from "react";
import Checkbox from "../Form/Checkbox";
import NextButton from "../Form/NextButton";

const Consent = (props) => {
  return (
    <div className="stepContainer">
      <div className="filingTitle">Consent Information</div>
      <div className="filingDescription">
        By selecting "I consent" below, I confirm that I am at least 18 years of
        age and consent to researchers at the University of Virginia and York
        University filing for bankruptcy on my behalf. [consent form
        placeholder]
      </div>
      <Checkbox
        clientId={props.clientId}
        description="I consent."
        parent="consent"
        field="consent"
        data={props.userInfo}
      />
      <Checkbox
        clientId={props.clientId}
        description="I am 18 years of age or older."
        parent="consent"
        field="over18"
        data={props.userInfo}
      />
      <div className="sectionBottom">
        <NextButton step={props.step} />
      </div>
    </div>
  );
};

export default Consent;
