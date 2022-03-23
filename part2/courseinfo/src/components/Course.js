import React from 'react'

const Header = ({ name }) => <h2>{name}</h2>

const Part = ({ part }) => 
    <p>{part.name} {part.exercises}</p>
    
const Content = ({ parts }) => 
    parts.map((part) => <Part key={part.id} part={part} />)

const Total = ({ parts }) => {
    const sum = parts.reduce((ctr, item) => ctr += item.exercises, 0);
    return (
        <strong>total of {sum} exercises</strong>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>

    )
}

export default Course