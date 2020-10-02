import React from "react";
import mailIcon from "./mailIcon.svg";

const CheckEmail = () => (
  <div className="signup">
    <img className="icon" src={mailIcon} />
    <h1>We sent you a link</h1>
    <div className="description">
      We've sent a secure link to your inbox that'll allow you to access your
      account.
      <br />
      <br />
      Please click the link in your inbox.
    </div>
  </div>
);

export default CheckEmail;
