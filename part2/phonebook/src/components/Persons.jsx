const Person = ({person}) => {
  return (
    <>
      <p>
        {person.name} {person.number}
      </p>
    </>
  )
}


const Persons = ({personsToShow}) => {
  return (
    <>
      {personsToShow.map( person => 
        <Person 
          key={person.id} 
          person={person}
        />
      )}
    </>
    
  )
}

export default Persons