import React, { useState } from "react";

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

const Statistics = ({ goodAmount, neutralAmount, badAmount }) => {
  const weights = [1, 0, -1];
  return (
    <>
      <Header content={"Statistics"} />
      <Result text={"Good"} result={goodAmount} />
      <Result text={"Neutral"} result={neutralAmount} />
      <Result text={"Bad"} result={badAmount} />
      <Result text={"All"} result={sum(goodAmount, neutralAmount, badAmount)} />
      <Result
        text={"Average"}
        result={avg(weights, goodAmount, neutralAmount, badAmount)}
      />
      <Result
        text={"Positive"}
        result={`${percentage(goodAmount, neutralAmount, badAmount)}%`}
      />
    </>
  );
};

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
  const result = dividend / (divisor ? divisor : 1);
  return result;
};

const percentage = (...args) => {
  const total = sum(...args);
  const positive = args[0];
  const result = (positive / (total ? total : 1)) * 10;
  return result;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <React.StrictMode>
        <Header content={"Give feedback"} />
        <Button handleClick={handler(setGood)} text={"Good"} />
        <Button handleClick={handler(setNeutral)} text={"Neutral"} />
        <Button handleClick={handler(setBad)} text={"Bad"} />
        <Statistics goodAmount={good} neutralAmount={neutral} badAmount={bad} />
      </React.StrictMode>
    </div>
  );
};

export default App;
