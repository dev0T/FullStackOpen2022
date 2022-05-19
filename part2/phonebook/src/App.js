import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

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

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      setFilteredPersons(response.data);
    });
  }, []);

  console.log("render", persons.length, "notes");

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
