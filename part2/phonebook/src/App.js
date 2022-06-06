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

  const showNotification = (message, type) => {
    const messageObj = {
      text: message,
      type: type,
    };
    setMessage(messageObj);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

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
            showNotification(`Added ${personObject.name}`, "success");
            return updatedPersons;
          });
        })
        .catch((error) => {
          showNotification(
            `There was an error adding ${personObject.name} to the server. Try again later.`,
            "error"
          );
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
              showNotification(`Updated ${person.name}`, "success");
              return updatedPersons;
            });
          })
          .catch((error) => {
            showNotification(
              `Unable to update the number of ${person.name}. Try refreshing the page.`,
              "error"
            );
          });
      }
    }
    setSearchName("");
  };

  const handleDelete = (personId) => {
    const person = findPersonById(personId);

    const confirm = window.confirm(`Do you want to delete ${person.name}?`);

    if (confirm) {
      const updatedPersons = filterOutById(personId);
      setPersons(updatedPersons);
      setFilteredPersons(updatedPersons);
      personsService
        .deletePerson(personId)
        .then((response) => {
          showNotification(`Deleted ${person.name}`, "success");
          return response;
        })
        .catch((error) => {
          showNotification(
            `Unable to delete the number of ${person.name}.`,
            "error"
          );
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
