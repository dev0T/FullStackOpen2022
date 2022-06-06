import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Person from "./Person";
import personsService from "./services/persons";
import Notification from "./Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState({});

  const handleAdd = (newName, newNumber) => {
    const person = findPersonByName(newName);
    if (!person) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      personsService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons((persons) => {
            const updatedPersons = persons.concat(returnedPerson);
            setFilteredPersons(updatedPersons);
            const message = {
              text: `Added ${personObject.name}`,
              type: "success",
            };
            setMessage(message);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            return updatedPersons;
          });
        })
        .catch((error) => {
          setMessage({
            text: `There was an error adding ${personObject.name} to the server. Try again later.`,
            type: "error",
          });
          console.log(error);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    } else {
      const confirmSub = window.confirm(
        `${person.name} is already added to the phonebook. Would you like to replace the old number with the new one?`
      );
      if (confirmSub) {
        const updatedPerson = { ...person, number: newNumber };
        const personId = person.id;
        personsService
          .update(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons((persons) => {
              const updatedPersons = persons.map((person) =>
                person.id !== personId ? person : returnedPerson
              );
              setFilteredPersons(updatedPersons);
              return updatedPersons;
            });
          })
          .catch((error) => {
            setMessage({
              text: `Unable to update the number of ${person.name}. Try refreshing the page.`,
              type: "error",
            });
            console.log(error);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
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
      personsService
        .deletePerson(personId)
        .then((response) => {
          setMessage({
            text: `Deleted ${person.name}`,
            type: "success",
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          return response;
        })
        .catch((error) => {
          setMessage({
            text: `Unable to delete the number of ${person.name}.`,
            type: "error",
          });
          console.log(error);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
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
    return persons.find((person) => person.name === name);
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
      <Notification message={message} />

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
