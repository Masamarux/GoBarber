import React from 'react';
import { RippleProps } from 'react-native-material-ripple';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RippleProps {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
