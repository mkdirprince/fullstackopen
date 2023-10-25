const Notification = ({message, error}) => {

  if (message == null) {
    return null
  }

  const errorStyle = {
    backgroundColor: 'lightGray',
    color: 'red',
    border: 'solid 1px red',
    fontSize: 18,
    paddingLeft: 8
  }

  const successStyle = {
    backgroundColor: 'lightGray',
    color: 'green',
    border: 'solid 1px green',
    fontSize: 18,
    paddingLeft: 8
  }

  return (
    <div style={error ? errorStyle : successStyle }>
      <p>{message}</p>
    </div>
  )
}

export default Notification