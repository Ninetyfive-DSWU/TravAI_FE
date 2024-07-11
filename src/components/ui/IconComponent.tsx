import React from "react";
import styled from "styled-components";
import MapIcon from "../../assets/images/svg/map_pin.svg";
import HeartIcon from "../../assets/images/svg/heart.svg";
import CalendarIcon from "../../assets/images/svg/calendar.svg";
import SmileIcon from "../../assets/images/svg/smile.svg";
import DeleteIcon from "@assets/images/svg/delete.svg";

export type IconName = "location" | "partner" | "style" | "date" | "delete";

interface IconProps {
  name: IconName;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ name, style, onClick }) => {
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
      case "delete":
        return DeleteIcon;
      default:
        return null;
    }
  };

  const iconSrc = getIconSrc(name);

  if (!iconSrc) return null;

  return <IconImg src={iconSrc} alt={`${name} icon`} style={style} onClick={onClick} />;
};

export default Icon;

const IconImg = styled.img`
  width: 1.25vw;
  height: 1.25vw;
`;
