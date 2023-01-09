import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    body{
        font-family: 'Inter', sans-serif;
        background-color: #1c1c1e;
        color: white;
    }
`

export default GlobalStyles;