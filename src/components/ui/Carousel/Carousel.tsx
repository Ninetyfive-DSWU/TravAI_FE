import styled from "styled-components";
import Image01 from "@assets/images/jpg/01.jpg";
import Image02 from "@assets/images/jpg/02.jpg";
import Image03 from "@assets/images/jpg/03.jpg";
import Image04 from "@assets/images/jpg/04.jpg";
import Image05 from "@assets/images/jpg/05.jpg";
import Image06 from "@assets/images/jpg/06.jpg";
import Image07 from "@assets/images/jpg/07.jpg";
import Image08 from "@assets/images/jpg/08.jpg";
import Image09 from "@assets/images/jpg/09.jpg";

const images = [Image01, Image02, Image03, Image04, Image05, Image06, Image07, Image08, Image09];
const extendedImages = [...images, ...images];

const Carousel: React.FC = () => {
  return (
    <Slide>
      {extendedImages.concat(images).map((image) => {
        return <Img src={image} />;
      })}
    </Slide>
  );
};

export default Carousel;

const Slide = styled.ul`
  display: flex;
  position: relative;
  animation: autoPlay 100s linear infinite;

  @keyframes autoPlay {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-88.54vw * 9));
    }
  }
`;

const Img = styled.img`
  width: 88.54vw;
  height: 34.74vw;
  object-fit: cover;
`;
