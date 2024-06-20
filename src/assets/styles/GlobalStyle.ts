import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
   @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src:
      local('Pretendard'),//1순위
      url('/assets/fonts/Pretendard-Regular.subset.woff2') format('woff2'),//2순위
      url('/assets/fonts/Pretendard-Regular.woff2') format('woff2');//3순위
  }
`;

export default GlobalStyle;
