import React from 'react';

import {Container, LoadingIcon, LoadingText} from './styles';

export default () => {
  return (
    <Container>
      <LoadingIcon size="large" color="#ffffff" />
      <LoadingText>Carregando...</LoadingText>
    </Container>
  );
};
