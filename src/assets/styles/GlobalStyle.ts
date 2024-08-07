// GlobalStyles.ts
import { createGlobalStyle } from "styled-components";
import Reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
 ${Reset}

 @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src:
      local('Pretendard'),//1순위
      url('/assets/fonts/Pretendard-Regular.subset.woff2') format('woff2'),//2순위
      url('/assets/fonts/Pretendard-Regular.woff2') format('woff2');//3순위
  }

 * {
   box-sizing: border-box;
   font-family: 'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
 }

 html {
   font-size: 62.5%;
   scrollbar-width: none;
 }

 #root {
   min-width: 128rem;
   min-height: 100vh;
 }

 ::-webkit-scrollbar {
   display: none;
 }
`;

export default GlobalStyle;
