import React, { useEffect, useState, useContext } from 'react'
import Header from '../components/Header'
import { Container } from '../components/styled/Container.styled'
import { LeaderboardSection } from '../components/styled/Leaderboard.styled'
import ErrorScreen from '../components/ErrorScreen'
import { NavbarContext } from '../contexts/NavbarContext'
import MobileNav from '../components/MobileNav'
import { Helmet } from 'react-helmet'
import LeaderboardPlayer from '../components/LeaderboardPlayer'
import SkeletonPlayer from '../components/SkeletonPlayer'

export default function Leaderboard() {
  const {isNavActive, setIsNavActive} = useContext(NavbarContext)

  const [region, setRegion] = useState('eun1')
  const [players, setPlayers] = useState([])
  const [skeletonItems, setSkeletonItems] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])

  // we are using skeletonItems to display a tr (loading animation) for each item in array, until leaderboard is loaded 

  const [error, setError] = useState('none')
  
  useEffect(() => {
    setIsNavActive(false)
    document.body.style.overflowY = 'auto'
    fetch(`/.netlify/functions/fetchleaderboard?region=${region}`)
        .then(response => response.json())
        .then(data => {
            setPlayers(data.entries)
            setSkeletonItems([])

            // we are setting skeleton items to an empty array, so it doesnt display any skeleton tr (loading animation)
        })
        .catch(error => {
            setError('flex')
            document.body.style.overflowY = 'hidden'

            // in case something goes wrong we are changing display of error div to flex, and changing overflow to hidden (so user can't scroll)
        })
  }, [region])// eslint-disable-line react-hooks/exhaustive-deps

  // setIsNavActive(false) closes mobileNav

  let compare = (a, b) => {
    if (a.leaguePoints < b.leaguePoints){
        return 1;
    }
    if (a.leaguePoints > b.leaguePoints){
        return -1;
    }
    return 0;
  }

  // compare function is sorting players based on their leaguePoints property

  return (
    <>
        <Header />
        <MobileNav active={isNavActive}/>
        <LeaderboardSection>
            <Helmet>
            <title>LoL Profile - Leaderboard</title>
            </Helmet>
            <ErrorScreen style={error} 
                p1='Website exceeded its API limits.'
                p2='Please try again.'
                p3=''
                linkOrA='a'
                url='/leaderboard'
            />
            <Container>
                <div className="heading">
                    <h1>Leaderboard</h1>
                </div>

                <div className="dropdown">
                    <h3>Region: </h3>
                    <select
                    onChange={e => {
                        setRegion(e.target.value)
                        setSkeletonItems([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
                        setPlayers([])

                        // when user change dropdown value, we change region to target value, and we call useEffect because dependency array

                        // we are setting skeletonItems array to 20 items so skeleton tr (loading tr) gets displayed

                        // and we set players to an empty array so all previous players (from previous region) is getting removed
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

                    <br />
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Summoner name</th>
                            <th>LP</th>
                            <th>Win %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.sort(compare).map(player => {
                            let winrate = ((player.wins / (player.wins + player.losses)) * 100).toFixed(0)
                            let losepercent = 100 - winrate;

                            // players gets sorted by compare function, and we are calculating winrate

                            return( 
                                <LeaderboardPlayer
                                    rank={players.indexOf(player) + 1}
                                    link={`../summoner/${region}/${player.summonerName}`}
                                    name={player.summonerName}
                                    lp={player.leaguePoints}
                                    winrate={winrate}
                                    losepercent={losepercent}
                                    wins={player.wins}
                                    losses={player.losses}
                                />
                            )
                        })}

                        {skeletonItems.map(skeleton => {
                            return(
                                <SkeletonPlayer key={crypto.randomUUID()} />
                            )
                        })}
                    </tbody>
                </table>
                <div className="margin"></div>
            </Container>
        </LeaderboardSection>
    </>
  )
}
