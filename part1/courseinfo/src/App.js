const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

// I know it wasn't asked for in 1.5 but I also updated the code to use destructuring introduced in 1c!
const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((partObj) => {
        return (
          <Part
            key={partObj.name}
            part={partObj.name}
            exercises={partObj.exercises}
          />
        );
      })}
    </div>
  );
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce(
        (previousValue, currentValue) => previousValue + currentValue.exercises,
        0
      )}
    </p>
  );
};

export default App;
