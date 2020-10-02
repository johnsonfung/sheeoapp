import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import Form from "react-bootstrap/Form";

const Dropdown = (props) => {
  const [value, setValue] = useState(false);

  const data = props.data;
  const field = props.field;
  let uid = props.firebase.auth.currentUser.uid;
  if (props.clientId) {
    uid = props.clientId;
  }
  const doc = props.firebase.user(uid);

  // look for parent object
  if (props.parent) {
    if (data.data) {
      if (data.data[props.parent]) {
        if (props.subField) {
          if (data.data[props.parent][field]) {
            if (value != data.data[props.parent][field][props.subField]) {
              setValue(data.data[props.parent][field][props.subField]);
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
      if (props.subField) {
        if (data.data[field]) {
          if (value !== data.data[field][props.subField]) {
            setValue(data.data[field][props.subField]);
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
    setValue(event.target.value);
    let updatedData = {};

    if (props.parent) {
      updatedData[props.parent] = {};
      if (props.subField) {
        updatedData[props.parent][field] = {};
        updatedData[props.parent][field][props.subField] = event.target.value;
      } else {
        updatedData[props.parent][field] = event.target.value;
      }
    } else {
      if (props.subField) {
        updatedData[field] = {};
        updatedData[field][props.subField] = event.target.value;
      } else {
        updatedData[field] = event.target.value;
      }
    }

    doc.set(
      {
        data: updatedData,
      },
      { merge: true }
    );
  };

  let options = props.options.map((option) => {
    return <option value={option.value}>{option.label}</option>;
  });

  let textSize = "";
  if (props.textSize) {
    textSize = " " + props.textSize;
  }

  return (
    <div className={"dropdown" + textSize}>
      {props.label && (
        <Form.Label>
          {props.label}
          {props.modal}
        </Form.Label>
      )}
      <Form.Text className="text-muted">{props.description}</Form.Text>
      <Form.Control
        as="select"
        defaultValue="Choose..."
        onChange={(e) => {
          handleOnChange(e);
        }}
        value={value}
      >
        <optgroup>
          <option value="">Choose...</option>
          {options}
        </optgroup>
      </Form.Control>
    </div>
  );
};

export default withFirebase(Dropdown);
