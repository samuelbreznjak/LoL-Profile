import styled from "styled-components";

export const ErrorStyled = styled.div`
    .error-container{
        position: fixed;
        top: 10vh;
        left: 0;
        width: 100%;
        height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        z-index: 50;

        .error{
            all: unset;
            background-color: #1c1c1e;
            width: 1350px;
            max-width: 100%;
            text-align: center;
            padding: 0 20px;

            p{
                margin-top: 20px;
            }

            img{
                margin: 20px 0;
            }

            .link{
                font-family: inherit;
                background-color: #5382e9;
                border: none;
                color: white;
                padding: 10px 20px;
                font-size: 20px;
                cursor: pointer;
                border-radius: 4px;
                transition: all 0.5s;
                text-decoration: none;

                &:hover{
                    background-color: white;
                    color: black;
                }
            }
        }
    }

    @media (max-width: 800px){
        p{
            font-size: 14px;
            line-height: 1.8;
        }
    }

    @media (max-width: 600px){
        img{
            display: none;
        }

        .error{
            .link{
                padding: 7px 14px !important;
                font-size: 17px !important;
                margin-top: 5px !important;

                &:hover{
                    background-color: white;
                    color: black;
                }
            }
        }
    }

    @media (max-width: 400px){
        img{
            display: none;
        }

        h1{
            font-size: 25px;
        }
    }
`