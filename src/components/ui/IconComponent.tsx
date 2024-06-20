import React from "react";
import styled from "styled-components";
import MapIcon from "../../assets/images/svg/map_pin.svg";
import HeartIcon from "../../assets/images/svg/heart.svg";
import CalendarIcon from "../../assets/images/svg/calendar.svg";
import SmileIcon from "../../assets/images/svg/smile.svg";

export type IconName = "location" | "partner" | "style" | "date";

interface IconProps {
  name: IconName;
}

const Icon: React.FC<IconProps> = ({ name }) => {
  const getIconSrc = (name: IconName) => {
    switch (name) {
      case "location":
        return MapIcon;
      case "partner":
        return SmileIcon;
      case "style":
        return HeartIcon;
      case "date":
        return CalendarIcon;
      default:
        return null;
    }
  };

  const iconSrc = getIconSrc(name);

  if (!iconSrc) return null;

  return <IconImg src={iconSrc} alt={`${name} icon`} />;
};

export default Icon;

const IconImg = styled.img`
  width: 1.25vw;
  height: 1.25vw;
`;
