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

const Carousel: React.FC = () => {
  return (
    <View>
      <Slide>
        {images.concat(images).map((image) => {
          return <Img src={image} />;
        })}
      </Slide>
    </View>
  );
};

export default Carousel;

const View = styled.div`
  // overflow: hidden;
`;

const Slide = styled.ul`
  display: flex;
  position: relative;
  width: 88.54vw;
  border-radius: 3.125rem;
  animation: autoPlay 120s linear infinite;

  @keyframes autoPlay {
    from {
      transition: translateX(0);
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
