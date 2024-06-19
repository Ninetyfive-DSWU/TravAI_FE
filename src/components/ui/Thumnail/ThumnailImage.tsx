import React from 'react';
import styled from 'styled-components';
import noImage from '@assets/images/no_image.png';

interface ThumbnailImageProps {
  cityName?: string;
}

const cityImages: { [key: string]: string } = {
  Osaka: '',
};

const ThumnailImage: React.FC<ThumbnailImageProps> = ({ cityName }) => {
  const imageUrl = cityName ? cityImages[cityName] || noImage : noImage;

  return (
    <ThumnailContainer>
      <Thumnail src={imageUrl} />
    </ThumnailContainer>
  );
};

export default ThumnailImage;

const ThumnailContainer = styled.div`
  width: 511px;
  height: 243px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: gray;
  border-radius: 20px 20px 0 0;
`;

const Thumnail = styled.img`
  width: 120px;
  height: 120px;
`;
