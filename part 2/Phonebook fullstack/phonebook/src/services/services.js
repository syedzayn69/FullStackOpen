import axios from 'axios'
const url = 'http://localhost:3001/api/persons'

const fetch = () => {
    const returnedValue = axios
    .get(url)
    .then(response => response.data)
    return returnedValue
}

const addData = (newObj) => {
    const returnedValue = axios
    .post(url,newObj)
    .then(response => response.data)
    return returnedValue
} 

const deleteData = (id)  => {
    axios
    .delete(`${url}/${id}`)
    .catch(error => {
        alert('This contact is already deleted!')
    })
}

const updateContact = (id,number) => {
    return(
        axios
        .patch(`${url}/${id}`,{number: `${number}`})
    )
}

export default { fetch, addData, deleteData, updateContact }