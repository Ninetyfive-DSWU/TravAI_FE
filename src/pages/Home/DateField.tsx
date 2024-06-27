import React from "react";
import { DatePicker } from "antd";
import styled from "styled-components";
import Icon from "../../components/ui/IconComponent";
import { RangePickerProps } from "antd/es/date-picker";
import pxToVw from "@utils/PxToVw";
import useFilterStore from "../../store/useFilterstore";

const { RangePicker } = DatePicker;

const SelectionField: React.FC = () => {
  const { setDates } = useFilterStore();
  const handleDateChange: RangePickerProps["onChange"] = (
    dates,
    dateStrings
  ) => {
    setDates(dateStrings[0], dateStrings[1]);
  };

  return (
    <SelectionFieldContainer>
      <TitleContainer>
        <Icon name="date" />
        <Title>일정</Title>
      </TitleContainer>
      <StyledRangePicker suffixIcon={null} onChange={handleDateChange} />
    </SelectionFieldContainer>
  );
};

export default SelectionField;

const SelectionFieldContainer = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.52vw;
  margin-bottom: 0.52vw;
`;

const Title = styled.div`
  font-size: 1.56vw;
  font-weight: 700;
`;

const StyledRangePicker = styled(RangePicker)`
  &.ant-picker {
    border: none;
    box-shadow: none;
    width: ${pxToVw(330)};
    padding: 0rem;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .ant-picker-active-bar {
    display: none;
  }
  .ant-picker-input > input:placeholder-shown {
    font-size: ${pxToVw(21)} !important;
  }

  .ant-picker-input > input {
    font-size: ${pxToVw(21)} !important;
  }

  .ant-picker-clear {
    display: none;
  }
` as React.ComponentType<RangePickerProps>;
