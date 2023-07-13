import { useState,useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteServicesVar from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMsg,setErrorMsg] = useState(null)

  const dataFetch = () => {
    noteServicesVar
      .getAll()
        .then(returnedValue => {
          setNotes(returnedValue)
        })
  }
  useEffect(dataFetch,[])

  const addNote = (e) => {
    e.preventDefault()

    const newObj = {
      content: newNote,
      important: Math.random() < 0.5,
      id : notes.length + 1
    }
    
    noteServicesVar
      .create(newObj)
        .then(returnedValue => {
          setNotes(notes.concat(returnedValue))
          setNewNote('')
        })
  }

  const toggleImportance = (id) => {
    console.log(`importance of ${id} needs to be toggled`)
    
    const note = notes.find(elem => elem.id === id)
    let changedNotes = {...note, important: !note.important}

    noteServicesVar
    .update(id,changedNotes)
      .then(returnedValue => {
        setNotes(notes.map(elem => elem.id !== id ? elem : returnedValue))
      })
      .catch(error => {
        setErrorMsg(`Note '${note.content}' was already removed from server`)
        setTimeout(() => setErrorMsg(null),5000)
        setNotes(notes.filter(elem => elem.id !== id))
      })


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
      <Notification message={errorMsg} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={changeFunc}/>
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}
export default App 