import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleAdd = (event) => {
    event.preventDefault();

    if (findPerson(newName).length === 0) {
      setPersons((persons) =>
        persons.concat({ name: newName, id: persons.length + 1 })
      );
    } else {
      alert(`${newName} is already added to phonebook`);
    }

    setNewName("");
  };

  const findPerson = (name) => {
    return persons.filter((person) => person.name === name);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAdd}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <p key={person.id}>{person.name}</p>;
      })}
    </div>
  );
};;

export default App;
