import styled from "styled-components";

export const FlexNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: calc(10vh - 2px);
    padding: 16px 0;

    #logo{
        color: white;
    }

    .logo{
        text-decoration: none;
    }

    a:visited{
        text-decoration: none;
        color: transparent;
    }
    
    .links{
        a{
            margin-left: 50px;
            text-decoration: none;
            color: white;
            display: inline-block;
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

    svg{
        position: relative;
        top: 1px;
        width: 30px;
        color: white;
    }

    button{
        background-color: transparent;
        border: 0;
        cursor: pointer;
        display: none;
    }

    .hamburger{
        display: none;
    }

    @media (max-width: 850px) {
        button{
            display: inline;
        }

        #logo{
            font-size: 22px;
        }

        .hamburger{
            display: inline;
        }

        .links{
            display: none;
        }
    }
`