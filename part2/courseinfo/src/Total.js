const Total = ({ parts }) => {
  return (
    <p>
      <b>
        Tofal of{" "}
        {parts.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.exercises,
          0
        )}{" "}
        exercises
      </b>
    </p>
  );
};

export default Total;
