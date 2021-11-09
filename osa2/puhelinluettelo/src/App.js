import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [errorMessage, setErrorMessage] = useState(null)
  const [succes, setSucces] = useState(false)

  //TODO: Muuta sovellusta siten, että datan alkutila haetaan axios-kirjaston
  // avulla palvelimelta. Hae data effect hookilla.
  useEffect( () => {
    console.log('effect')
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
      setPersonsToShow(initialPersons)
    })
  },[])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.find(person => person.name === newName.trim())
    console.log(person)

    if (typeof person !== 'undefined') {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = {...person, number : newNumber}
        personService
          .update(changedPerson)
            .then(returnedPerson => {
              console.log('palautettu ',returnedPerson)
              setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
              setPersonsToShow(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
              setNewName('')
              setNewNumber('')

              setErrorMessage(`Changed the number of ${changedPerson.name}`)
              setSucces(true)
              setTimeout(() => {
                setErrorMessage(null)
                setSucces(false)
              }, 5000)
            }).catch(error => {
              setErrorMessage(`Information of ${changedPerson.name} has already been removed`)
              setSucces(false)
              setTimeout(() => {
                setErrorMessage(null)
                setSucces(true)
              }, 5000)
            }) 
            
          }
          return
    } 
    console.log('here')
    //ADDING A NEW PERSON
    
    const personObject = { 
      name: newName.trim(),
      number: newNumber.trim()
    }

    personService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setPersonsToShow(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          setSucces(true)
          setErrorMessage(`Added ${personObject.name}`)
          
        })
        setTimeout(() => {
          setErrorMessage(null)
          setSucces(false)
        }, 5000)
        
  }


  const search = (event) => {
    if (event.target.value.trim() === '') {
      setPersonsToShow(persons)
      setFilter('')
      return
    }
    setFilter(event.target.value.trim())
    setPersonsToShow(persons.filter(person => person.name.toLowerCase().startsWith(filter)))
  }

  const remove = id => {
    const deletedContact = persons.find(person => person.id === id)
    if (window.confirm(`Are you sure you want to delete this contact`) ) {
      console.log(id,'poistetaan')
      const removed = personService.remove(id)
      removed.then(removed => {
        console.log(removed)
        setPersons(persons.filter(person => person.id !== id))
        setPersonsToShow(persons.filter(person => person.id !== id))

        setSucces(true)
        setErrorMessage(`Deleted ${deletedContact.name}`)
        setTimeout(() => {
          setErrorMessage(null)
          setSucces(false)
        }, 5000)  
      }) 
    }
  }   

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} succeeded={succes} />
      <Filter search={search}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
                  newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleRemove={remove}/>
    </div>
  )

}

export default App