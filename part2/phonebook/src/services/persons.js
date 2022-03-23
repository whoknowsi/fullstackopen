import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(res => res.data)
}

const deleteById = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (person) => {
    const request = axios.put(`${baseUrl}/${person.id}`, person)
    return request.then(res => res.data)
}

export default { getAll, create, deleteById, update }