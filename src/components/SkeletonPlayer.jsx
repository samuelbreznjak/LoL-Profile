import React from 'react'

export default function SkeletonPlayer() {
  return (
    <tr className='skeleton' key={crypto.randomUUID()}>
        <td key={crypto.randomUUID()}>#</td>
        <td key={crypto.randomUUID()}>
            <p className='summoner'>Summoner</p>
        </td>
        <td key={crypto.randomUUID()}>1000</td>
        <td key={crypto.randomUUID()}>
            <div key={crypto.randomUUID()} className="winrate-container">
                <div key={crypto.randomUUID()} className="winrate" style={{ gridTemplateColumns: `50% 50%`}}>
                    <div key={crypto.randomUUID()} className="win">100</div>
                    <div key={crypto.randomUUID()} className="lose">100</div>
                </div>
                <div key={crypto.randomUUID()} className="wr">
                    <p key={crypto.randomUUID()}>50%</p>
                </div>
            </div>
        </td>
    </tr>
  )
}
