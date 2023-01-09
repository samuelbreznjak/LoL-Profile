import styled from "styled-components";

export const StyledMobileNav  = styled.div`
    .mobile-nav-container{
        top: -100%;
        left: 0;
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: #1c1c1e;
        z-index: 100;
        display: grid;
        grid-template-rows: 10% 90%;
        transition: all 0.5s;

        &.active{
            top: 0;
        }
    }

    .close-btn{
        padding: 35px 0;
        width: 100%;
        max-width: 90%;
        margin: auto;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .links{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &>*{
            text-decoration: none;
            color: white;
            margin-bottom: 50px;
            font-size: 30px;
            position: relative;

            &:after {
                content: '';
                position: absolute;
                width: 100%;
                transform: scaleX(0);
                height: 2px;
                bottom: -7px;
                left: 0;
                background-color: white;
                transform-origin: bottom right;
                transition: transform 0.25s ease-out;
            }

            &:hover:after {
                transform: scaleX(1);
                transform-origin: bottom left;
            }
        }
    }

    @media (max-width: 500px){
        .links{
            &>*{
                margin-bottom: 35px;
                font-size: 20px;
                position: relative;

            }
        }
    }
`