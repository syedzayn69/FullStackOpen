import axios from 'axios'
import services from './services/services';
import { useState,useEffect } from 'react';

function App() {
  const [allCountries,setAllCountries] = useState([])
  const [inputField,setInputField] = useState('')
  const [displayFilteredList,setDisplayFilteredList] = useState([])
  const [singleCountry,setSingleCountry] = useState('')
  const [flag,setflag] = useState(false)

  const fetch = () => {
    const newArr = []

    services
    .fetchData()
    .then(returnedValue => {
      returnedValue.map(elem => {
        newArr.push(elem.name.common)
      })
      setAllCountries(newArr)
    })
  }
  useEffect(fetch,[])

  const submitFn = (e) => {
    e.preventDefault()
  }

  const filterFn =(e) => {
    const filterWords = e.target.value
    setInputField(filterWords)

    // DISPLAY FILTERED LIST
    {
      const regex = new RegExp(`${filterWords}`,'gi')
      const filteredArr = []
      allCountries.map(elem => {
        if(regex.test(elem)) filteredArr.push(elem)
      })
      setDisplayFilteredList(filteredArr)
    }
  }
  const filterList = () => {
    return(
      displayFilteredList.length > 9 
        ? 'Too many matches,specify another filter'
        : displayFilteredList.map((elem,i) => <div data-flag-name={elem} key={i}>{elem} <button onClick={newFunc} key={i}>{flag ? 'hide' : 'show'}</button></div>)
    )      
  }
  const countryDetailFetch = () => {
    console.clear()
    let country = displayFilteredList[0]
      services
      .singleCountryData(country)
      .then(returnedValue => {
        const countryName = returnedValue
        setSingleCountry(countryName)
      })
  }
  useEffect(countryDetailFetch,[displayFilteredList])

  const countryDetailDisplay = () => {
    if(singleCountry === undefined) return
    const flagStyles ={
      border:'1px solid black'
    }
    const langArr = Object.values(singleCountry.languages)
    return(
      <div>
        <h1>{singleCountry.name.common}</h1>
        capital {singleCountry.capital} <br />
        area {singleCountry.area}
        <h4>languages:</h4>
        <ul>
        {langArr.map((elem,i) => {
            return(
              <li key={i}>{elem}</li>
            )
          })}
        </ul>
        <img style={flagStyles} src={`${singleCountry.flags.png}`} alt="" />

      </div>
    )
  }

  const newFunc = (e) => {
    let flagCondition = flag
    const nameOfCountry = e.target.parentNode.dataset.flagName
    setflag(!flagCondition)
    services.
    singleCountryData(nameOfCountry)
    .then(returnedValue => {
      setSingleCountry(returnedValue)
    })
  }

  return (
    <>  
    <form onSubmit={submitFn}>
      Find Countries : <input type="text" value={inputField} onChange={filterFn}/>
    </form>
    {filterList().length === 1 ? countryDetailDisplay() : filterList()}
    {flag ? countryDetailDisplay() : ''}
    </>
  );
}

export default App;
