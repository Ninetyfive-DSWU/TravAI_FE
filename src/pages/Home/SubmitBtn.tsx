import styled from "styled-components";
import SearchIcon from "../../assets/images/svg/SearchBtn.svg";

const SubmitBtn: React.FC = () => {
  return (
    <SubmitBtnContainer>
      <SubmitBtnImg src={SearchIcon} />
    </SubmitBtnContainer>
  );
};

export default SubmitBtn;

const SubmitBtnContainer = styled.div`
  background: black;
  width: 6.77vw;
  height: 6.77vw;
  padding: 1.56px;
  border-radius: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const SubmitBtnImg = styled.img`
  width: 3vw;
`;
