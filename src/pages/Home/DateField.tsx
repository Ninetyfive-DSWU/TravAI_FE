import React from "react";
import { DatePicker } from "antd";
import styled from "styled-components";
import Icon from "../../components/ui/IconComponent";
import { RangePickerProps } from "antd/es/date-picker";

const { RangePicker } = DatePicker;

const SelectionField: React.FC = () => {
  return (
    <SelectionFieldContainer>
      <TitleContainer>
        <Icon name="date" />
        <Title>여행 일정</Title>
      </TitleContainer>
      <StyledRangePicker
        suffixIcon={null}
        separator={<Separator>→</Separator>}
        placeholder={["Start date", "End date"]}
      />
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
`;

const Separator = styled.span`
  padding: 0 8px;
`;

const StyledRangePicker = styled(RangePicker)`
  &.ant-picker {
    border: none;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    padding: 0px;
  }

  .ant-picker-input:nth-of-type(1) {
    width: auto;
    align-self: flex-start;
  }

  .ant-picker-range-separator {
  }
  input::placeholder {
    color: #000;
  }

  .ant-picker-input:nth-of-type(2) {
    width: auto;
    align-self: flex-end !important;
  }

  .ant-picker-active-bar {
    display: none;
  }
` as React.ComponentType<RangePickerProps>;
