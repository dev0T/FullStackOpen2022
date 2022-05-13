import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((partObj) => {
        return (
          <Part
            key={partObj.id}
            part={partObj.name}
            exercises={partObj.exercises}
          />
        );
      })}
    </div>
  );
};

export default Content;
