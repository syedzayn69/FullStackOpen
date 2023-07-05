import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const onSubmitFn = (e) => {
    e.preventDefault()
    const newObj = {
      name : newName 
    }
    setPersons(persons.concat(newObj))
    setNewName('')
  }
  

  const changeFn = (e) => {
    // console.log(e.target.value)
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmitFn}>
        <div>
          name: <input value = {newName} onChange={changeFn}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form >
      <h2>Numbers</h2>
      {persons.map((elem,index) => <div key = {index}>{elem.name}</div>)}
    </div>
  )
}

export default App