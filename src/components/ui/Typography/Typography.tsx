import React from 'react';
import styled from 'styled-components';
import pxToVw from '@utils/PxToVw';

interface TypoProps {
  content: string;
  size?: number;
  fontWeight?: number;
  color?: string;
}

const Typography: React.FC<TypoProps> = ({ content, size, fontWeight, color }) => {
  return (
    <StyledSpan $size={size} $fontWeight={fontWeight} $color={color}>
      {content}
    </StyledSpan>
  );
};

export default Typography;

interface StyledSpanProps {
  $size?: number;
  $fontWeight?: number;
  $color?: string;
}

const StyledSpan = styled.span<StyledSpanProps>`
  font-size: ${({ $size }) => ($size ? pxToVw($size) : 'inherit')};
  font-weight: ${({ $fontWeight }) => ($fontWeight ? `${$fontWeight}` : 'inherit')};
  color: ${({ $color }) => ($color ? `${$color}` : 'inherit')};
`;
