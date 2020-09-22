import React from 'react';
import {Button, Text} from 'react-native';
import api from '../../services/api';
import {useNavigation} from '@react-navigation/native';
import {Container} from './styles';

export default () => {
  const navigation = useNavigation();

  const handleLogoutClick = async () => {
    await api.logout();
    navigation.reset({routes: [{name: 'SignIn'}]});
  };
  return (
    <Container>
      <Text>Profile</Text>
      <Button title="sair" onPress={handleLogoutClick} />
    </Container>
  );
};
