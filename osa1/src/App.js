import React from 'react';
// Komponentille on mahdollista välittää dataa propsien avulla, joka on mielivaltainen syöte. props = propertie = ominaisuudet on olio
const Hello = (props) => {
  return (
    <>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </>
  )
}
// Komponentin nimen tulee alkaa isolla kirjaimella
const App = () => {
  const nimi = 'Anni'
  const ika = 21
  // Määritellä props olion kentät komponentin käytön yhteydessä:
  return (
    <div className="juurielementti">
      <h1>Greetings</h1> 
      <Hello name={nimi} age={ika}/>
      <Hello name="Walter" age={19+4} />
    </div>
  )
}

export default App;

// React komponentin sisällön tulee sisältää yleensä yksi juurielementti tai jos sitä ei ole, on validia käyttää taulukkoa joka sisältää komponentit.