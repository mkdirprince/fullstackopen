const Notification = ({message, messageType}) => {


  const type = messageType === 'success' ? 'success' : 'failure'


  if (message === null) {
    return null
  }

  return (
    <>
      <p className={type}>
        {message}
      </p>
    </>
  )
}

export default Notification