import { useState } from "react";

const TextContainer = ({ text }) => {
  return <div>{text}</div>;
};

const RandomizerButton = ({ handler }) => {
  return <button onClick={handler}>Another!</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);

  const handler = (set) => () => {
    set(randomInt(0, anecdotes.length));
  };

  /**
   * Function reference taken from
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
   * @param {*} min Minimum value
   * @param {*} max Maximum value which the number will be less of
   * @returns Return a random integer between specified values
   */

  const randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
  };

  return (
    <>
      <TextContainer text={anecdotes[selected]} />
      <RandomizerButton handler={handler(setSelected)} />
    </>
  );
};

export default App;
