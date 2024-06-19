import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ThumnailImage from '@components/ui/Thumnail/ThumnailImage';

const PostCard: React.FC = () => {
  const nav = useNavigate();

  return (
    <CardContainer>
      <ThumnailImage />
      <InfoContainer>
        <p>도시 이름</p>
        <p>여행시작 ~ 여행종료</p>
        <button>조회하기</button>
      </InfoContainer>
    </CardContainer>
  );
};

export default PostCard;

const CardContainer = styled.div`
  border: solid 1px gray;
  border-radius: 20px;
`;

const InfoContainer = styled.div`
  margin: 24px;
`;
