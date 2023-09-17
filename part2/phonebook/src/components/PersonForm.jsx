const PersonFrom = ({addPerson, newName, handlePersonChange, newNumber, handleNewNumber}) => {
  return (
    <form onSubmit={addPerson}>
        <p>
          <label htmlFor="name">  
            name 
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="enter name" 
            value={newName} 
            onChange={handlePersonChange} autoComplete="name"
          />
        </p>
        <p>
          <label htmlFor="number">
            number 
          </label>
          <input 
            type="text" 
            id="number" 
            name="number" 
            placeholder="enter number" 
            value={newNumber} 
            onChange={handleNewNumber}
          />
        </p>

        <p>
          <button type="submit">
            add
          </button>
        </p>
      </form>
  )
}

export default PersonFrom