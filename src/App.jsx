import { useState, useEffect } from "react";
import "./App.css";

import LogoImg from "./assets/images/logo.svg";
import Bar from "./components/bar";

function App() {
  const [weekData, setWeekData] = useState(undefined);
  const [barGraphData, setBarGraphData] = useState("loading");

  // load json data
  useEffect(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => setWeekData(data));
  }, []);

  const createBarGraph = (weekData) => {
    if (weekData === undefined) {
      return;
    }

    const n = weekData.length;
    let max = 0;

    // find out maximum
    for (const day of weekData) {
      max = Math.max(max, day.amount);
    }

    // create bar components
    const arr = Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = (
        <Bar
          key={`bar${i}`}
          day={weekData[i].day}
          amount={weekData[i].amount}
          max={max}
        ></Bar>
      );
    }

    setBarGraphData(arr);
  };

  useEffect(() => {
    createBarGraph(weekData);
  }, [weekData]);

  return (
    <>
      <main>
        <section className="total-balance-container">
          <div className="balance-container">
            <div className="balance-text">My balance</div>
            <div className="balance-number">$921.48</div>
          </div>
          <img className="logo" src={LogoImg} alt="logo img"></img>
        </section>
        <section className="total-spending-container">
          <div className="weekly-spending-title">Spending - Last 7 days</div>
          <div className="weekly-spending-container">{barGraphData}</div>
          <div className="total-month-container">
            <div className="month-container">
              <div className="month-text">Total this month</div>
              <div className="month-number">$478.33</div>
            </div>
            <div className="delta-container">
              <div className="delta-number">+2.4%</div>
              <div className="delta-text">from last month</div>
            </div>
          </div>
        </section>
      </main>
      <footer className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="https://github.com/exchyphen" target="_blank">
          exc
        </a>
        .
      </footer>
    </>
  );
}

export default App;
