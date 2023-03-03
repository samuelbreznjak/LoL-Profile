import React from 'react'
import ChampionPfpRunes from './ChampionPfpRunes'
import MatchMetadata from './MatchMetadata'
import MatchPlayer from './MatchPlayer'

export default function Match({ match, region, puuid }) {

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

let summonerIndex = match.metadata.participants.indexOf(puuid)
let won = match.info.participants[summonerIndex].win
let seconds = match.info.gameEndTimestamp !== undefined;
let remake = !seconds ? match.info.gameDuration < 211000 : match.info.gameDuration < 211;
let deaths;
let cs = match.info.participants[summonerIndex].totalMinionsKilled + match.info.participants[summonerIndex].neutralMinionsKilled

if(match.info.participants[summonerIndex].deaths === 0){
    deaths = 1;

    // we set deaths to 1 if deaths is 0 so we can calculate kda (kills + assists) / deaths
}else{
    deaths = match.info.participants[summonerIndex].deaths;
}

    return(
        // basically inside return most of code is self explanatory

        // we are entering data we calculated above

        <div key={crypto.randomUUID()} className={remake ? 'match remake' : won ? 'match win' : 'match loss'}>
            <MatchMetadata 
                match={match}
                remake={remake}
                won={won}
                seconds={seconds}
            />

            <ChampionPfpRunes
                summonerIndex={summonerIndex}
                match={match}
                championLink={championLink}
            />

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
                    <MatchPlayer 
                        match={match} region={region}
                        championLink={championLink} index={0}
                    />

                    <MatchPlayer 
                        match={match} region={region}
                        championLink={championLink} index={1}
                    />

                    <MatchPlayer 
                        match={match} region={region}
                        championLink={championLink} index={3}
                    />

                    <MatchPlayer 
                        match={match} region={region}
                        championLink={championLink} index={4}
                    />

                    <MatchPlayer 
                        match={match} region={region}
                        championLink={championLink} index={4}
                    />
                </div>

                <div key={crypto.randomUUID()} className="team">
                    <MatchPlayer 
                        match={match} region={region}
                        championLink={championLink} index={5}
                    />

                    <MatchPlayer 
                        match={match} region={region}
                        championLink={championLink} index={6}
                    />

                    <MatchPlayer 
                        match={match} region={region}
                        championLink={championLink} index={7}
                    />

                    <MatchPlayer 
                        match={match} region={region}
                        championLink={championLink} index={8}
                    />

                    <MatchPlayer 
                        match={match} region={region}
                        championLink={championLink} index={9}
                    />
                </div>
            </div>
        </div>
    )
}
