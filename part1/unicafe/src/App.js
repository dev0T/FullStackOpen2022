import React, { useState } from "react";

// Currying
const handler = (set) => () => set((value) => value + 1);

const sum = (...args) => {
  return args.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
};

const avg = (weights, ...args) => {
  const divisor = sum(...args);
  const dividend = weights.reduce((accumulator, weight, index) => {
    return accumulator + args[index] * weight;
  }, 0);
  return dividend / divisor;
};

const percentage = (...args) => {
  const total = sum(...args);
  const positive = args[0];
  return (positive / total) * 10;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const weights = [1, 0, -1];

  return (
    <div>
      <React.StrictMode>
        <Header content={"Give feedback"} />
        <Button handleClick={handler(setGood)} text={"Good"} />
        <Button handleClick={handler(setNeutral)} text={"Neutral"} />
        <Button handleClick={handler(setBad)} text={"Bad"} />
        <Header content={"Statistics"} />
        <Result text={"Good"} result={good} />
        <Result text={"Neutral"} result={neutral} />
        <Result text={"Bad"} result={bad} />
        <Result text={"All"} result={sum(good, neutral, bad)} />
        <Result text={"Average"} result={avg(weights, good, neutral, bad)} />
        <Result
          text={"Positive"}
          result={`${percentage(good, neutral, bad)}%`}
        />
      </React.StrictMode>
    </div>
  );
};

const Header = ({ content }) => {
  return <h1>{content}</h1>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Result = ({ text, result }) => {
  return (
    <p>
      {text} {result}
    </p>
  );
};

export default App;
