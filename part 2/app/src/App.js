const App = ({notes}) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(elem =><li key = {elem.id}>{elem.content}</li>)}
      </ul>
    </div>
  )
}

export default App