import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [searchName, setSearchName] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const handleAdd = (newName, newNumber) => {
    if (findPerson(newName).length === 0) {
      setPersons((persons) => {
        const updatedPersons = persons.concat({
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        });
        setFilteredPersons(updatedPersons);
        return updatedPersons;
      });
    } else {
      alert(`${newName} is already in the phonebook`);
    }
    setSearchName("");
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

      <Filter name={searchName} handler={handleSearch} />

      <h3>Add a New</h3>

      <PersonForm handleSubmit={handleAdd} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
