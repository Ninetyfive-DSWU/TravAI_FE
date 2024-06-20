import React from "react";
import styled from "styled-components";
import thumnail from "../../assets/images/png/background.png";

const ImageSlide: React.FC = () => {
  return (
    <ThumnailSection>
      <Img src={thumnail} />
    </ThumnailSection>
  );
};

export default ImageSlide;

const ThumnailSection = styled.div`
  position: relative;
`;

const Img = styled.img`
  width: 88.54vw;
  height: 34.74vw;
  border-radius: 3.125rem;
  object-fit: cover;
`;
