import React, { useEffect, useState, useContext } from 'react'
import Header from '../components/Header'
import { Container } from '../components/styled/Container.styled'
import { FreeRotationSection } from '../components/styled/FreeRotation.styled'
import { champions, championsLink } from '../data/data'
import ErrorScreen from '../components/ErrorScreen'
import { NavbarContext } from '../contexts/NavbarContext'
import MobileNav from '../components/MobileNav'
import { Helmet } from 'react-helmet'

export default function FreeRotation() {
  const {isNavActive, setIsNavActive} = useContext(NavbarContext)

  const [championsArray, setChampionsArray] = useState([])
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('none')

  useEffect(() => {
    setIsNavActive(false)
    document.body.style.overflowY = 'auto'
    fetch(`/.netlify/functions/fetchfreerotation?region=euw1`)
      .then(response => response.json())
      .then(data => {
        setReady(true)
        setChampionsArray(data.freeChampionIds)

        // we are changing ready value to true so skeleton div (loading div) is no longer displayed, and only champions are displayed
      })
      .catch(error => {
        setError('flex')
        document.body.style.overflowY = 'hidden'

        // in case something goes wrong we are changing display of error div to flex, and changing overflow to hidden (so user can't scroll)
      })
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  // setIsNavActive(false) closes mobileNav

  return (
    <>
        <Header />
        <MobileNav active={isNavActive}/>
        <FreeRotationSection>
          <Helmet>
            <title>LoL Profile - Free rotation</title>
          </Helmet>
          <ErrorScreen style={error} 
                p1='Website exceeded its API limits.'
                p2='Please try again.'
                p3=''
                linkOrA='a'
                url='/free-rotation'
            />
          <Container>
            <div className="heading">
              <h1>Free rotation</h1>
            </div>
            <p className="desc">This champions are in current free rotation.</p>
            <div className="grid-container">
              {ready ? null :
              <div className="grid skeleton">
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              </div>

              // we are showing skeleton divs (loading divs) if ready is false (champions are not loaded) and null if ready is true (champion are loaded)
              }

              <div className="grid">
                {championsArray.map(champ => {
                  return(
                    <div key={champ} style={{ backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championsLink[`${champ}`]}_0.jpg` }}>
                      <h1 key={champ}>{champions[`${champ}`]}</h1>
                    </div>
                  )
                })}
              </div>
            </div>
          </Container>
        </FreeRotationSection>
    </>
  )
}
