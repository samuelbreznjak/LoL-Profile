import React from 'react'
import m1 from '../media/img/m1.png'
import m2 from '../media/img/m2.png'
import m3 from '../media/img/m3.png'
import m4 from '../media/img/m4.png'
import m5 from '../media/img/m5.png'
import m6 from '../media/img/m6.png'
import m7 from '../media/img/m7.png'
import { champions, championsLink } from '../data/data'

export default function MasteryCard({ item }) {
  return (
    <div key={crypto.randomUUID()} className='card'>
        <img key={crypto.randomUUID()} width={70} src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${championsLink[`${item.championId}`]}.png`} alt="champion" />
        <p key={crypto.randomUUID()} className='championname'>{champions[`${item.championId}`]}</p>
        <img key={crypto.randomUUID()} className='masterypic' width={60} src={item.championLevel === 7 ? m7 : item.championLevel === 6 ? m6 : item.championLevel === 5 ? m5 : item.championLevel === 4 ? m4 : item.championLevel === 3 ? m3 : item.championLevel === 2 ? m2 : m1} alt="mastery level" />
        <p key={crypto.randomUUID()} className='masterypoints'>{item.championPoints}</p>
    </div>
  )
}
