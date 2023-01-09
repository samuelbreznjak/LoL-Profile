import styled from "styled-components";

export const PlayerSection = styled.div`
    padding: 70px 0;

    .notification{
        position: fixed;
        bottom: -32px;
        left: 0;
        z-index: 15;
        width: 100%;
        display: flex;
        justify-content: center;
        transition: 0.3s all;

        &.active{
            bottom: 30px;
        }

        div{
            padding: 5px 30px;
            border: 1px solid white;
            background-color: #1c1c1e;
        }
    }

    .summoner{
        width: max-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto;

        .pfp{
            width: 150px;
            height: 150px;
            margin-bottom: 30px;
            position: relative;
            background-position: center;
            background-size: cover;

            .level{
                position: absolute;
                bottom: -15px;
                width: 100%;
                display: flex;
                justify-content: center;

                p{
                    background-color: #31313b;
                    width: max-content;
                    padding: 5px 11px;
                    border-radius: 10px;
                }
            }
        }

        button{
            font-family: inherit;
            background-color: #5382e9;
            border: none;
            color: white;
            padding: 10px 0;
            font-size: 20px;
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.5s;
            margin-top: 30px;
            width: 192px;
        }
    }

    .notReady{
        .pfp{
            background-image: linear-gradient(
                to right,
                #31313b 0%,
                #1c1c1e 20%,
                #31313b 40%,
                #31313b 100%
            ) !important;
            background-size: 200% 100%;
            animation: bgPos 1s linear infinite;
        }

        .level{
            p{
                color: #31313b;
            }
        }

        .name{
            background-image: linear-gradient(
                to right,
                #31313b 0%,
                #1c1c1e 20%,
                #31313b 40%,
                #31313b 100%
            ) !important;
            background-size: 200% 100%;
            animation: bgPos 1s linear infinite;
            width: 157px;
            height: 39px;

            h1{
                display: none;
            }
        }

        #copy{
            background-image: linear-gradient(
                to right,
                #31313b 0%,
                #1c1c1e 20%,
                #31313b 40%,
                #31313b 100%
            ) !important;
            background-size: 200% 100%;
            animation: bgPos 1s linear infinite;

            background-color: #5382e9;
            width: 192px;
            height: 44px;

            &:hover{
                background-color: unset;
                color: unset;
            }
        }

        .main-content{
            min-height: 500px;
        }

        .bar{
            border-radius: 0px !important;

            button{
                display: none;
            }
        }

        .match{
            background-image: linear-gradient(
                to right,
                #31313b 0%,
                #1c1c1e 20%,
                #31313b 40%,
                #31313b 100%
            ) !important;
            background-size: 200% 100%;
            animation: bgPos 1s linear infinite;
            height: 124px;

            &:nth-child(1){
                margin-top: 36px;
            }
        }

        .flex, .solo{
            .heading{
                background-image: linear-gradient(
                    to right,
                    #31313b 0%,
                    #1c1c1e 20%,
                    #31313b 40%,
                    #31313b 100%
                ) !important;
                background-size: 200% 100%;
                animation: bgPos 1.5s linear infinite;
                height: 51px;
            }
        }

        /* .match{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            padding: 20px 30px;
            border-radius: 10px;
            margin-bottom: 20px;

            &:last-of-type{
                margin-bottom: 0px;
            }

            &.win{
                background-color: #28344e;
                border: 2px solid #5382e8;

                & .item-placeholder{
                    background-color: #3d4f76;
                }
            }

            &.loss{
                background-color: #59343b;
                border: 2px solid #E84057;

                & .item-placeholder{
                    background-color: #814b55;
                }
            }

            &.remake{
                background-color: #515161;
                border: 2px solid #9090a2;

                & .item-placeholder{
                    background-color: #9090a2;
                }
            }

            .metadata{
                width: 95px;
                text-align: center;
                font-size: 14px;

                .gamemode,.played-before, .metadata-info{
                    color: transparent;
                    background-color: #31313b;
                }
                
                .gamemode{
                    margin-bottom: 5px;
                }

                .played-before{
                    font-size: 12px;
                }
                
                .metadata-info{
                    margin-top: 10px;
                    p{
                        display: inline;
                    }

                    .win-or-lose{
                        font-weight: 600;
                    }
                }
            }

            .champion-info{
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;

                .champion{
                    background-color: #31313b;
                    background-size: contain;
                    width: 56px;
                    height: 56px;
                    position: relative;

                    .champion-level{
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        font-size: 12px;
                        background-color: #1c1c1e;
                        width: 18px;
                        height: 18px;
                        display: grid;
                        place-items: center;
                    }
                }

                .champion-perks{
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2px;

                    &>*{
                        color: transparent;
                        background-color: #31313b;
                    }

                    .champion-perk-placeholder{
                        display: grid;
                        place-items: center;
                    }

                        img{
                            width: 27px;
                            height: 27px;
                        }
                    }
            }

            .game-stats{
                text-align: center;

                .score{
                    color: transparent;
                    background-color: #31313b;
                    b{
                        margin: 0 5px;
                    }
                }

                .kda{
                    color: transparent;
                    background-color: #31313b;
                    margin: 5px 0;
                    p{
                        display: inline;
                        margin-left: 5px;
                    }
                }

                p{
                    color: transparent;
                    background-color: #31313b;
                }
            }

            .all-items{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                gap: 2px;

                &>*{
                    width: 27px;
                    height: 27px;
                }

                .item-placeholder{
                    order: 10;
                    color: transparent;
                    background-color: #31313b !important;
                }

                img{
                    order: 1;
                }

                .ward{
                    grid-row: 1/2;
                    grid-column: 4/5;
                }
            }

            .all-summoners{
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;

                .player{
                    display: flex;
                    align-items: center;

                    .champion{
                        width: 14px;
                        height: 14px;
                        margin-right: 5px;
                    }

                    .link{
                        color: transparent !important;
                        background-color: #31313b;
                        text-decoration: none;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        width: 90px;
                        max-width: 90px;
                        font-size: 13px;

                        &:hover{
                            text-decoration: underline;
                        }
                    }
                }
            }
        }  */
    }

    @keyframes bgPos {
        0% {
            background-position: 50% 0;
        }

        100% {
            background-position: -150% 0;
        }
    }

    .main-grid{
        display: grid;
        grid-template-columns: 350px auto;
        padding-top: 70px;
        gap: 30px;

        .heading, .main-rank{
            background-color: #31313b;
            padding: 15px;
        }

        .heading{
            border-radius: 10px 10px 0 0;
            padding: 15px;
            border-bottom: 1px solid #1c1c1e;
            display: flex;
            justify-content: space-between;
        }

        .solo{
            margin-bottom: 30px;
        }

        .main-rank{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            color: #7b7a8e;
            border-radius: 0 0 10px 10px ;

            .rank-wrapper{
                display: flex;
                align-items: center;

                img{
                    position: relative;
                }

                .rank-and-lp{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-left: 20px;
                    height: 100%;

                    h4{
                        font-size: 17px;
                        margin-bottom: 12px;
                        color: white;
                    }
                }
            }

            .winlose{
                font-size: 12px;
                text-align: right;

                .wl{
                    margin-bottom: 12px;
                }
            }
        }

        .summoner-stats{
            .bar{
                background-color: #31313b;
                padding: 15px 20px 0 20px;
                border-radius: 10px 10px 0 0;

                button{
                    background-color: transparent;
                    color: white;
                    font-family: inherit;
                    border: none;
                    cursor: pointer;
                    font-size: 16px;
                    margin-right: 30px;
                    padding-bottom: 15px;

                    &.active{
                        border-bottom: 2px solid white;
                    }
                }
            }

            .main-content{
                padding: 25px 20px 20px 20px;
                border-radius: 0 0 10px 10px;
                background-color: #31313b;

                .matches, .mastery{
                    display: none;

                    &.active{
                        display: block;
                    }
                }

                .matches{
                    .match{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 14px;
                        padding: 20px 30px;
                        border-radius: 10px;
                        margin-bottom: 20px;
                        transition: all 0.5s;

                        &:last-of-type{
                            margin-bottom: 0px;
                        }

                        &.win{
                            background-color: #28344e;
                            border: 2px solid #5382e8;

                            & .item-placeholder{
                                background-color: #3d4f76;
                            }

                            &:hover{
                                background-color: #344465;
                            }
                        }

                        &.loss{
                            background-color: #59343b;
                            border: 2px solid #E84057;

                            & .item-placeholder{
                                background-color: #814b55;
                            }

                            &:hover{
                                background-color: #70424b;
                            }
                        }

                        &.remake{
                            background-color: #515161;
                            border: 2px solid #9090a2;

                            & .item-placeholder{
                                background-color: #9090a2;
                            }

                            &:hover{
                                background-color: #68687d;
                            }
                        }

                        .metadata{
                            width: 95px;
                            text-align: center;
                            font-size: 14px;
                            
                            .gamemode{
                                margin-bottom: 5px;
                            }

                            .played-before{
                                font-size: 12px;
                            }
                            
                            .metadata-info{
                                margin-top: 10px;
                                p{
                                    display: inline;
                                }

                                .win-or-lose{
                                    font-weight: 600;
                                }
                            }
                        }

                        .champion-info{
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 10px;

                            .champion{
                                background-size: contain;
                                width: 56px;
                                height: 56px;
                                position: relative;

                                .champion-level{
                                    position: absolute;
                                    left: 0;
                                    bottom: 0;
                                    font-size: 12px;
                                    background-color: #1c1c1e;
                                    width: 18px;
                                    height: 18px;
                                    display: grid;
                                    place-items: center;
                                }
                            }

                            .champion-perks{
                                display: grid;
                                grid-template-columns: 1fr 1fr;
                                gap: 2px;

                                .champion-perk-placeholder{
                                    display: grid;
                                    place-items: center;
                                }

                                    img{
                                        width: 27px;
                                        height: 27px;
                                    }
                                }
                        }

                        .game-stats{
                            text-align: center;

                            .score{
                                b{
                                    margin: 0 5px;
                                }
                            }

                            .kda{
                                margin: 5px 0;
                                p{
                                    display: inline;
                                    margin-left: 5px;
                                }
                            }
                        }

                        .all-items{
                            display: grid;
                            grid-template-columns: 1fr 1fr 1fr 1fr;
                            gap: 2px;

                            &>*{
                                width: 27px;
                                height: 27px;
                            }

                            .item-placeholder{
                                order: 10;
                            }

                            img{
                                order: 1;
                            }

                            .ward{
                                grid-row: 1/2;
                                grid-column: 4/5;
                            }
                        }

                        .all-summoners{
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 15px;

                            .player{
                                display: flex;
                                align-items: center;

                                .champion{
                                    width: 14px;
                                    height: 14px;
                                    margin-right: 5px;
                                }

                                .link{
                                    color: white;
                                    text-decoration: none;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    width: 90px;
                                    max-width: 90px;
                                    font-size: 13px;

                                    &:hover{
                                        text-decoration: underline;
                                    }
                                }
                            }
                        }
                    }
                }

                .grid{
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 30px;
                    margin-top: 10px;

                    .card{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 20px 0;
                        border-radius: 10px;
                        border: 1px solid #1c1c1e;
                        background: rgb(27,27,33);
                        background: linear-gradient(45deg, rgba(27,27,33,1) 20%, rgba(49,49,59,1) 80%);
                        transition: all 0.3s;
                        position: relative;
                        top: 0;

                        &:hover{
                            top: -10px;
                            border: 1px solid white;
                        }
                    }

                    .championname{
                        font-size: 22px;
                        margin: 15px 0 25px 0;
                        font-weight: 600;
                    }
                    
                    .masterypic{
                        margin-bottom: 20px;
                    }

                    .masterypoints{
                        font-size: 18px;
                    }
                }
            }
        }
    }

    @media (max-width: 1400px){
        .main-grid .summoner-stats .main-content .matches .match .all-summoners{
            display: none;
        }
    }

    @media (max-width: 1360px){
        .main-grid .summoner-stats .main-content .grid{
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    @media (max-width: 1220px){
        .main-grid .summoner-stats .main-content .grid{
            gap: 20px;
        }

        .main-grid .summoner-stats .main-content .grid .championname{
            font-size: 20px;
        }
    }

    @media (max-width: 1100px){
        .main-grid{
            gap: 15px;
            grid-template-columns: 310px auto;

            .solo{
                margin-bottom: 15px;
            }
        }
    }

    @media (max-width: 1000px){
        .main-grid{
            gap: 15px;
            grid-template-columns: 1fr;

            .rank{
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
            }

            .solo{
                margin-bottom: 15px;
            }

            .summoner-stats .main-content .matches .match .all-summoners{
                display: grid;

                .player .link{
                    width: 60px;
                    max-width: 60px;
                }
            }
        }

        .main-grid .summoner-stats .main-content .grid{
            grid-template-columns: 1fr 1fr 1fr 1fr;

            .card{
                &:hover{
                    top: 0;
                    border: 1px solid #1c1c1e;
                }
            }
        }
    }

    @media (max-width: 900px){
        .main-grid{
            .summoner-stats .main-content .matches .match .all-summoners{
                display: none;
            }
        }

        .main-grid .summoner-stats .main-content .grid{
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    @media (max-width: 720px){
        .main-grid .summoner-stats .main-content .matches .match{
            position: relative;
            height: 150px;

            .metadata{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding: 15px 30px 0 0;

                .metadata-info{
                    display: none;
                }

                .gamemode{
                    margin: 0;
                    margin-right: 10px;
                }
            }

            .game-stats{
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 30px 12px 30px;
            }
        }

        .main-grid{
            .rank{
                grid-template-columns: 1fr;

                .solo{
                    margin-bottom: 0px;
                }
            }
        }

        .main-grid .summoner-stats .main-content .matches .match .game-stats .score{
            width: 100px;
            text-align: left;
        }

        .main-grid .summoner-stats .main-content .matches .match .game-stats .cs{
            width: 100px;
            text-align: right;
        }

        .main-grid .summoner-stats .main-content .matches .match .game-stats .kda{
            width: 85px;
            margin: 0;
        }
    }

    @media (max-width: 670px){
        .main-grid .summoner-stats .main-content .grid{
            width: 80%;
            margin: auto;
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (max-width: 600px){
        .main-grid .summoner-stats .main-content .grid{
            width: 100%;
        }
    }

    @media (max-width: 520px){
        .main-grid .summoner-stats .main-content{
            padding: 15px 10px 10px 10px;
        }

        .main-grid .summoner-stats .bar{
            padding: 15px 15px 0 15px;
        }

        .main-grid .summoner-stats .main-content .matches .match{
            padding: 20px 10px;
        }

        .main-grid .summoner-stats .main-content .matches .match .metadata{
            padding: 15px 10px 0 0;
        }

        .main-grid .summoner-stats .main-content .matches .match .game-stats{
            padding: 0 10px 12px 10px;
        }
    }

    @media (max-width: 500px){
        .main-grid .summoner-stats .main-content .grid{
            grid-template-columns: 1fr 1fr;

            .card{
                img{
                    width: 45px;
                }

                p{
                    font-size: 16px;
                }
            }
        }
    }

    @media (max-width: 430px){
        .main-grid .summoner-stats .main-content .matches .match .champion-info .champion{
            width: 40px;
            height: 40px;
        }

        .main-grid .summoner-stats .main-content .matches .match .champion-info .champion-perks img{
            width: 19px;
            height: 19px;
        }

        .main-grid .summoner-stats .main-content .matches .match .all-items>*{
            width: 19px;
            height: 19px;
        }

        .main-grid .summoner-stats .main-content .matches .match{
            font-size: 12px;
            height: 140px;
        }

        .main-grid .main-rank .rank-wrapper .img img{
            width: 40px;
        }

        .summoner .pfp{
            width: 125px;
            height: 125px;
        }

        .summoner .name h1{
            font-size: 25px;
        }

        .summoner button{
            font-family: inherit;
            background-color: #5382e9;
            border: none;
            color: white;
            padding: 10px 0;
            font-size: 16px;
            cursor: pointer;
            border-radius: 4px;
            -webkit-transition: all 0.5s;
            transition: all 0.5s;
            margin-top: 30px;
            width: 150px;
        } 

        .main-grid .summoner-stats .main-content .matches .match .metadata{
            font-size: 12px;
        }

        .main-grid .summoner-stats .main-content .matches .match .champion-info .champion .champion-level{
            font-size: 9px;
            width: 14px;
            height: 14px;
        }
    }

    @media (max-width: 390px){
        .main-grid .summoner-stats .main-content .grid{
            grid-template-columns: 1fr;
            width: 180px;
        }
    }

    @media (max-width: 350px){
        .main-grid .summoner-stats .main-content .matches .match{
            height: 130px;
            font-size: 11px;
        }

        .main-grid .summoner-stats .main-content .matches .match .game-stats .kda{
            display: none;
        }

        .main-grid .main-rank .rank-wrapper .rank-and-lp h4{
            font-size: 13px;
        }
    }
`