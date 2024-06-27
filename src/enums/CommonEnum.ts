type EnvMode = {
  PROD: string;
  LOCAL: string;
};

export const ENVMODE: Readonly<EnvMode> = Object.freeze({
  PROD: "prod",
  LOCAL: "local",
});

type PageNames = {
  HOME: string;
  LOGIN: string;
  SIGNUP: string;
  MYPAGE: string;
  MAP: string;
  LOADING: string;
};

type Routes = {
  HOME: string;
  LOGIN: string;
  SIGNUP: string;
  MYPAGE: string;
  MAP: string;
  LOADING: string;
};

export const PAGENAMES: Readonly<PageNames> = Object.freeze({
  HOME: "홈",
  LOGIN: "로그인",
  SIGNUP: "회원가입",
  MYPAGE: "마이페이지",
  MAP: "지도",
  LOADING: "로딩",
});

export const ROUTES: Readonly<Routes> = Object.freeze({
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  MYPAGE: "/mypage",
  MAP: "/map",
  LOADING: "/loading",
});
