import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addNote = (e) => {
    e.preventDefault()

    const newObj = {
      content: newNote,
      important: Math.random() < 0.5,
      id : notes.length + 1
    }
    
    setNotes(notes.concat(newObj))
    setNewNote('')
  }

  const changeFunc = (e) => {
    setNewNote(e.target.value)
  }
  
  const notesToShow = showAll 
  ? notes 
  : notes.filter(elem => elem.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={changeFunc}/>
        <button type="submit">save</button>
      </form>   
    </div>
  )
}
export default App 