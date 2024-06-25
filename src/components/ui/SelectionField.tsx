import { Cascader } from "antd";
import { CascaderProps, GetProp } from "antd";
import styled from "styled-components";
import Icon, { IconName } from "./IconComponent";
import pxToVw from "@utils/PxToVw";

interface SelectionFieldProps extends Omit<CascaderProps, "onChange"> {
  title: string;
  value?: string[];
  iconType: IconName;
  onChange: (
    value: string[],
    selectedOptions: CascaderProps["options"]
  ) => void;
}

type DefaultOptionType = GetProp<CascaderProps, "options">[number];

const filter = (inputValue: string, path: DefaultOptionType[]) =>
  path.some(
    (option) =>
      (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) >
      -1
  );

const StyledCascader = styled(Cascader)`
  &&& {
    width: ${pxToVw(220)} !important;
  }
  .ant-select-selector {
    border: none !important;
    box-shadow: none !important;
    padding: 0px !important;
  }
  .ant-select-selection-placeholder {
    font-size: ${pxToVw(21)};
    font-weight: normal; // 글씨 두께
  }
  .ant-select-selection-search {
    width: 100%;
    inset-inline-start: 0px !important;
    inset-inline-end: 0px !important;
  }
  .ant-select-selection-item {
    font-size: ${pxToVw(21)};
  }
`;

const SelectionField: React.FC<SelectionFieldProps> = ({
  title,
  value,
  iconType,
  onChange,
  ...cascaderProps
}) => {
  return (
    <SelectionFieldContainer>
      <TitleContainer>
        <Icon name={iconType} />
        <Title>{title}</Title>
      </TitleContainer>
      <StyledCascader
        {...cascaderProps}
        value={value}
        onChange={(value, selectedOptions) =>
          onChange(value as string[], selectedOptions)
        }
        placement="topLeft"
        showSearch={{ filter }}
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
  font-weight: 700;
`;
