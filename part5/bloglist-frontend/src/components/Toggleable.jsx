import { useState, forwardRef, useImperativeHandle} from "react"

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)


  const hideWhenVisible = {display: visible ? "none" : ""}
  const showWhenVisible = { display: visible ? "" : "none"}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <p style={hideWhenVisible}>
        <button onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </p>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility} >
          cancel
        </button>
      </div>
    </>
  )

})

export default Toggleable