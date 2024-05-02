import React from 'react'
import '../css/landing.css'
import card1 from '../assets/card-1.svg'
import card2 from '../assets/card-2.svg'
import aiimage from "../assets/Union.svg"
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="main-container">
      <div className='left'>
        <h1>Rehearse AI</h1>
        <p className='subtitle'>practice your interviews, powered by Artificial Intelligence.</p>
        <div className="buttons-container">
          <button className='home-button'><p className='button-text' onClick={()=>navigate('/home')}>Try Now!</p></button>
          <button className='home-button'><p className='button-text' onClick={()=>navigate('//github.com/shrutixyz/rehearse-ai')}>Learn more</p></button>
        </div>
      </div>
      <div className='right'>
        <img src={card1} alt="" /><br />
        <img src={card2} alt="" />
      </div>
      </div>
      <img src={aiimage} className='aiimage' alt="" />
    </main>
  )
}

export default Landing