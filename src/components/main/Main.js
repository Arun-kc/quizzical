import React from 'react'
import './Main.css';

export default function Main(props) {
  return (
    <div className="main">
        <h1 className="main-title">Quizzical</h1>

        <h3 className="main-description">Lets try some quiz!!</h3>

        <button onClick={props.changeMain} className='main-button'>Start quiz</button>

    </div>
  )
}
