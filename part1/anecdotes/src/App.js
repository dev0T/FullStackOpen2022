import { useState } from "react";

const TextContainer = ({ text }) => {
  return <div>{text}</div>;
};

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const PointsDisplay = ({ number }) => {
  return <div>Has {number} vote(s).</div>;
};

const VoteButton = ({ handler }) => {
  return <button onClick={handler}>Vote</button>;
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
  const [points, setPoints] = useState(anecdotes.map(() => 0));
  const [mostVoted, setMostVoted] = useState(null);

  const handleAnother = () => {
    setSelected(randomInt(0, anecdotes.length));
  };

  const handleVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
    const highest = Math.max(...copy);
    const index = copy.indexOf(highest);
    setMostVoted(index);
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

  if (mostVoted != null) {
    return (
      <>
        <Header text={"Anecdote of the day"} />
        <TextContainer text={anecdotes[selected]} />
        <PointsDisplay number={points[selected]} />
        <VoteButton handler={handleVote} />
        <RandomizerButton handler={handleAnother} />
        <Header text={"Anecdote with most votes"} />
        <TextContainer text={anecdotes[mostVoted]} />
        <PointsDisplay number={points[mostVoted]} />
      </>
    );
  }

  return (
    <>
      <Header text={"Anecdote of the day"} />
      <TextContainer text={anecdotes[selected]} />
      <PointsDisplay number={points[selected]} />
      <VoteButton handler={handleVote} />
      <RandomizerButton handler={handleAnother} />
    </>
  );
};

export default App;
