import React, { useState, useEffect } from "react";

const RegionButton = (props) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    console.log(props.selected);
    if (props.selected === props.region) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [props]);
  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);
  let buttonClass = "regionButton";
  if (selected) {
    buttonClass = "regionButton active";
  }
  return (
    <div
      onClick={() => {
        props.click(props.region);
      }}
      className={buttonClass}
    >
      {props.label}
    </div>
  );
};

export default RegionButton;
