import React from 'react';
import styled from 'styled-components';
import pxToVw from '@utils/PxToVw';
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
  width: ${pxToVw(511)};
  height: ${pxToVw(243)};
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0 0;
`;

const Thumnail = styled.img`
  width: ${pxToVw(120)};
  height: ${pxToVw(120)};
`;
