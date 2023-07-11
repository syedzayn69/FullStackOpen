import axios from 'axios'
import { useState,useEffect } from 'react'
import servicesVar from './services/services.js'

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

  const fetchData = () => {
    servicesVar
    .fetch()
    .then(returnedValue =>{
      setPersons(returnedValue)
    })
  }
  useEffect(fetchData,[])

  const onSubmitFn = (e) => {
    e.preventDefault()
    isFound = false

    const newObj = {
      name : newName,
      number : newNum
    }

    // REPLACE OLD CONTACTS WITH NEW
    {
      persons.map(elem => {
        if(elem.name === newObj.name){
          if(window.confirm('Are you sure you wanna rewrite this number')){
            servicesVar
            .updateContact(elem.id,newNum)
          }
        }
      })
      fetchData()
    }
    setPersons(persons)
    setNewName('')
    setNewNum('')

    // PREVENT USER FORM ENTERING THE SAME NAME TWICE
    {
      persons.map(elem => {
        if(newObj.name === elem.name){
          alert(`${newName} already added to phonebook!`)
          isFound = true
        }
      })
      if(isFound === true) return
    }
    
    // ADD DATA TO DATABASE & RENDERING PAGE
    servicesVar
    .addData(newObj)
    .then(returnedValue => {
      setPersons(persons.concat(returnedValue))
      setNewName('')
      setNewNum('')
    })
  }

  
  const deleteFn = (id) => {
    console.log(id)
    if(window.confirm('Are you sure you want to delete this?')){
      servicesVar
      .deleteData(id)
      
      setPersons(persons.filter(elem => elem.id !== id))
      fetchData() // solution for data not rendering correctly sometimes after deletion
    }
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
          <div key={i}>{elem.name} {elem.number} <button key={i} onClick={() => deleteFn(persons[i].id)}>Delete</button> </div>
        )
      }
    })
  }
  const displayList = () => {
    return (
      persons.map((elem,i) => {
        return (
          <div key={i}>{elem.name} {elem.number} <button key={i}  onClick={() => deleteFn(persons[i].id)}>Delete</button> </div>
        )
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