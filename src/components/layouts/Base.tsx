import { ReactNode } from "react";
import Header from "@components/layouts/header";
import styled from "styled-components";

interface BaseProps {
  children: ReactNode;
}

const Base: React.FC<BaseProps> = ({ children }) => {
  return (
    <>
      <Header />
      <StyledMain>{children}</StyledMain>
    </>
  );
};

export default Base;

const StyledMain = styled.main`
  margin-top: 0;
  width: 100vw;
  height: calc(100vh - 6.15vw);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;
