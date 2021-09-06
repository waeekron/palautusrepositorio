import React, { useState } from 'react'

const Statistics = (props) => {
  if (props.good + props.bad + props.neutral === 0) {
    return(
      <div>No feedback given</div>
    )
  }
  return(
      <table>
        <thead>
          <tr>
            <td><StatisticLine text="good" value ={props.good} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="neutral" value ={props.neutral} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="bad" value ={props.bad} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="all" value ={props.bad + props.good + props.neutral} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="average" value ={((props.good - props.bad) / (props.bad + props.good + props.neutral)).toFixed(2)} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="positive" value ={((props.good / (props.bad + props.good + props.neutral)) * 100).toFixed(2) + '%'}/></td>
          </tr>
        </thead>
      </table>
  )
}

const StatisticLine = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
    
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> give feedback </h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2> statistics </h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}> {props.text} </button>
  )
}
export default App
