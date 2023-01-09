import styled from "styled-components";

export const LeaderboardSection = styled.div`
    .heading{
        padding: 100px 0;
        text-align: center;
    }

    .margin{
        margin-bottom: 100px;
    }

    .dropdown{
        width: max-content;
        margin: auto;
        text-align: center;

        h3{
            display: inline;
        }

        select{
            padding: 5px 10px;
            margin-left: 10px;
            margin-bottom: 30px;
            border: none;
            border-radius: 4px;
            background-color: #31313b;
            color: white;
            font-family: inherit;
            font-size: inherit;

            &:focus{
                border: none;
                outline: none;
            }
        }
    }

    table{
        width: 1000px;
        max-width: 100%;
        margin: 0 auto 0 auto;
        position: relative;

        .skeleton{

            .summoner{
                background-color: #31313C;
                background-image: linear-gradient(
                    to right,
                    white 0%,
                    #31313C 10%,
                    white 20%,
                    white 100%
                ) !important;
                background-size: 200% 100%;
                animation: bgPos 1s linear infinite;
                color: transparent;
                width: 150px;
            }
        }

        &, th, td, tr{
            border-collapse: collapse;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        th{
            background-color: #282830;
        }

        tr{
            background-color: #31313C;
        }

        .skeleton-tr{
            height: 41px;
        }

        th, td{
            padding: 10px 0;
        }

        th:nth-child(1){
            width: 50px;
        }

        th:nth-child(2){
            text-align: left;
            width: auto;
            padding-left: 10px;
        }

        th:nth-child(3){
            width: 70px;
        }

        th:nth-child(4){
            width: 200px;
        }

        td:nth-child(1), td:nth-child(3){
            text-align: center;
        }

        td:nth-child(2){
            padding-left: 10px;
        }

        td:nth-child(4){
            padding: 0 10px;
        }

        .link{
            color: white;
            text-decoration: none;

            &:hover{
                text-decoration: underline;
            }
        }
    }
    .winrate-container{
        display: grid;
        grid-template-columns: 80% 20%;
        gap: 10px;
        font-size: 14px;

        .winrate{
            display: grid;
            grid-template-columns: 50% 50%;

            .win{
                border-radius: 5px 0 0 5px;
                padding-left: 5px;
                background-color: #5383E8;
            }

            .lose{
                border-radius: 0 5px 5px 0;
                padding-right: 5px;
                background-color: #E84057;
                text-align: right;
            }
        }

        .wr{
            padding-right: 10px;
        }

        p{
            text-align: right;
            padding-right: 10px;
        }
    }

    @keyframes bgPos {
        0% {
            background-position: 50% 0;
        }

        100% {
            background-position: -150% 0;
        }
    }

    @media (max-width: 650px){
        .winrate-container{
            display: block;

            p{
                text-align: center;
                padding-right: 0px;
            }

            .winrate{
                display: none;
            }

            .wr{
                padding-right: 0px;
            }
        }

        table{
            th:nth-child(4){
                width: 100px;
            }
        }

        .heading{
            padding: 70px 0;
            text-align: center;
        }
    }
    
    @media (max-width: 480px){
        table{
            font-size: 14px;

            .skeleton{
                .summoner{
                    width: 60%;
                }
            }

            th:nth-child(1){
                width: 35px;
            }

            th:nth-child(2){
                text-align: left;
                width: auto;
                padding-left: 10px;
            }

            th:nth-child(3){
                width: 50px;
            }

            th:nth-child(4){
                width: 60px;
            }

            td:nth-child(1), td:nth-child(3){
                text-align: center;
            }

            td:nth-child(4){
                padding: 0 10px;
            }
        }
    }

    @media (max-width: 360px){
        table{
            font-size: 12px !important;

            .winrate-container{
                font-size: 12px;
            }
        }
    }
`