const Course = (props) => {
    return(
      <div>
        <Header course={props}/>
        <Content parts={props.course.parts}/>
        <Total parts={props.course.parts} />
      </div>
      )
  }

  const Header = (props) => {
    return (
      <h2>{props.course.course.name}</h2>
    )
  }
  
  const Total = ({ parts }) => {
      console.log("Toimii?")
    const total = parts.map(part => part.exercises).reduce((prev, current) => prev + current)
    return(
      <h3>total of {total} exercises</h3>
    ) 
  }
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map( part => 
            <Part key={part.id} part={part} />
          )}
      </div>
    )
  }

  export default Course