const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course}/>
      <Content Arr = {course}/>
      <Total Arr = {course}/>
    </div>
  )
}

const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

const Part = (props) => {
  return (<p>
            {props.name} {props.exercise}
          </p>)
}
const Content = (props) => {
  return (<>
            <Part name = {props.Arr.parts[0].name} exercise = {props.Arr.parts[0].exercises}/>
            <Part name = {props.Arr.parts[1].name} exercise = {props.Arr.parts[1].exercises}/>
            <Part name = {props.Arr.parts[2].name} exercise = {props.Arr.parts[2].exercises}/>
          </>
  )
}

const Total = (props) => {
  return <p>Number of exercises {props.Arr.parts[0].exercises + props.Arr.parts[1].exercises + props.Arr.parts[2].exercises}</p>
}

export default App