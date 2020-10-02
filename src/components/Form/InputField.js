import React, { useState, useEffect } from "react";
import { withFirebase } from "../Firebase";
import Form from "react-bootstrap/Form";
import { formatMoney, formattedMoneyToNumber } from "../../utils/functions";
import * as R from "ramda";

const InputField = (props) => {
  const [value, setValue] = useState("");
  const [totalValue, setTotalValue] = useState(0);

  const data = props.data;
  const field = props.field;
  let uid = props.firebase.auth.currentUser.uid;
  if (props.clientId) {
    uid = props.clientId;
  }
  const doc = props.firebase.user(uid);
  const subField = props.subField;

  let disabled = false;
  if (props.totalField) {
    disabled = true;
    let total = 0;
    if (
      props &&
      props.data &&
      props.data.data &&
      props.parent &&
      props.subField &&
      props.data.data[props.parent]
    ) {
      Object.keys(props.data.data[props.parent]).forEach(function (key, index) {
        if (props.data.data[props.parent][key][props.subField] > 0) {
          total = total + props.data.data[props.parent][key][props.subField];
        }
      });
    }
    if (total > 0 && formatMoney(total) !== value) {
      setValue(formatMoney(total));
    } else {
    }
  }

  useEffect(() => {
    updateFromFirebase();
  }, [props]);

  // look for parent object

  const updateFromFirebase = () => {
    const getOrphan = R.path(["data", field]);
    const getChild = R.path(["data", props.parent, field]);
    const getMiddleAge = R.path(["data", props.parent, field, subField]);
    const getParent = R.path(["data", field, subField]);

    let fieldValue = "";
    let dataValue = "";

    if (props.parent) {
      if (subField) {
        if (props.moneyField) {
          fieldValue = formattedMoneyToNumber(value);
          dataValue = getMiddleAge(data);
          if (fieldValue != dataValue && dataValue) {
            setValue(formatMoney(getMiddleAge(data)));
          }
        } else {
          fieldValue = value;
          dataValue = getMiddleAge(data);
          if (fieldValue != dataValue && dataValue) {
            setValue(getMiddleAge(data));
          }
        }
      } else {
        if (props.moneyField) {
          fieldValue = formattedMoneyToNumber(value);
          dataValue = getChild(data);
          if (fieldValue != dataValue && dataValue) {
            setValue(formatMoney(getChild(data)));
          }
        } else {
          fieldValue = value;
          dataValue = getChild(data);
          if (fieldValue != dataValue && dataValue) {
            setValue(getChild(data));
          }
        }
      }
    } else {
      if (subField) {
        if (props.moneyField) {
          fieldValue = formattedMoneyToNumber(value);
          dataValue = getParent(data);
          if (fieldValue != dataValue && dataValue) {
            setValue(formatMoney(getParent(data)));
          }
        } else {
          fieldValue = value;
          dataValue = getParent(data);
          if (fieldValue != dataValue && dataValue) {
            setValue(getParent(data));
          }
        }
      } else {
        if (props.moneyField) {
          fieldValue = formattedMoneyToNumber(value);
          dataValue = getOrphan(data);
          if (fieldValue != dataValue && dataValue) {
            setValue(formatMoney(getOrphan(data)));
          }
        } else {
          fieldValue = value;
          dataValue = getOrphan(data);
          if (fieldValue != dataValue && dataValue) {
            setValue(getOrphan(data));
          }
        }
      }
    }
  };

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  const handleOnBlur = (event) => {
    let cleanedValue = event.target.value;
    if (props.moneyField) {
      setValue(formatMoney(event.target.value));
      cleanedValue = formatMoney(event.target.value);
      cleanedValue = formattedMoneyToNumber(cleanedValue);
    }
    let updatedData = {};

    if (props.parent) {
      updatedData[props.parent] = {};
      if (subField) {
        updatedData[props.parent][field] = {};
        updatedData[props.parent][field][subField] = cleanedValue;
      } else {
        updatedData[props.parent][field] = cleanedValue;
      }
    } else {
      updatedData[field] = cleanedValue;
    }

    doc.set(
      {
        data: updatedData,
      },
      { merge: true }
    );
  };

  let placeholder = "";
  if (props.moneyField) {
    placeholder = "$0";
  } else if (props.placeholder) {
    placeholder = props.placeholder;
  }

  let inputFieldJSX = (
    <Form.Control
      size="lg"
      type="text"
      placeholder={placeholder}
      onBlur={(e) => {
        handleOnBlur(e);
      }}
      onChange={(e) => {
        handleOnChange(e);
      }}
      value={value}
      disabled={disabled}
    />
  );

  if (props.fieldType === "textarea") {
    inputFieldJSX = (
      <Form.Control
        size="lg"
        type="text"
        as="textarea"
        placeholder=""
        onBlur={(e) => {
          handleOnBlur(e);
        }}
        onChange={(e) => {
          handleOnChange(e);
        }}
        value={value}
        disabled={disabled}
      />
    );
  }

  return (
    <div className="textInput">
      {props.label && (
        <Form.Label>
          {props.label}
          {props.modal}
        </Form.Label>
      )}
      {props.description && (
        <Form.Text className="text-muted">{props.description}</Form.Text>
      )}
      {inputFieldJSX}
    </div>
  );
};

export default withFirebase(InputField);
