import React, { useState, useContext, useEffect } from 'react'
import Header from '../components/Header'
import { StyledSearch } from '../components/styled/Search.styled'
import bgVideo from '../media/bg.mp4'
import { useNavigate } from 'react-router-dom'
import { NavbarContext } from '../contexts/NavbarContext'
import MobileNav from '../components/MobileNav'
import bgImage from '../media/img/bg.jpg'
import { Helmet } from 'react-helmet'

export default function Home() {
  const {isNavActive, setIsNavActive} = useContext(NavbarContext)
  const navigate = useNavigate()

  const [isEmpty, setIsEmpty] = useState(true)
  const [reg, setReg] = useState('eun1')
  const [user, setUser] = useState('')

  useEffect(() => {
    setIsNavActive(false)
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  // setIsNavActive(false) closes mobileNav 

  let checkEmpty = (e) => {
    e.preventDefault()
    if(isEmpty){
        alert('Please enter your username')
    }else{
        navigate(`/summoner/${reg}/${user}`)
    }
  }

  // checkEmpty function is checking if the username input is empty, and if it is it sends an alert

  let handleInput = (e) => {
    if(e.target.value.trim() !== ''){
        setIsEmpty(false)
        setUser(e.target.value)
    }
  }

  // handleInput function is checking if the username input is empty, and if it is, it doesn't do anything
  // but if it's not it sets the user value to input value

  return (
    <>
      <Header />
      <MobileNav active={isNavActive}/>
      <StyledSearch>
        <Helmet>
          <title>LoL Profile - Home</title>
        </Helmet>
        <video autoPlay muted loop id="myVideo">
            <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="background" style={{ backgroundImage: `url(${bgImage})` }}></div>
        <main>
            <h2>Check your LoL profile!</h2>

            <div>
            <form onSubmit={checkEmpty}>
                <input
                required
                placeholder={'Enter your username:'}
                onChange={handleInput}
                type="text" />

                <select
                onChange={e => {
                    setReg(e.target.value)
                }}
                name="region" id="region">
                    <option value="eun1">EUNE</option>
                    <option value="euw1">EUW</option>
                    <option value="kr">KR</option>
                    <option value="br1">BR</option>
                    <option value="la1">LAS</option>
                    <option value="la2">LAN</option>
                    <option value="jp1">JP</option>
                    <option value="na1">NA</option>
                    <option value="oc1">OCE</option>
                    <option value="tr1">TR</option>
                    <option value="ru">RU</option>
                </select>
            </form>
            
            </div>

            <button onClick={checkEmpty}>Submit</button>
        </main>
      </StyledSearch>
    </>
  )
}
