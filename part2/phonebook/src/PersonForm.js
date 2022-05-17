import { useState } from "react";

const PersonForm = ({ handleSubmit }) => {
  const [newName, setName] = useState("");
  const [newNumber, setNumber] = useState("");

  const handleInputChange = (set) => (event) => set(event.target.value);

  const clearInput = () => {
    setName("");
    setNumber("");
  };

  const handle = (event) => {
    event.preventDefault();
    handleSubmit(newName, newNumber);
    clearInput();
  };

  return (
    <form onSubmit={handle}>
      <div>
        name: <input value={newName} onChange={handleInputChange(setName)} />
      </div>
      <div>
        number:{" "}
        <input value={newNumber} onChange={handleInputChange(setNumber)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
