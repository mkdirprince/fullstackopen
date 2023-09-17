const Total = ({parts}) => {

  const sum = parts.reduce((sum, item) => sum += item.exercises, 0)

  return (
    <p><strong>total of {sum} exercises</strong></p>
  )
}

const Part = ({part}) => {
  return (
    <>
      <p>{part.name} {part.exercises}</p>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => 
        <Part key={part.id} part={part}/>
      )}
    </>
  )
}

const Header = ({name}) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}


export default Course