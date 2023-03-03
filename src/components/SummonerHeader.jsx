import React, { useState } from 'react'

export default function SummonerHeader({ playerInfo, ready }) {

const [buttonText, setbuttonText] = useState('Copy profile link')

let copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.toString())
    setbuttonText('Copied')
}

  return (
    <div className={ready ? 'summoner' : 'summoner notReady'}>
        {/* we are adding 'notReady' class if all data is not loaded (ready is false) so divs are getting displayed like skeletons (loading div) */}

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
  )
}
