import React, { useState, useEffect, useContext } from 'react'
import Header from '../components/Header'
import { Container } from '../components/styled/Container.styled'
import { PlayerSection } from '../components/styled/Player.styled'
import { NavbarContext } from '../contexts/NavbarContext'
import ErrorScreen from '../components/ErrorScreen'
import MobileNav from '../components/MobileNav'
import { Helmet } from 'react-helmet'
import SummonerHeader from '../components/SummonerHeader'
import Rank from '../components/Rank'
import MasteryCard from '../components/MasteryCard'
import Match from '../components/Match'

export default function Summoner() {
  const {isNavActive, setIsNavActive} = useContext(NavbarContext)

  const [region, setRegion] = useState('')
  const [username, setUsername] = useState('')

  const [playerInfo, setPlayerInfo] = useState(['', 1, 100])
  const [playerSoloInfo, setPlayerSoloInfo] = useState({})
  const [playerFlexInfo, setPlayerFlexInfo] = useState({})

  const [isSoloNull, setIsSoloNull] = useState(true)
  const [isFlexNull, setIsFlexNull] = useState(true)
  const [active, setActive] = useState('matches')
  const [matchesinfo, setMatchesinfo] = useState([])
  const [mastery, setMastery] = useState([])
  const [puuid, setPuuid] = useState('')

  const [ready, setReady] = useState(false)
  const [error, setError] = useState('none')

  // FUNCTIONS

  let handleZeroMatches = () => {
    if(matchesinfo.length === 0){
      return <p>This player has not played the game for a long time, so we can't find any match.</p>
    }
  }

  let handleZeroMastery = () => {
    if(mastery.length === 0){
      return <p>This player's level is too low and we didn't find champion mastery points.</p>
    }
  }

  let handleError = () => {
    setReady(true)
    setError('flex')
    document.body.style.overflowY = 'hidden'

    // we are displaying error div in case something goes wrong
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsNavActive(false)
    document.body.style.overflowY = 'auto'

    setRegion((window.location.href).split('/')[4])
    setUsername((window.location.href).split('/')[5])

    let id, puuid, general_region;

    // we are scrolling to top

    // setIsNavActive(false) closes mobileNav 

    // we are getting region and username from url so users can share their profile links

    if(username !== '' && region !== ''){
      fetch(`/.netlify/functions/fetchplayer?region=${region}&username=${username}`)
      .then(response => response.json())
      .then(data => {
        id = data.id
        puuid = data.puuid
        setPuuid(data.puuid)
        setPlayerInfo([data.name, data.profileIconId, data.summonerLevel])

        fetch(`/.netlify/functions/fetchmastery?region=${region}&id=${id}`)
          .then(response => response.json())
          .then(data => {
            setMastery(data)
          })
          .catch(error => {
            handleError();
          })

        fetch(`/.netlify/functions/fetchrank?region=${region}&id=${id}`)
          .then(response => response.json())
          .then(data => {
            let solo = data.findIndex(item => item.queueType === 'RANKED_SOLO_5x5');
            let flex = data.findIndex(item => item.queueType === 'RANKED_FLEX_SR');

            // data is array of 2 objects

            // objects are not sorted based on queueType so we have to manually find which one we need

            // we are finding index of queueType and assigning it to a variable

            if(data.length === 2){

              // if data.length === 2 it means player is ranked in both of queueTypes

              setIsSoloNull(false)
              setIsFlexNull(false)

              setPlayerSoloInfo({
                tier: data[solo].tier,
                rank: data[solo].rank,
                leaguePoints: data[solo].leaguePoints,
                wins: data[solo].wins,
                losses: data[solo].losses
              })

              setPlayerFlexInfo({
                tier: data[flex].tier,
                rank: data[flex].rank,
                leaguePoints: data[flex].leaguePoints,
                wins: data[flex].wins,
                losses: data[flex].losses
              })
            }else if(data.length === 1){

              // if data.length === 1 it means that player is ranked in one of queueTypes so we have to find out which one
              
              if(data[0].queueType === 'RANKED_SOLO_5x5'){
                setIsSoloNull(false)
                setIsFlexNull(true)

                setPlayerSoloInfo({
                  tier: data[0].tier,
                  rank: data[0].rank,
                  leaguePoints: data[0].leaguePoints,
                  wins: data[0].wins,
                  losses: data[0].losses
                })
              }else{
                setIsSoloNull(true)
                setIsFlexNull(false)

                setPlayerFlexInfo({
                  tier: data[0].tier,
                  rank: data[0].rank,
                  leaguePoints: data[0].leaguePoints,
                  wins: data[0].wins,
                  losses: data[0].losses
                })
              }
            }else{

              // if data.length === 0 it means player is not ranked in any queueType

              setIsSoloNull(true)
              setIsFlexNull(true)
            }

            switch(region){
              case 'eun1':
              case 'euw1':
              case 'tr1':
              case 'ru':
                general_region = 'europe'
                break;
              case 'kr':
              case 'jp1':
                general_region = 'asia'
                break;
              case 'na1':
              case 'la1':
              case 'la2':
              case 'br1':
              case 'oc1':
                general_region = 'americas'
                break;
              default: 
                break;

              // we are setting global routing values based on region
            }

            fetch(`/.netlify/functions/fetchallmatches?region=${general_region}&puuid=${puuid}&start=0`)
              .then(response => response.json())
              .then(data => {
                let index = data.length < 15 ? data.length : 15

                // we usually fetch last 15 matches but in case player has less than 15 we change it to number of matches he has

                let matches = data.slice(0, index)

                let matcheslinks = []

                for(let i = 0; i < matches.length; i++){
                  matcheslinks.push(`/.netlify/functions/fetchmatch?region=${general_region}&match=${matches[i]}`)

                  // we are pushing all matchesLinks so we can fetch them all at once
                }

                  Promise.all(matcheslinks.map(url =>
                  fetch(url)
                      .then(checkStatus)
                      .then(parseJSON)
                      .catch(error => {
                        handleError()
                      })
                  ))
                  .then(data => {
                    setMatchesinfo(data)
                    setReady(true)
                  })
                  .catch(error => {
                    handleError()
                  })

                  function checkStatus(response) {
                      if (response.ok) {
                          return Promise.resolve(response);
                      } else {
                          return Promise.reject(new Error(response.statusText));
                      }
                  }
          
                  function parseJSON(response) {
                      return response.json();
                  }   
              })
              .catch(error => {
                handleError();
              })
          })
          .catch(error => {
            handleError();
          })
      })
      .catch(error => {
        handleError();
      })
    }
  }, [region, username]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Header />
      <MobileNav active={isNavActive}/>
      <PlayerSection>
        <Helmet>
          <title>LoL Profile - {decodeURI(playerInfo[0])}</title>

          {/* we are decoding player name and putting it in title */}
        </Helmet>
        <ErrorScreen style={error} 
          p1='Please make sure you entered username correctly and that you have chosen the right region.'
          p2='Maybe the website exceeded its API limits.'
          p3='Please try again.'
          linkOrA='link'
          url='/'
        />
        <Container>
            <SummonerHeader
              playerInfo={playerInfo}
              ready={ready}
            />

            <div className={ready ? 'main-grid' : 'main-grid notReady'}>

              <div className="rank">
                  <Rank
                    ready={ready}
                    isRankNull={isSoloNull}
                    playerRankInfo={playerSoloInfo}
                  />

                  <Rank
                    ready={ready}
                    isRankNull={isFlexNull}
                    playerRankInfo={playerFlexInfo}
                  />
              </div>

              <div className="summoner-stats">
                <div className="bar">
                  <button onClick={() => {setActive('matches')}} className={active === 'matches' ? 'active' : ''}>Matches</button>
                  <button onClick={() => {setActive('mastery')}} className={active === 'mastery' ? 'active' : ''}>Mastery</button>

                  {/* we are adding class active based on which button is clicked */}
                </div>

                <div className="main-content">
                  <div className={active === 'matches' ? 'matches active' : 'matches'}>
                    <div className="match-block">
                      {ready ? null : 
                      <>
                        <div className="match"></div>
                        <div className="match"></div>
                        <div className="match"></div>

                        {/* we are displaying this skeleton divs (loading divs) in case ready is false */}
                      </>
                      }
                      {ready ? (handleZeroMatches()) : null}

                      {error === 'flex' ? null : matchesinfo.map(match => {
                        return(
                          <Match 
                            match={match}
                            region={region}
                            puuid={puuid}
                          />
                        )
                      })}
                    </div>
                  </div>
                    <div className={active === 'mastery' ? 'mastery active' : 'mastery'}>
                    {ready ? (handleZeroMastery()) : null}
                      <div className="grid">
                        {mastery.map(item =>{
                          return(
                            <MasteryCard
                              item={item}
                            />
                          )
                        })}
                      </div>
                    </div>
                </div>
              </div>
            </div>
        </Container>
      </PlayerSection>
    </>    
  )
}
