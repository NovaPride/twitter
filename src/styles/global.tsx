import { createGlobalStyle } from "styled-components";

import { theme } from "@/styles/theme";

export const GlobalStyle = createGlobalStyle`
  :root{
    --avatar-image-size: 50px;
    --header-height: 0px;
    --footer-height: 0px;

    --aside-left-width: 260px;
    --main-section-width: 600px;
    --aside-right-width: 300px;

    --scrollbar-basic-width: 8px;
    --scrollbar-color: rgba(20, 20, 20, 1);
    --scrollbar-bg-color: rgba(180, 180, 180, 1);
    --border-gray: 1px solid #d8d8d8;
    --link-hover-bg: rgba(0, 0, 0, 0.1);
    
    --like-size: 20px;
    --like-inner-liked: #ff0000;
    --like-inner-not-liked: transparent;
    --like-outer-liked: #ff0000;
    --like-outer-not-liked: #000;
    --like-hover-liked: #f674744e;
    --like-hover-not-liked: #f96969;

    --bookmark-inner-liked: #ffd500;
    --bookmark-inner-not-liked: transparent;
    --bookmark-outer-liked: #ffd500;
    --bookmark-outer-not-liked: #000;
    --bookmark-hover-liked: #cbc513;
    --bookmark-hover-not-liked: #eedb48;

    --dark-color: #000;
    --light-color: #fff;
    --primary-color:#2f80ed;
    --secondary-color: #eff3f4;
    --accents-color: #1da1f2;

    --text-primary-color: #000000;
    --text-secondary-color: #828282;
    --bg-primary-color: #fff;
    --bg-primary-rgb: 255, 255, 255;

    --success-color: #2ba520;
    --error-color: #f5222d;
  }

  :root {
    &.dark {
      --like-outer-not-liked: #ffffff;
      --bookmark-outer-not-liked: #ffffff;
      --link-hover-bg: rgba(255, 255, 255, 0.1);
      --border-gray: 1px solid rgba(46,50,54,255);

      --dark-color: #b4c4b9;
      --light-color: #191515;
      --primary-color: #2f80ed;
      --secondary-color: rgb(32, 35, 39);
      --accents-color: #187cbf;

      --text-primary-color: #ffffff;
      --text-secondary-color: #898d8f;
      --bg-primary-color: #000000;
      --bg-primary-rgb: 0, 0, 0;
    }
  }

  #root {
    overflow-y: scroll;
  }
  
  * {
    font-family: "Roboto", sans-serif;
    color-scheme: ${({ theme }) => theme.colorScheme};
    box-sizing: border-box;
    color: var(--text-primary-color);
  }

  ::-webkit-scrollbar {
    width: var(--scrollbar-basic-width);
    color: var(--scrollbar-color);
    background-color: var(--scrollbar-bg-color);

    &-thumb {
      border-radius: 10px;
      background: var(--scrollbar-color);
    }
    &-button {
      height: 2px;
    }
  }

  ::placeholder{
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
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

  .gridInterface{
    display: grid;
    position: relative;
    height: 100vh;
    grid-template-areas:
      "header header header"
      "aside-left main-section aside-right"
      "footer footer footer";
    grid-template-rows: var(--header-height) 1fr var(--footer-height);
    grid-template-columns: var(--aside-left-width) var(--main-section-width) var(--aside-right-width); 
    transition: 0.2s all;
  }

  :root{
    @media ${theme.device.xl} {
    }
    @media ${theme.device.lg} {
      --aside-left-width: 200px;
      --main-section-width: 570px;
      --aside-right-width: 70px;
    }
    @media ${theme.device.md} {
      --aside-left-width: 85px;
      --main-section-width: 445px;
      --aside-right-width: 60px;
    }
    @media ${theme.device.sm} {
      --aside-left-width: 0px;
      --main-section-width: 100vw;
      --aside-right-width: 0px;

      --scrollbar-basic-width: 0px;
    }
    @media ${theme.device.xs} {
    }
  }

  #root{
    @media ${theme.device.sm} {
      overflow-x: hidden;
    }
  }
`;
