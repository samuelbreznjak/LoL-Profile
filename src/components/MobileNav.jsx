import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StyledMobileNav } from './styled/MobileNav.styled'
import { NavbarContext } from '../contexts/NavbarContext'

export default function MobileNav({ active }) {
  const {setIsNavActive} = useContext(NavbarContext)

  return (
    <StyledMobileNav>
        <div className='mobile-nav-container' style={{ top: active ? '0%' : '-100%' }}>
            <div className="close-btn"></div>
            <div className="links">
                <Link onClick={() => {setIsNavActive(false)}} to={'/'}>Home</Link>
                <Link onClick={() => {setIsNavActive(false)}} to={'/leaderboard'}>Leaderboard</Link>
                <Link onClick={() => {setIsNavActive(false)}} to={'/free-rotation'}>Free rotation</Link>
                <Link onClick={() => {setIsNavActive(false)}} to={'/about'}>About</Link>
            </div>
        </div>
    </StyledMobileNav>
  )
}
