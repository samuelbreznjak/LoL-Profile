import styled from "styled-components";

export const FreeRotationSection = styled.div`
    .heading{
        padding: 100px 0;
        text-align: center;
    }

    .desc{
        text-align: center;
    }

    .grid-container{
        position: relative;
        width: 100%;
        margin-top: 50px;
    }

    .grid{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin-bottom: 50px;
        gap: 50px;

        &>div{
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
            height: 250px;
            display: flex;
            align-items: flex-end;
            padding: 25px;
            border: 2px solid #31313b;
            border-radius: 10px;
            box-shadow: inset 90px -90px 71px -22px rgba(0,0,0,0.7);
            transition: all 0.3s;
            position: relative;
            top: 0;

            &:hover{
                top: -10px;
                border: 2px solid white;
            }
        }
    }

    .skeleton{
        z-index: 2;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;

        &>div{
            background-color: #31313b;
            background-image: linear-gradient(
                    to right,
                    #31313b 0%,
                    #1c1c1e 10%,
                    #31313b 20%,
                    #31313b 100%
                ) !important;
            background-size: 200% 100%;
            animation: bgPos 1.5s linear infinite;
            border: 2px solid #31313b;
            transition: all 0.3s;
            position: relative;
            box-shadow: unset;
            top: 0;

            &:hover{
                top: 0px;
                border: 2px solid #31313b;
            }
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

    @media (max-width: 1300px){
        .grid{
            display: grid;
            grid-template-columns: 1fr 1fr;

            &>div{
                height: 300px;
                display: flex;
                align-items: flex-end;
                padding: 25px;
                border: 2px solid #31313b;
                border-radius: 10px;
                box-shadow: inset 90px -90px 71px -22px rgba(0,0,0,0.7);
                transition: all 0.3s;
                position: relative;
                top: 0;

                &:hover{
                    top: -10px;
                    border: 2px solid white;
                }
            }
        }

        .skeleton{
            width: 100%;

            &>div{
                box-shadow: unset;
            }
        }
    }

    @media (max-width: 1100px){
        .grid{

            &>div{
                height: 270px;
            }
        }
    }

    @media (max-width: 1000px){
        .grid{

            &>div{
                height: 240px;
            }
        }
    }

    @media (max-width: 950px){
        .grid{
            gap: 30px;

            &>div{
                height: 220px;
            }
        }
    }

    @media (max-width: 830px){
        .grid{
            &>div{
                height: 200px;
            }
        }
    }

    @media (max-width: 750px){
        .grid{
            &>div{
                height: 180px;
                padding: 17px;

                h1{
                    font-size: 25px;
                }
            }
        }
    }

    @media (max-width: 650px){
        .grid-container, .skeleton{
            padding: 0 70px;
        }
        
        .grid{
            grid-template-columns: 1fr;
            margin-left: auto;
            margin-right: auto;

            &>div{
                height: 240px;
                padding: 17px;
                transition: unset;

                &:hover{
                    top: unset;
                    border: 2px solid #31313b;
                }

                h1{
                    font-size: 25px;
                }
            }
        }

        .heading{
            padding: 70px 0;
        }
    }

    @media (max-width: 620px){
        .grid{
            &>div{
                height: 220px;
            }
        }
    }

    @media (max-width: 550px){
        .grid-container, .skeleton{
            padding: 0 40px;
        }
    }

    @media (max-width: 500px){
        .grid{
            &>div{
                height: 200px;
            }
        }
    }

    @media (max-width: 450px){
        .grid-container, .skeleton{
            padding: 0 20px;
        }

        .grid{
            &>div{
                height: 180px;

                h1{
                    font-size: 22px;
                }
            }
        }
    }

    @media (max-width: 400px) {
        .grid-container, .skeleton{
            padding: 0;
        }

        .grid{
            gap: 20px;
        }
    }

    @media (max-width: 350px) {
        .grid{
            &>div{
                height: 160px;
            }
        }
    }

    @media (max-width: 320px){
        .grid{
            &>div{
                height: 130px;

                h1{
                    font-size: 19px;
                }
            }
        }
    }
`