const Notes = ({note}) => {
    return (
      note.map(elem => {
        return(
          <li key = {elem.id}>{elem.content}</li>
        )
      })
    )
  }
  export default Notes