import React from 'react'
import { summonerSpell, runes } from '../data/data';

export default function ChampionPfpRunes({ summonerIndex, match, championLink }) {

let rune1 = match.info.participants[summonerIndex].perks.styles[0].selections[0].perk;
let rune2 = match.info.participants[summonerIndex].perks.styles[1].style;

let summoner1 = match.info.participants[summonerIndex].summoner1Id;
let summoner2 = match.info.participants[summonerIndex].summoner2Id;

if(summoner1 > 100){
    summoner1 = 4
}

if(summoner2 > 100){
    summoner2 = 14
}

  return (
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
  )
}
