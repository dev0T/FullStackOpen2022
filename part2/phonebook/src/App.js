import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

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

  const handleSearch = (event) => {
    const name = event.target.value;

    const filter = filterPersonsByName(name);

    setSearchName(name);
    setFilteredPersons(filter);
  };

  const filterPersonsByName = (name) => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  const findPerson = (name) => {
    return persons.filter((person) => person.name === name);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        Filter shown with: <input value={searchName} onChange={handleSearch} />
      </div>

      <h2>Add a New</h2>
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
      {filteredPersons.map((person) => {
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
