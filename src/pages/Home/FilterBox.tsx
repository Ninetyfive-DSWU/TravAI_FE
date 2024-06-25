import React from "react";
import styled from "styled-components";
import SubmitBtn from "../Home/SubmitBtn";
import SelectionBox from "../Home/SelectionBox";
import pxToVw from "@utils/PxToVw";

const FilterBox: React.FC = () => {
  return (
    <FilterContainer>
      <SelectionBox />
      <SubmitBtn />
    </FilterContainer>
  );
};

export default FilterBox;

const FilterContainer = styled.div`
  width: 71.46vw;
  height: 9.42vw;
  background: #fff;
  border-radius: 0.83vw;
  box-shadow: 0px 4px 46px 0px rgba(0, 0, 0, 0.25);
  position: absolute;
  bottom: calc((9.42vw / 2) * -1);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2.96vw;
  padding-left: ${pxToVw(51)};
  padding-right: ${pxToVw(24)};
`;
