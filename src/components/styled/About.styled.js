import styled from "styled-components";

export const AboutSection = styled.div`
    .heading{
        padding: 100px 0;
        text-align: center;
    }

    .about{
        text-align: center;
        padding-bottom: 70px;

        p{
            line-height: 1.8;
            margin-bottom: 25px;
        }

        a, a:visited{
            color: rgb(83, 130, 233);
        }
    }

    @media (max-width: 650px){
        .heading{
            padding: 70px 0;
        }
    }

    @media (max-width: 500px){
        .about{
            font-size: 14px;
        }
    }
`