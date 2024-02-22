import { useState } from "react";
import "./bar.css";

const Bar = (props) => {
  const [hovered, setHovered] = useState(false);

  const barHeight = (props.amount / props.max) * 150;
  const currentMax = props.amount === props.max;

  return (
    <div className="bar-container">
      {hovered ? <div className="amount">{`$${props.amount}`}</div> : null}
      <div
        className={currentMax ? "bar highlight" : "bar"}
        style={{ height: `${barHeight}px` }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      ></div>
      <div className="day-title">{props.day}</div>
    </div>
  );
};

export default Bar;
