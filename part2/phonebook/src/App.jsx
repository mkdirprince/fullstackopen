import { useState, useEffect } from "react"


import Filter from "./components/Filter"
import PersonFrom from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [messageType, setMessageType] = useState('')


  useEffect(()=>{
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])


  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }



  const addPerson = (event) => {
    event.preventDefault();
  
    const personExists = persons.find((person) => person.name === newName);
    const message = `${newName} is already added to phonebook, replace the old number with a new one?`;
  
    if (personExists) {
      if (window.confirm(message)) {
        const updatedPerson = { ...personExists, number: newNumber };
  
        personService
          .update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((person) =>
                person.id !== updatedPerson.id ? person : returnedPerson
              )
            );
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            setNotificationMessage(`Information of ${updatedPerson.name} has already been removed from server`)
            setMessageType('failure')

            setTimeout(() => {
              setNotificationMessage(null)
            }, 4000)

            setPersons(persons.filter(person => person.id !== updatedPerson.id))
          })
      } 
      else {
        return;
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
  
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));

          setNotificationMessage(`Added ${personObject.name}`)
          setMessageType('success')

          setTimeout(() => {
            setNotificationMessage(null)
          }, 4000)

        })
        .catch( error => {
          setNotificationMessage(error.response.data.error)

          setTimeout(() => {
            setNotificationMessage(null)
          }, 4000)
        })
    }

      setNewName('');
      setNewNumber('');
  };

  

  const removePerson = (id) => {

    const person = persons.find(person => person.id === id)
    const message = `Delete ${person.name} ?`

    if (window.confirm(message)){
      personService
      .remove(id)
      .then (returnedPerson => {
      setPersons(persons.filter(person => person.id !== id))
    })
    }
    
  }


  const personsToShow = filterValue ? persons.filter( person => (person.name).toLocaleLowerCase().startsWith(filterValue.toLocaleLowerCase())) : persons


  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} messageType={messageType}/>
      <Filter 
        filterValue={filterValue} 
        handleFilterChange={handleFilterChange}
      />
      <PersonFrom 
        addPerson={addPerson} 
        newName={newName} 
        handlePersonChange={handlePersonChange} 
        newNumber={newNumber} 
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons 
        personsToShow={personsToShow}
        removePerson={removePerson}
      />
    </>
  )
}
export default App
