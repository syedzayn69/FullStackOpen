
const Course = ({course}) => {
    return(
      <>
        <Header course = {course}/>
        <Content Arr = {course}/>
        <Total Arr = {course}/>
      </>
    )
  }

  const Header = ({course}) => {
    return <h1>{course.name}</h1>
  }
  
  const Part = ({name,exercise}) => {
    return (<p>
              {name} {exercise}
            </p>)
  }
  
  const Content = ({Arr}) => {
    return Arr.parts.map((elem,index) => <Part key ={index} name = {elem.name} exercise = {elem.exercises}/>)
  }
  
  const Total = ({Arr}) => {
    let sum = Arr.parts.reduce((accu,elem) => accu + elem.exercises ,0)
    return (<p><b>Number of exercises {sum}</b></p>)
  }
  
  export default Course