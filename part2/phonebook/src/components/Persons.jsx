const Person = ({person, removePerson}) => {
  return (
    <>
      <p>
        {person.name} {person.number} <button onClick={()=> removePerson(person.id)}>delete</button>
      </p>
      
    </>
  )
}


const Persons = ({personsToShow, removePerson}) => {
  return (
    <>
      {personsToShow.map( person => 
        <Person 
          key={person.id} 
          person={person}
          removePerson={removePerson}
        />
      )}
    </>
    
  )
}

export default Persons