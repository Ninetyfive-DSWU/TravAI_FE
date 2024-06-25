import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import pxToVw from '@utils/PxToVw';
import Typography from '@components/ui/Typography/Typography';
import ThumnailImage from '@components/ui/Thumnail/ThumnailImage';

const PostCard: React.FC = () => {
  const nav = useNavigate();

  return (
    <CardContainer>
      <ThumnailImage />
      <InfoContainer>
        <Typography content='도시 이름' size={32} fontWeight={600} />
        <Typography content='2000.00.00~2000.00.00' size={27} fontWeight={500} color={'gray'} />
        <Button>조회하기</Button>
      </InfoContainer>
    </CardContainer>
  );
};

export default PostCard;

const CardContainer = styled.div`
  border-radius: 20px;
  box-shadow: 0 2px 3px 4px rgba(0, 0, 0, 0.1);
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px;
  gap: 10px;
`;

const Button = styled.button`
  width: ${pxToVw(80)};
  height: ${pxToVw(24)};
  font-size: ${pxToVw(16)};
  background: none;
  border: 0;
  border-bottom: 1px solid #000;
  cursor: pointer;
`;
