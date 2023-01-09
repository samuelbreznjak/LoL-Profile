import React, { useState, useEffect, useContext } from 'react'
import Header from '../components/Header'
import { Container } from '../components/styled/Container.styled'
import { PlayerSection } from '../components/styled/Player.styled'
import { queueIdArray, summonerSpell, runes, champions, championsLink } from '../data/data'
import { NavbarContext } from '../contexts/NavbarContext'
import m1 from '../media/img/m1.png'
import m2 from '../media/img/m2.png'
import m3 from '../media/img/m3.png'
import m4 from '../media/img/m4.png'
import m5 from '../media/img/m5.png'
import m6 from '../media/img/m6.png'
import m7 from '../media/img/m7.png'
import ErrorScreen from '../components/ErrorScreen'
import MobileNav from '../components/MobileNav'
import { Helmet } from 'react-helmet'

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
  const [buttonText, setbuttonText] = useState('Copy profile link')

  const [ready, setReady] = useState(false)
  const [error, setError] = useState('none')

  // FUNCTIONS
  
  let getGameMode = (queueID) => {
    let target = queueIdArray.find((e) => e.queueId === queueID)

    if(target === null || target === undefined){
      return 'Normal'
    }else{
      return target.description
    }

    // sometimes when we are fetching match info, we dont't get gamemode so we set it to normal.
  }

  let championLink = (champion) => {
    if(champion === 'FiddleSticks'){
      return 'Fiddlesticks'
    }else{
      return champion;
    }

    // switch(champion){
    //   case "FiddleSticks":
    //     return "Fiddlesticks"
    //   default:
    //     return champion;
    // }

    // Disclaimer: we will be using switch in case more champions have broken image link like Fiddlesticks

    // in case we need image link for champion Fiddlesticks we change champion link
  }

  let handleGameMinutes = (gameDuration, seconds) => {
    if(!seconds){
      gameDuration = gameDuration / 1000
    }
    return Math.floor(gameDuration / 60)

    // gameDuration can be either expressed in seconds or in miliseconds

    // if seconds is true gameDuration is expressed in seconds, and if it's false gameDuration is expressed in miliseconds
  }

  let handleGameSeconds = (gameDuration, seconds) => {
    if(!seconds){
      gameDuration = gameDuration / 1000;
    }
    return (gameDuration % 60).toFixed(0) > 9 ? (gameDuration % 60).toFixed(0) : '0' + (gameDuration % 60).toFixed(0)

    // same as previous function but we are adding 0 to the left in case seconds are single digit value
  }

  let handleWhenWasPlayed = (gameDate) => {
    if(gameDate === undefined){
      return ''
    }

    let matchDate = new Date(gameDate);
    let currentDate = new Date();
    let diffTime = Math.abs(currentDate - matchDate);

    let diffYears = Math.round(diffTime / (1000 * 60 * 60 * 24 * 7 * 4.3 * 12));
    let diffMonths = Math.round(diffTime / (1000 * 60 * 60 * 24 * 7 * 4.3));
    let diffWeeks = Math.round(diffTime / (1000 * 60 * 60 * 24 * 7));
    let diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    let diffHours = Math.round(diffTime / (1000 * 60 * 60));
    let diffMinutes = Math.round(diffTime / (1000 * 60));
    let diffSeconds = Math.round(diffTime / (1000));

    // we are subtracting current date by matchDate so we can get time difference
    
    if(diffYears > 0 && diffMonths > 11){
      if(diffYears === 1){
        return 'a year ago';
      }
    }else if(diffMonths > 0 && diffWeeks > 4){
      if(diffMonths === 1){
        return 'a month ago'
      }else{
        return `${diffMonths} months ago`
      }
    }else if(diffWeeks > 0 && diffDays > 6){
      if(diffWeeks === 1){
        return 'a week ago'
      }else{
        return `${diffWeeks} weeks ago`
      }
    }else if(diffDays > 0 && diffHours > 23){
      if(diffDays === 1){
        return 'a day ago'
      }else{
        return `${diffDays} days ago`
      }
    }else if(diffHours > 0 && diffMinutes > 59){
      if(diffHours === 1){
        return 'an hour ago'
      }else{
        return `${diffHours} hours ago`
      }
    }else if(diffMinutes > 0){
      if(diffMinutes === 1){
        return 'a minute ago'
      }else{
        return `${diffMinutes} minutes ago`
      }
    }else{
      if(diffSeconds === 1){
        return 'a second ago'
      }else{
        return `${diffSeconds} seconds ago`
      }
    }
  }

  let copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.toString())
    setbuttonText('Copied')
  }

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
            {/* we are adding 'notReady' class if all data is not loaded (ready is false) so divs are getting displayed like skeletons (loading div)*/}

            <div className={ready ? 'summoner' : 'summoner notReady'}>
              <div className="pfp" style={{ backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/${playerInfo[1]}.png)` }}>
                <div className="level">
                  <p>{playerInfo[2]}</p>
                </div>
              </div>
              <div className="name">
                <h1>{playerInfo[0]}</h1>
              </div>

              <button id='copy' disabled={!ready} onClick={copyProfileLink}>{ready ? buttonText : ""}</button>

            </div>
            <div className={ready ? 'main-grid' : 'main-grid notReady'}>
              <div className="rank">
                  <div className="solo">
                    <div className="heading" style={{ borderRadius: isSoloNull ? '10px' : null }}>
                      {ready ? 
                      <>
                        <h4>Ranked solo</h4>

                        {isSoloNull ? <p>Unranked</p> : null}

                        {/* if player is unranked in solo we display unranked */}
                      </> : null}
                    </div>
                    {ready ? <>
                      {!isSoloNull ? <div className="main-rank">
                      <div className='rank-wrapper'>
                        <div className="img">
                          <img src={`https://static.bigbrain.gg/assets/lol/s12_rank_icons/${(playerSoloInfo.tier).toLowerCase()}.png`} alt="rank-icon" width={60} />
                        </div>
                        <div className="rank-and-lp">
                            <h4>{playerSoloInfo.tier.charAt(0) + playerSoloInfo.tier.slice(1).toLowerCase()} {playerSoloInfo.rank}</h4>
                            <p>{playerSoloInfo.leaguePoints} LP</p>

                            {/* we are capitalizing rank name */}
                        </div>
                      </div>
                      <div className="winlose">
                          <p className='wl'>{playerSoloInfo.wins}W {playerSoloInfo.losses}L</p>
                          <p>Win Rate {((playerSoloInfo.wins / (playerSoloInfo.wins + playerSoloInfo.losses)) * 100).toFixed(0)}%</p>
                      </div>
                      </div> : null}

                      {/* we are calculating wins, losses and winrate */}
                    </> : null}
                  </div>
                  <div className="flex">
                    <div className="heading" style={{ borderRadius: isFlexNull ? '10px' : null }}>
                        {ready ? 
                          <>
                            <h4>Ranked flex</h4>

                            {isFlexNull ? <p>Unranked</p> : null}

                            {/* if player is unranked in flex we display unranked */}
                          </> : null
                        }
                      </div>
                      {ready ? <>
                        {!isFlexNull ? <div className="main-rank">
                        <div className='rank-wrapper'>
                          <div className="img">
                            <img src={`https://static.bigbrain.gg/assets/lol/s12_rank_icons/${(playerFlexInfo.tier).toLowerCase()}.png`} alt="rank-icon" width={60} />
                          </div>
                          <div className="rank-and-lp">
                              <h4>{playerFlexInfo.tier.charAt(0) + playerFlexInfo.tier.slice(1).toLowerCase()} {playerFlexInfo.rank}</h4>
                              <p>{playerFlexInfo.leaguePoints} LP</p>

                              {/* we are capitalizing rank name */}
                          </div>
                        </div>
                        <div className="winlose">
                            <p className='wl'>{playerFlexInfo.wins}W {playerFlexInfo.losses}L</p>
                            <p>Win Rate {((playerFlexInfo.wins / (playerFlexInfo.wins + playerFlexInfo.losses)) * 100).toFixed(0)}%</p>
                        </div>
                      </div> : null}

                      {/* we are calculating wins, losses and winrate */}
                      </> : null}
                  </div>
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
                        // we are calculating match values 

                        let summonerIndex = match.metadata.participants.indexOf(puuid)
                        let won = match.info.participants[summonerIndex].win
                        let seconds = match.info.gameEndTimestamp !== undefined;
                        let remake = !seconds ? match.info.gameDuration < 211000 : match.info.gameDuration < 211;
                        let deaths;
                        let cs = match.info.participants[summonerIndex].totalMinionsKilled + match.info.participants[summonerIndex].neutralMinionsKilled
                        let summoner1 = match.info.participants[summonerIndex].summoner1Id;
                        let summoner2 = match.info.participants[summonerIndex].summoner2Id;

                        if(summoner1 > 100){
                          summoner1 = 4
                        }
                        
                        if(summoner2 > 100){
                          summoner2 = 14
                        }

                        // if summoner ids are over 100 (it means they are undefined) we will set it to 4, 14 (defined values)

                        let rune1 = match.info.participants[summonerIndex].perks.styles[0].selections[0].perk;
                        let rune2 = match.info.participants[summonerIndex].perks.styles[1].style;
                        
                        if(match.info.participants[summonerIndex].deaths === 0){
                          deaths = 1;

                          // we set deaths to 1 if deaths is 0 so we can calculate kda (kills + assists) / deaths
                        }else{
                          deaths = match.info.participants[summonerIndex].deaths;
                        }

                        let gameDate = match.info.gameEndTimestamp;

                        return(
                          // basically inside return most of code is self explanatory

                          // we are entering data we calculated above

                          <div key={crypto.randomUUID()} className={remake ? 'match remake' : won ? 'match win' : 'match loss'}>
                            <div key={crypto.randomUUID()} className="metadata">
                              <h4 key={crypto.randomUUID()} className='gamemode'>{getGameMode(match.info.queueId)}</h4>
                              <p key={crypto.randomUUID()} className='played-before'>{handleWhenWasPlayed(gameDate)}</p>
                              <div key={crypto.randomUUID()} className="metadata-info">
                                <p key={crypto.randomUUID()} className='win-or-lose'>{remake ? 'Remake' : won ? 'Victory' : 'Defeat'}</p> <p>{handleGameMinutes(match.info.gameDuration, seconds)}:{handleGameSeconds(match.info.gameDuration, seconds)}</p>
                              </div>
                            </div>

                            <div key={crypto.randomUUID()} className="champion-info">
                              <div key={crypto.randomUUID()} className="champion" style={{ backgroundImage: `url('http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${championLink(match.info.participants[summonerIndex].championName)}.png')` }}>
                                <div key={crypto.randomUUID()} className="champion-level">
                                  <p key={crypto.randomUUID()}>{match.info.participants[summonerIndex].champLevel}</p>
                                </div>
                              </div>
                              <div key={crypto.randomUUID()} className="champion-perks">
                                <img key={crypto.randomUUID()} src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/${summonerSpell[`${summoner1}`]}`} alt="summoner" />
                                <div key={crypto.randomUUID()} className="champion-perk-placeholder">
                                  <img key={crypto.randomUUID()} src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/${runes[`${rune1}`]}`} alt="rune" />
                                </div>
                                <img key={crypto.randomUUID()} src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/${summonerSpell[`${summoner2}`]}`} alt="summoner" />
                                <div key={crypto.randomUUID()} className="champion-perk-placeholder">
                                  <img key={crypto.randomUUID()} src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/${runes[`${rune2}`]}`} alt="rune" />
                                </div>
                              </div>
                            </div>

                            <div key={crypto.randomUUID()} className="game-stats">
                              <div key={crypto.randomUUID()} className="score">
                                <b key={crypto.randomUUID()}>{match.info.participants[summonerIndex].kills}</b>
                                <span key={crypto.randomUUID()}>/</span>
                                <b key={crypto.randomUUID()}>{match.info.participants[summonerIndex].deaths}</b>
                                <span key={crypto.randomUUID()}>/</span>
                                <b key={crypto.randomUUID()}>{match.info.participants[summonerIndex].assists}</b>
                              </div>
                              <div key={crypto.randomUUID()} className='kda'>
                                <b key={crypto.randomUUID()}>{((match.info.participants[summonerIndex].kills + match.info.participants[summonerIndex].assists) / deaths).toFixed(1)}</b><p>KDA</p>
                              </div>
                              <p className='cs' key={crypto.randomUUID()}>{cs} CS ({(cs / (match.info.gameDuration / (!seconds ? 60000 : 60))).toFixed(1)})</p>
                            </div>

                            <div className="all-items">
                              {/* if item id === 0 it means that that item slot is empty so we return item-placeholder */}
                              
                              { match.info.participants[summonerIndex].item0 === 0 ? <div key={crypto.randomUUID()} className="item-placeholder"></div> : <img key={crypto.randomUUID()} src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/item/${match.info.participants[summonerIndex].item0}.png`} alt="item" /> }
                              { match.info.participants[summonerIndex].item1 === 0 ? <div key={crypto.randomUUID()} className="item-placeholder"></div> : <img key={crypto.randomUUID()} src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/item/${match.info.participants[summonerIndex].item1}.png`} alt="item" /> }
                              { match.info.participants[summonerIndex].item2 === 0 ? <div key={crypto.randomUUID()} className="item-placeholder"></div> : <img key={crypto.randomUUID()} src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/item/${match.info.participants[summonerIndex].item2}.png`} alt="item" /> }
                              { match.info.participants[summonerIndex].item3 === 0 ? <div key={crypto.randomUUID()} className="item-placeholder"></div> : <img key={crypto.randomUUID()} src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/item/${match.info.participants[summonerIndex].item3}.png`} alt="item" /> }
                              { match.info.participants[summonerIndex].item4 === 0 ? <div key={crypto.randomUUID()} className="item-placeholder"></div> : <img key={crypto.randomUUID()} src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/item/${match.info.participants[summonerIndex].item4}.png`} alt="item" /> }
                              { match.info.participants[summonerIndex].item5 === 0 ? <div key={crypto.randomUUID()} className="item-placeholder"></div> : <img key={crypto.randomUUID()} src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/item/${match.info.participants[summonerIndex].item5}.png`} alt="item" /> }
                              { match.info.participants[summonerIndex].item6 === 0 ? <div key={crypto.randomUUID()} className="item-placeholder"></div> : <img key={crypto.randomUUID()} className='ward' src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/item/${match.info.participants[summonerIndex].item6}.png`} alt="item" /> }
                              <div className="item-placeholder"></div>
                            </div>

                            <div key={crypto.randomUUID()} className="all-summoners">
                              <div key={crypto.randomUUID()} className="team">
                                <div key={crypto.randomUUID()} className='player'>
                                  <img key={crypto.randomUUID()} className='champion' src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${championLink(match.info.participants[0].championName)}.png`} alt="champion" />
                                  <a className='link' href={`/summoner/${region}/${match.info.participants[0].summonerName}`}>{match.info.participants[0].summonerName}</a>
                                </div>

                                <div key={crypto.randomUUID()} className='player'>
                                  <img key={crypto.randomUUID()} className='champion' src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${championLink(match.info.participants[1].championName)}.png`} alt="champion" />
                                  <a className='link' href={`/summoner/${region}/${match.info.participants[1].summonerName}`}>{match.info.participants[1].summonerName}</a>
                                </div>

                                <div key={crypto.randomUUID()} className='player'>
                                  <img key={crypto.randomUUID()} className='champion' src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${championLink(match.info.participants[2].championName)}.png`} alt="champion" />
                                  <a className='link' href={`/summoner/${region}/${match.info.participants[2].summonerName}`}>{match.info.participants[2].summonerName}</a>
                                </div>

                                <div key={crypto.randomUUID()} className='player'>
                                  <img key={crypto.randomUUID()} className='champion' src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${championLink(match.info.participants[3].championName)}.png`} alt="champion" />
                                  <a className='link' href={`/summoner/${region}/${match.info.participants[3].summonerName}`}>{match.info.participants[3].summonerName}</a>
                                </div>

                                <div key={crypto.randomUUID()} className='player'>
                                  <img key={crypto.randomUUID()} className='champion' src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${championLink(match.info.participants[4].championName)}.png`} alt="champion" />
                                  <a className='link' href={`/summoner/${region}/${match.info.participants[4].summonerName}`}>{match.info.participants[4].summonerName}</a>
                                </div>
                              </div>

                              <div key={crypto.randomUUID()} className="team">
                                <div key={crypto.randomUUID()} className='player'>
                                  <img key={crypto.randomUUID()} className='champion' src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${championLink(match.info.participants[5].championName)}.png`} alt="champion" />
                                  <a className='link' href={`/summoner/${region}/${match.info.participants[5].summonerName}`}>{match.info.participants[5].summonerName}</a>
                                </div>

                                <div key={crypto.randomUUID()} className='player'>
                                  <img key={crypto.randomUUID()} className='champion' src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${championLink(match.info.participants[6].championName)}.png`} alt="champion" />
                                  <a className='link' href={`/summoner/${region}/${match.info.participants[6].summonerName}`}>{match.info.participants[6].summonerName}</a>
                                </div>

                                <div key={crypto.randomUUID()} className='player'>
                                  <img key={crypto.randomUUID()} className='champion' src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${championLink(match.info.participants[7].championName)}.png`} alt="champion" />
                                  <a className='link' href={`/summoner/${region}/${match.info.participants[7].summonerName}`}>{match.info.participants[7].summonerName}</a>
                                </div>

                                <div key={crypto.randomUUID()} className='player'>
                                  <img key={crypto.randomUUID()} className='champion' src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${championLink(match.info.participants[8].championName)}.png`} alt="champion" />
                                  <a className='link' href={`/summoner/${region}/${match.info.participants[8].summonerName}`}>{match.info.participants[8].summonerName}</a>
                                </div>

                                <div key={crypto.randomUUID()} className='player'>
                                  <img key={crypto.randomUUID()} className='champion' src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${championLink(match.info.participants[9].championName)}.png`} alt="champion" />
                                  <a className='link' href={`/summoner/${region}/${match.info.participants[9].summonerName}`}>{match.info.participants[9].summonerName}</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                    <div className={active === 'mastery' ? 'mastery active' : 'mastery'}>
                    {ready ? (handleZeroMastery()) : null}
                      <div className="grid">
                        {mastery.map(item =>{
                          return(
                            <div key={crypto.randomUUID()} className='card'>
                              <img key={crypto.randomUUID()} width={70} src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${championsLink[`${item.championId}`]}.png`} alt="champion" />
                              <p key={crypto.randomUUID()} className='championname'>{champions[`${item.championId}`]}</p>
                              <img key={crypto.randomUUID()} className='masterypic' width={60} src={item.championLevel === 7 ? m7 : item.championLevel === 6 ? m6 : item.championLevel === 5 ? m5 : item.championLevel === 4 ? m4 : item.championLevel === 3 ? m3 : item.championLevel === 2 ? m2 : m1} alt="mastery level" />
                              <p key={crypto.randomUUID()} className='masterypoints'>{item.championPoints}</p>
                            </div>
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
