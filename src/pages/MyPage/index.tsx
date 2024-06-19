import React from 'react';
import styled from 'styled-components';
import Typography from '@components/ui/Typography/Typography';
import MyList from '@pages/MyPage/MyList';

const MyPage: React.FC = () => {
  return (
    <MyPageContainer>
      <Typography content='나의 여행' size={50} fontWeight={700} />
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
