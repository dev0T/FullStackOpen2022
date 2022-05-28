import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Person from "./Person";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  const handleAdd = (newName, newNumber) => {
    if (findPersonByName(newName).length === 0) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      personsService.create(personObject).then((returnedPerson) => {
        setPersons((persons) => {
          const updatedPersons = persons.concat(returnedPerson);
          setFilteredPersons(updatedPersons);
          return updatedPersons;
        });
      });
    } else {
      alert(`${newName} is already in the phonebook`);
    }
    setSearchName("");
  };

  const handleDelete = (personId) => {
    const person = findPersonById(personId);

    console.log(person);

    const confirm = window.confirm(`Do you want to delete ${person.name}?`);

    if (confirm) {
      const updatedPersons = filterOutById(personId);
      setPersons(updatedPersons);
      setFilteredPersons(updatedPersons);
      personsService.deletePerson(personId).then((response) => {
        return response;
      });
    }
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

  const findPersonByName = (name) => {
    return persons.filter((person) => person.name === name);
  };

  const filterOutById = (id) => {
    return persons.filter((person) => person.id !== id);
  };

  const findPersonById = (id) => {
    return persons.find((person) => person.id === id);
  };

  const getAll = () => {
    personsService.getAll().then((response) => {
      setPersons(response);
      setFilteredPersons(response);
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  console.log("render", persons.length, "notes");

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter name={searchName} handler={handleSearch} />

      <h3>Add a New</h3>

      <PersonForm handleSubmit={handleAdd} />
      <h3>Numbers</h3>
      {filteredPersons.map((person) => {
        return (
          <Person key={person.id} person={person} handleDelete={handleDelete} />
        );
      })}
    </div>
  );
};

export default App;
