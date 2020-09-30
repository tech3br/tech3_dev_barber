import React, {useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {Button} from 'react-native';
import api from '../../services/api';
import {useNavigation} from '@react-navigation/native';
import AccountIcon from '../../assets/account.svg';
import {Container, HeaderProfile, UserImageProfile, UserName} from './styles';

/*****************************************************************************
  TODOS:
  [] header com: foto do usuario, ao lado esquerdo
  [] header com: infos do usuario (nome, avaliacao, cortes preferidos)
  [] content com: fotos de cortes, comentarios postados, barbeiros curtidos
******************************************************************************/

export default () => {
  const navigation = useNavigation();
  const {state: user} = useContext(UserContext);

  const handleLogoutClick = async () => {
    await api.logout();
    navigation.reset({routes: [{name: 'SignIn'}]});
  };
  console.log(user);
  return (
    <Container>
      <HeaderProfile>
        {user.avatar !== '' ? (
          <UserImageProfile source={{uri: user.avatar}} />
        ) : (
          <AccountIcon width="24" height="24" fill="#FFFFFF" />
        )}
        <UserName>Daniel Filgueira</UserName>
      </HeaderProfile>
      <Button title="sair" onPress={handleLogoutClick} />
    </Container>
  );
};
