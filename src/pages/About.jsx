import React, { useEffect, useContext } from 'react'
import Header from '../components/Header'
import { Container } from '../components/styled/Container.styled'
import { AboutSection } from '../components/styled/About.styled'
import { NavbarContext } from '../contexts/NavbarContext'
import MobileNav from '../components/MobileNav'
import { Helmet } from 'react-helmet'

export default function About() {
  const {isNavActive, setIsNavActive} = useContext(NavbarContext)

  useEffect(() => {
    setIsNavActive(false)
    document.body.style.overflowY = 'auto'
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
        <Header />
        <MobileNav active={isNavActive}/>
        <Container>
            <AboutSection>
            <Helmet>
              <title>LoL Profile - About</title>
            </Helmet>
                <div className="heading">
                    <h1>About</h1>
                </div>

                <div className="about">
                    <p>LoL Profile is a website where you can check your rank, match history and mastery points.</p>
                    <p>When the user enters his username and region, the website fetches data from <a rel="noreferrer" target='_blank' href="https://developer.riotgames.com/">Riot API</a> and then displays the data.</p>
                    <p>You can also check top 300 players on each server and see which champions are currently in free rotation.</p>
                    <p>LoL Profile isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.</p>
                    <a rel='noreferrer' target="_blank" href="https://github.com/samuelbreznjak/LoL-Profile">Github</a>
                </div>
            </AboutSection>
        </Container>
    </>
  )
}
