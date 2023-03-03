import React from 'react'

export default function MatchPlayer({ match, region, championLink, index }) {
  return (
    <div key={crypto.randomUUID()} className='player'>
        <img key={crypto.randomUUID()} className='champion' src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${championLink(match.info.participants[index].championName)}.png`} alt="champion" />
        <a className='link' href={`/summoner/${region}/${match.info.participants[index].summonerName}`}>{match.info.participants[index].summonerName}</a>
    </div>
  )
}
