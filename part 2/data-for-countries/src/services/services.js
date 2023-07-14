import axios from "axios";
const url = `https://studies.cs.helsinki.fi/restcountries/api/`

const fetchData = () => {
    return(
        axios
        .get(`${url}all`)
        .then(elem => elem.data)
        )
    }

const singleCountryData = (country) => {
    return(
        axios
        .get(`${url}name/${country}`)
        .then(elem => elem.data)
        .catch(error => console.log('abort'))
    )
}
export default {fetchData, singleCountryData}