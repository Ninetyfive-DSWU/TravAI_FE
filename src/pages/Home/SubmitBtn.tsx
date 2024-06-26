import styled from "styled-components";
import SearchIcon from "../../assets/images/svg/SearchBtn.svg";
import useFilterStore from "../../store/useFilterstore";

const SubmitBtn: React.FC = () => {
  const {
    destination,
    companion,
    style,
    startDate,
    endDate,
    nights,
    clearOptions,
  } = useFilterStore();

  const handleSubmit = () => {
    console.log(destination, companion, style, startDate, endDate, nights);
    clearOptions();
  };

  return (
    <SubmitBtnContainer onClick={handleSubmit}>
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
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const SubmitBtnImg = styled.img`
  width: 2vw;
`;
