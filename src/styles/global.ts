import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: "Roboto", sans-serif;
  }

  p {
    margin: 0;
  }

  h1,h2,h3,h4,h5,h6 {
    margin: 0;
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;
