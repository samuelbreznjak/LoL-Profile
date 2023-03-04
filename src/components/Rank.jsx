import React from 'react'

export default function Rank({ ready, isRankNull, playerRankInfo, queue }) {
  return (
    <div className="solo">
        <div className="heading" style={{ borderRadius: isRankNull ? '10px' : null }}>
            {ready ? 
            <>
            <h4>Ranked {queue}</h4>

            {isRankNull ? <p>Unranked</p> : null}

            {/* if player is unranked in solo we display unranked */}
            </> : null}
        </div>
        {ready ? <>
            {!isRankNull ? 
            <div className="main-rank">
                <div className='rank-wrapper'>
                    <div className="img">
                        <img src={`https://static.bigbrain.gg/assets/lol/s12_rank_icons/${(playerRankInfo.tier).toLowerCase()}.png`} alt="rank-icon" width={60} />
                    </div>
                    <div className="rank-and-lp">
                        <h4>{playerRankInfo.tier.charAt(0) + playerRankInfo.tier.slice(1).toLowerCase()} {playerRankInfo.rank}</h4>
                        <p>{playerRankInfo.leaguePoints} LP</p>

                        {/* we are capitalizing rank name */}
                    </div>
                </div>
                <div className="winlose">
                    <p className='wl'>{playerRankInfo.wins}W {playerRankInfo.losses}L</p>
                    <p>Win Rate {((playerRankInfo.wins / (playerRankInfo.wins + playerRankInfo.losses)) * 100).toFixed(0)}%</p>
                </div>
            </div> : null}

            {/* we are calculating wins, losses and winrate */}
        </> : null}
    </div>
  )
}