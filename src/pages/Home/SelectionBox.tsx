import styled from "styled-components";
import LineDivider from "@components/ui/LineDivider";
import SelectionField from "@components/ui/SelectionField";
import DateField from "../Home/DateField";
import useFilterStore from "../../store/useFilterstore";

const SelectionBox: React.FC = () => {
  const {
    destination,
    companion,
    style,
    setDestination,
    setStyle,
    setCompanion,
  } = useFilterStore();

  interface Option {
    value: string;
    label: string;
    children?: Option[];
  }

  const destinationOptions: Option[] = [
    {
      value: "뉴욕",
      label: "뉴욕",
    },
    {
      value: "도쿄",
      label: "도쿄",
    },
    {
      value: "런던",
      label: "런던",
    },
    {
      value: "로마",
      label: "로마",
    },
    {
      value: "베를린",
      label: "베를린",
    },
    {
      value: "시드니",
      label: "시드니",
    },
    {
      value: "싱가포르",
      label: "싱가포르",
    },
    {
      value: "타이페이",
      label: "타이페이",
    },
    {
      value: "파리",
      label: "파리",
    },
  ];
  const companionOptions: Option[] = [
    {
      value: "가족",
      label: "가족",
    },
    {
      value: "연인",
      label: "연인",
    },
    {
      value: "친구",
      label: "친구",
    },
    {
      value: "혼자",
      label: "혼자",
    },
  ];
  const styleOptions: Option[] = [
    {
      value: "관광",
      label: "관광",
    },
    {
      value: "쇼핑",
      label: "쇼핑",
    },
    {
      value: "액티비티",
      label: "액티비티",
    },
    {
      value: "힐링",
      label: "힐링",
    },
  ];

  return (
    <SelectionContainer>
      <SelectionField
        title="여행지"
        options={destinationOptions}
        placeholder="여행지를 선택하세요"
        value={destination}
        iconType="location"
        onChange={(value) => setDestination(value)}
      />
      <LineDivider />
      <SelectionField
        title="동행"
        options={companionOptions}
        placeholder="동행을 선택하세요"
        value={companion}
        iconType="partner"
        onChange={(value) => setCompanion(value)}
      />
      <LineDivider />
      <SelectionField
        title="여행 스타일"
        options={styleOptions}
        placeholder="여행 스타일을 선택하세요"
        value={style}
        iconType="style"
        onChange={(value) => setStyle(value)}
      />
      <LineDivider />
      <DateField />
    </SelectionContainer>
  );
};

export default SelectionBox;

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.59vw;
  align-items: center;
`;
