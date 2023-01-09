import styled from "styled-components";

export const StyledSearch = styled.div`
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 90vh;
    position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;

    #myVideo {
        min-width: 100%;
        min-height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        object-fit: cover;
    }

    .background{
        min-width: 100%;
        min-height: 100%;
        z-index: 4;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        display: none;
    }

    main{
        width: 100%;
        height: 90vh;
        top: 10vh;
        z-index: 3;
        background-color: rgba(28, 28, 30, 0.8);
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        div{
            margin: 50px 0;
        }

        input, select{
            padding: 15px;
            border: none;
            border-radius: 4px;
            background-color: #31313b;
            color: white;
            font-family: inherit;
            font-size: 20px;

            &:focus{
                border: none;
                outline: none;
            }
        }

        input{
            width: 300px;
            margin-right: 20px;
        }

        select{
            padding: 14px;
        }

        button{
            font-family: inherit;
            background-color: #5382e9;
            border: none;
            color: white;
            padding: 10px 20px;
            font-size: 20px;
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.5s;

            &:hover{
                background-color: white;
                color: black;
            }
        }

        form{
            display: inline;
        }
    }

    @media (max-width: 800px){
        video{
            display: none;
        }

        .background{
            display: block;
        }
    }

    @media (max-width: 530px){
        main{
            input{
                width: 240px;
            }

            input, select{
                padding: 12px 10px;
                border: none;
                border-radius: 4px;
                background-color: #31313b;
                color: white;
                font-family: inherit;
                font-size: 18px;

                &:focus{
                    border: none;
                    outline: none;
                }
            }

            select{
                padding: 11px 4px;
            }

            button{
                font-family: inherit;
                background-color: #5382e9;
                border: none;
                color: white;
                padding: 10px 20px;
                font-size: 18px;
                border-radius: 4px;
            }
        }
    }

    @media (max-width: 440px){
        main{
            input{
                width: 210px;
                margin-right: 10px;
            }
        }
    }

    @media (max-width: 360px){
        main{
            form{
                display: flex;
                flex-direction: column;
                align-items: center;

                &>*{
                    width: max-content;
                }

                input{
                    margin: 0;
                    margin-bottom: 15px;
                    width: 90%
                }
            }

            h2{
                font-size: 18px;
                text-align: center;
            }

            div{
                margin: 40px 0;
            }
        }
    }

`