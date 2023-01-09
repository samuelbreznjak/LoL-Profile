import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container } from './styled/Container.styled'
import { FlexNav } from './styled/FlexNav.styled'
import { StyledHeader } from './styled/Header.styled'
import { NavbarContext } from '../contexts/NavbarContext'
import Hamburger from 'hamburger-react'

export default function Header() {
  const {setIsNavActive, isNavActive} = useContext(NavbarContext)

  let handleNavToggle = () => {
    setIsNavActive(!isNavActive)
    document.body.style.overflowY = isNavActive ? 'auto' : 'hidden'
  }

  return (
    <StyledHeader>
        <nav>
            <Container>
                <FlexNav>
                    <Link to={'/'} className='logo'>
                        <h1 id='logo'>LoL Profile</h1>
                    </Link>

                    <div className="links">
                        <Link to={'/'}>Home</Link>
                        <Link to={'/leaderboard'}>Leaderboard</Link>
                        <Link to={'/free-rotation'}>Free rotation</Link>
                        <Link to={'/about'}>About</Link>
                    </div>
                    <span className='hamburger' onClick={handleNavToggle}>
                        <Hamburger size={25}/>
                    </span>
                </FlexNav>
            </Container>
        </nav>
    </StyledHeader>
  )
}
