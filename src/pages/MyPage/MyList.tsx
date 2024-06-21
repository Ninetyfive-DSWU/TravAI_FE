import React from 'react';
import styled from 'styled-components';
import PostCard from '@pages/MyPage/PostCard';

const MyList: React.FC = () => {
  return (
    <PostCardContainer>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </PostCardContainer>
  );
};

export default MyList;

const PostCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 4rem;
`;
