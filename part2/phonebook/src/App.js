import { useState, useEffect } from 'react'
import Search from './components/Search'
import Form from './components/Form'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState({message: null, status: null})
  const newNameObject = { name: newName, number: newNumber }
  let currentPerson

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const personsToShow = search !== ''
    ? persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
    : persons

  const handleSubmit = (e) => {
    e.preventDefault()

    persons.forEach(person => {
      if (Object.values(person).includes(newName)) currentPerson = person
    })

    if (currentPerson) {
      const result = window.confirm(`${currentPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        const newPerson = { ...currentPerson, number: newNumber }
        personService
          .update(newPerson)
          .then(updatedPerson => {
            setPersons(persons.map((person) => person.id !== updatedPerson.id ? person : updatedPerson))
            let message = `${updatedPerson.name}'s number has changed`
            setNotification({message, status: 'success'})
            setTimeout(() => setNotification({message: null, status: null}), 2000);
          })
      }
    } else {
      personService
        .create(newNameObject)
        .then(savedPerson => {
          setPersons([...persons, savedPerson])
          let message = `Added ${savedPerson.name}`
          setNotification({message, status: 'success'})
          setTimeout(() => setNotification({message: null, status: null}), 2000);
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (person) => {
    const result = window.confirm(`Delete ${person.name}?`);
    if (result) {
      personService
        .deleteById(person.id)
        .then(res => {
          setPersons(persons.filter(x => x.id !== person.id))
          let message = `${person.name} has been deleted`
          setNotification({message, status: 'success'})
          setTimeout(() => setNotification({message: null, status: null}), 2000);
        })
        .catch(error => {
          setPersons(persons.filter(x => x.id !== person.id))
          let message = `Information of ${person.name} has already been removed from server`
          setNotification({message, status: 'error'})
          setTimeout(() => setNotification({message: null, status: null}), 2000);
        })
    }
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>Phonebook</h2>
      <Search search={search} setSearch={setSearch} />
      <h3>Add a new</h3>
      <Form handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App