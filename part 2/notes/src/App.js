import Notes from './components/Note'
import axios from 'axios'
import { useEffect,useState } from 'react'

const App = () => {
  const [notes,noteFn] = useState([])
  const hookFn = () => {
    axios
    .get('http://localhost:3001/notes')
      .then(response => {
        noteFn(response.data)
      })
  }
  useEffect(hookFn,[])

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <Notes note = {notes}/>
      </ul>
    </div>
  )
}

export default App