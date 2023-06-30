import { useState } from 'react'

// COMPONENETS
const Button = (props) => {
  return(
    <button onClick={props.func}>{props.text}</button>
  )
}

const Statistics = (props) => {
  return(
    <table>
      <tbody>
        <StatisticsLine text = 'good' value = {props.Obj.good}/>
        <StatisticsLine text = 'neutral' value = {props.Obj.neutral}/>
        <StatisticsLine text = 'bad' value = {props.Obj.bad}/>
        <StatisticsLine text = 'all' value = {props.Obj.all}/>
        <StatisticsLine text = 'average' value = {props.Obj.avg}/>
        <StatisticsLine text = 'positive' value = {props.Obj.positive}/>
      </tbody>
    </table>
  )
}

const StatisticsLine = (props) => {
  return(
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
  )
}

// APP
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  //FUNCTIONS
  const goodFunc = () => {
    setGood(good + 1)
    setAll(all + 1)
  }
  
  const neutralFunc = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  
  const badFunc = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  const forAvg = () => {
    const average = (good * 1 + bad * -1) / all
    return average
  }
  const forPos = () => {
    const positive = good * (100 / all)
    return positive + ' %'
  }

  // OBJECT FOR STATISTICS COMPONENT

  const NewObj = {
    good : good,
    neutral : neutral,
    bad : bad,
    all : all,
    avg : forAvg(),
    positive : forPos()
  }

  /////////////////////////////////
  
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text = 'good' func = {goodFunc}></Button>
      <Button text = 'natural' func = {neutralFunc}></Button>
      <Button text = 'bad' func = {badFunc}></Button>

      <h1>Statistics</h1>
      {good > 0 || bad > 0 || neutral > 0 ? <Statistics Obj ={NewObj}/> : 'No feedback given' }
    </div>
  )
}

export default App