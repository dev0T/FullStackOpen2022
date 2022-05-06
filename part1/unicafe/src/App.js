import { useState } from "react";

// Currying
const handler = (set) => () => set((value) => value + 1);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header content={"Give feedback"} />
      <Button handleClick={handler(setGood)} text={"Good"} />
      <Button handleClick={handler(setNeutral)} text={"Neutral"} />
      <Button handleClick={handler(setBad)} text={"Bad"} />
      <Header content={"Statistics"} />
      <Result text={"Good"} count={good} />
      <Result text={"Neutral"} count={neutral} />
      <Result text={"Bad"} count={bad} />
    </div>
  );
};

const Header = ({ content }) => {
  return <h1>{content}</h1>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Result = ({ text, count }) => {
  return (
    <p>
      {text} {count}
    </p>
  );
};

export default App;
