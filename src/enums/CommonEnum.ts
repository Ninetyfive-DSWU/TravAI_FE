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
  PLAN: string;
  LOADING: string;
  SAVE: string;
};

type Routes = {
  HOME: string;
  LOGIN: string;
  SIGNUP: string;
  MYPAGE: string;
  PLAN: string;
  LOADING: string;
  SAVE: string;
};

export const PAGENAMES: Readonly<PageNames> = Object.freeze({
  HOME: "홈",
  LOGIN: "로그인",
  SIGNUP: "회원가입",
  MYPAGE: "마이페이지",
  PLAN: "일정",
  LOADING: "로딩",
  SAVE: "저장",
});

export const ROUTES: Readonly<Routes> = Object.freeze({
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  MYPAGE: "/mypage",
  PLAN: "/plan/:sessionId",
  LOADING: "/loading",
  SAVE: "/save",
});
