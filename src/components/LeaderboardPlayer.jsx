import React from 'react'
import { Link } from 'react-router-dom'

export default function LeaderboardPlayer({ rank, link, name, lp, winrate, losepercent, wins, losses }) {
  return (
    <tr key={crypto.randomUUID()}>
        <td key={crypto.randomUUID()}>{rank}</td>
        <td key={crypto.randomUUID()}>
            <Link className='link' to={link}> {name}</Link>
        </td>
        <td key={crypto.randomUUID()}>{lp}</td>
        <td key={crypto.randomUUID()}>
            <div key={crypto.randomUUID()} className="winrate-container">
                <div key={crypto.randomUUID()} className="winrate" style={{ gridTemplateColumns: `${winrate}% ${losepercent}%`}}>
                    <div key={crypto.randomUUID()} className="win">{wins}</div>
                    <div key={crypto.randomUUID()} className="lose">{losses}</div>
                </div>
                <div key={crypto.randomUUID()} className="wr">
                    <p key={crypto.randomUUID()}>{winrate}%</p>
                </div>
            </div>
        </td>
    </tr>
  )
}
