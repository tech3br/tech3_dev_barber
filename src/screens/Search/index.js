/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {Container} from './styles';

export default () => {
  useEffect(() => {
    console.log('O componente foi montado!');
  }, []);

  return (
    <Container>
      <Text style={{color: '#fff'}}>Search</Text>
    </Container>
  );
};
