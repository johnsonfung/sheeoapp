import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import Form from "react-bootstrap/Form";

const Checkbox = (props) => {
  const [value, setValue] = useState(false);

  const data = props.data;
  const field = props.field;
  const subField = props.subField;
  let uid = props.firebase.auth.currentUser.uid;
  if (props.clientId) {
    uid = props.clientId;
  }
  const doc = props.firebase.user(uid);

  // look for parent object
  if (props.parent) {
    if (data.data) {
      if (data.data[props.parent]) {
        if (subField) {
          if (data.data[props.parent][field]) {
            if (value !== data.data[props.parent][field][subField]) {
              setValue(data.data[props.parent][field][subField]);
            }
          }
        } else {
          if (value !== data.data[props.parent][field]) {
            setValue(data.data[props.parent][field]);
          }
        }
      }
    }
  } else {
    if (data.data) {
      if (subField) {
        if (data.data[field]) {
          if (value !== data.data[field][subField]) {
            setValue(data.data[field][subField]);
          }
        }
      } else {
        if (value !== data.data[field]) {
          setValue(data.data[field]);
        }
      }
    }
  }

  const handleOnChange = (event) => {
    setValue(event.target.checked);
    let updatedData = {};

    if (props.parent) {
      updatedData[props.parent] = {};
      if (subField) {
        updatedData[props.parent][field] = {};
        updatedData[props.parent][field][subField] = event.target.checked;
      } else {
        updatedData[props.parent][field] = event.target.checked;
      }
    } else {
      if (subField) {
        updatedData[field] = {};
        updatedData[field][subField] = event.target.checked;
      } else {
        updatedData[field] = event.target.checked;
      }
    }

    doc.set(
      {
        data: updatedData,
      },
      { merge: true }
    );
  };

  return (
    <div className="checkbox">
      {props.label && (
        <Form.Label>
          {props.label}
          {props.modal}
        </Form.Label>
      )}
      <input
        onChange={(e) => {
          handleOnChange(e);
        }}
        type="checkbox"
        name={props.field + "-checkbox"}
        id={props.field + "-checkbox"}
        checked={value}
      />
      <label htmlFor={props.field + "-checkbox"}>
        <div className="checkboxIcon"></div>
        {props.description}
      </label>
    </div>
  );
};

export default withFirebase(Checkbox);
