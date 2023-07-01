import Notes from './components/Note'

const App = ({notes}) => {
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