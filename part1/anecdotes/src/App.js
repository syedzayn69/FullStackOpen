import { useState } from 'react'
let lastNum;

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [vote, setVotes] = useState([0,0,0,0,0,0,0,0])
  let copyVotes = [...vote]
  
  const votingFn = () => {
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  const displayVotes = () => {
    return copyVotes[selected]
  }

  const randomNum = () => {
    let num = Math.floor(Math.random() * anecdotes.length)
    if(num === lastNum) return randomNum() // so a quote doesnt repeat itself
    lastNum = num
    setSelected(num)
  }

  const mostVotes = () => {
    let max = Math.max(...copyVotes)
    let indexOfMax = copyVotes.indexOf(max)
    return (
      <>
      {anecdotes[indexOfMax]} <br />
      has {copyVotes[indexOfMax]} votes!
      </>
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {displayVotes()} votes! <br />
      <button onClick={votingFn}>Vote!</button>
      <button onClick={randomNum}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {mostVotes()}
    </div>
  )
}

export default App