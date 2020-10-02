import React, { useEffect, useState } from "react";
import useScript from "../../hooks/useScript";
import { Link } from "react-router-dom";
import { withAuthorization } from "../Session";

const Events = (props) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    let uid = props.firebase.auth.currentUser.uid;
    const doc = props.firebase.user(uid);

    const observer = doc.onSnapshot(
      (docSnapshot) => {
        //console.log(`Received doc snapshot: ${docSnapshot}`);
        // ...
        setUserInfo(docSnapshot.data());
      },
      (err) => {
        console.error(`Encountered error: ${err}`);
        props.history.push("/access-denied");
      }
    );
  }, []);

  useEffect(() => {
    console.log(userInfo);
  });

  console.log(props.match.params.formId);

  let formId = "";

  if (props && props.match && props.match.params && props.match.params.formId) {
    formId = props.match.params.formId;
  }

  return (
    <div>
      <h1>Events</h1>
      {formId && (
        <div
          id="formkeep-embed"
          data-formkeep-url={"https://formkeep.com/p/" + formId + "?embedded=1"}
        ></div>
      )}
      {useScript("https://pym.nprapps.org/pym.v1.min.js")}
      {useScript(
        "https://formkeep-production-herokuapp-com.global.ssl.fastly.net/formkeep-embed.js",
        true,
        userInfo
      )}
      {!formId && (
        <div>
          <Link to="928f4fa5ec774d1322664a4ef1be1ecd">Winter Gala Event</Link>
        </div>
      )}
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Events);
