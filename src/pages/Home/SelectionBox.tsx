import styled from "styled-components";
import { useState } from "react";
import LineDivider from "@components/ui/LineDivider";
import SelectionField from "@components/ui/SelectionField";
import DateField from "../Home/DateField";

const SelectionBox: React.FC = () => {
  const [destination, setDestination] = useState<string[]>([]);
  const [companion, setCompanion] = useState<string[]>([]);
  const [style, setStyle] = useState<string[]>([]);

  interface Option {
    value: string;
    label: string;
    children?: Option[];
  }

  const destinationOptions: Option[] = [
    {
      value: "seoul",
      label: "서울",
      children: [
        {
          value: "gangnam",
          label: "강남",
        },
        {
          value: "hongdae",
          label: "홍대",
        },
      ],
    },
    {
      value: "busan",
      label: "부산",
      children: [
        {
          value: "haeundae",
          label: "해운대",
        },
        {
          value: "nampo",
          label: "남포",
        },
      ],
    },
  ];
  const companionOptions: Option[] = [
    {
      value: "family",
      label: "가족",
    },
    {
      value: "friend",
      label: "친구",
    },
    {
      value: "alone",
      label: "혼자",
    },
  ];
  const styleOptions: Option[] = [
    {
      value: "relax",
      label: "힐링",
    },
    {
      value: "adventure",
      label: "모험",
    },
    {
      value: "culture",
      label: "문화",
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
`;
