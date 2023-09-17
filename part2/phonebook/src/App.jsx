import { useState } from "react"

import Filter from "./components/Filter"
import PersonFrom from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')


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
    event.preventDefault()

    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to persons`)
      setNewName('')
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }


  const personsToShow = filterValue ? persons.filter( person => (person.name).toLocaleLowerCase().startsWith(filterValue.toLocaleLowerCase())) : persons


  return (
    <>
      <h2>Phonebook</h2>
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
      />
    </>
  )
}
export default App
