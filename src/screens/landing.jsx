import React from 'react'
import '../css/landing.css'
import card1 from '../assets/card-1.svg'
import card2 from '../assets/card-2.svg'

const Landing = () => {
  return (
    <main>
      <div className="main-container">
      <div className='left'>
        <h1>Rehearse AI</h1>
        <p>practice your interviews, powered by Artificial Intelligence.</p>
        <div className="buttons-container">
          <button data="Try Now!"></button>
          <button data="Learn more"></button>
        </div>
      </div>
      <div className='right'>
        <img src={card1} alt="" /><br />
        <img src={card2} alt="" />
      </div>
      </div>
    </main>
  )
}

export default Landing