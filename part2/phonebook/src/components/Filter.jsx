const Filter = ({filterValue, handleFilterChange}) => {
  return (
    <p>
      <input type="text" name="filter" placeholder="search.." value={filterValue} onChange={handleFilterChange}/>
    </p>
  )
}

export default Filter