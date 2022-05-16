import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567", id: 1 },
  ]);
  const [newName, setName] = useState("");
  const [newNumber, setNumber] = useState("");

  const handleInputChange = (set) => (event) => set(event.target.value);

  const clearInput = () => {
    setName("");
    setNumber("");
  };

  const handleAdd = (event) => {
    event.preventDefault();

    if (findPerson(newName).length === 0) {
      setPersons((persons) =>
        persons.concat({
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        })
      );
    } else {
      alert(`${newName} is already added to phonebook`);
    }

    clearInput();
  };

  const findPerson = (name) => {
    return persons.filter((person) => person.name === name);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAdd}>
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
      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        );
      })}
    </div>
  );
};

export default App;
