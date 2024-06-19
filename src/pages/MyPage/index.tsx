import React from 'react';
import styled from 'styled-components';
import MyList from '@pages/MyPage/MyList';

const MyPage: React.FC = () => {
  return (
    <MyPageContainer>
      <p>나의 여행</p>
      <MyList />
    </MyPageContainer>
  );
};

export default MyPage;

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 230px 111px;
  gap: 115px;
`;
