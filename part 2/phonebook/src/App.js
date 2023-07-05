import { useState } from 'react'

// COMPONENTS
const Filter = ({filterFn}) => {
  return(
    <>
      filter shown with <input onChange={filterFn}/>
    </>
  )
}
const PersonForm = ({onSubmitFn,newName,changeFnName,newNum,changeFnNum}) => {
  return(
  <form onSubmit={onSubmitFn}>
    <div>
      name: <input value = {newName} onChange={changeFnName} required/><br />
      number: <input value = {newNum} onChange={changeFnNum} required/><br />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form >)
}
const Person = ({IsEmpty,displayList,filterListFn}) => {
  return IsEmpty ? displayList() : filterListFn() 
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [IsEmpty, setIsEmpty] = useState(true)
  const [filteredWords, setfilterWords] = useState('')
  let isFound = false


  const onSubmitFn = (e) => {
    e.preventDefault()
    isFound = false
    const newObj = {
      name : newName,
      number : newNum
    }

    // PREVENT USER FORM ENTERING THE SAME NAME TWICE
    {persons.map(elem => {
      if(elem.name === newObj.name){
        alert(`${newName} already added to phonebook!`)
        isFound = true
      }
    })
    if(isFound === true) return
    }

  setPersons(persons.concat(newObj))
  setNewName('')
  setNewNum('')
}


const changeFnName = (e) => {
  setNewName(e.target.value)
}
const changeFnNum = (e) => {
  setNewNum(e.target.value)
}
const filterFn = (e) => {
  let field = e.target.value
  setfilterWords(field)

  if(field !== '') setIsEmpty(false)
  else setIsEmpty(true)
}

const filterListFn = () => {
  let regex = new RegExp(`${filteredWords}`,'gi')
  
  return persons.map((elem,i) => {
    if(elem.name.match(regex) !== null){
      return(
        <div key={i}>{elem.name} {elem.number}</div>
      )
    }
  })
}
const displayList = () => {
  return (
    persons.map((elem,i) => {
      return (<div key = {i}>{elem.name} {elem.number}</div>)
    })
  )
}

return (
  <div>
      <h2>Phonebook</h2>
      <Filter  filterFn={filterFn}/>
      <h3>add a new</h3>
      <PersonForm  onSubmitFn={onSubmitFn} newName={newName} changeFnName={changeFnName} newNum={newNum} changeFnNum={changeFnNum}/>
      <h3>Numbers</h3>
      <Person IsEmpty={IsEmpty} displayList={displayList} filterListFn={filterListFn}/>
    </div>
  )
}

export default App