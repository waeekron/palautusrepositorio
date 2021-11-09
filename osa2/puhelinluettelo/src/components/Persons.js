const Persons = ({personsToShow, handleRemove}) => {
    return(
        <div>
            {personsToShow.map(
                person => <p key={person.name}> {person.name} {person.number} 
                <button onClick={() => handleRemove(person.id)}>delete</button></p>
            )}
        </div>
    )
}

export default Persons