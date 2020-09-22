import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useContext} from 'react';
import BarberLogo from '../../assets/barber.svg';
import {Container, LoadingText} from './styles';
import LoadingIcon from '../../components/Loading';
import api from '../../services/api';
import {UserContext} from '../../contexts/UserContext';

export default () => {
  const navigation = useNavigation();
  const {dispatch: userDispatch} = useContext(UserContext);

  // executado antes que o componente for montado
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // validando o token
        let res = await api.checkToken(token);
        if (res.token) {
          // salva o token no Async Storage
          await AsyncStorage.setItem('token', res.token);
          // salva o avatar no Context API
          userDispatch({type: 'setAvatar', payload: {avatar: res.data.avatar}});
          // manda o usuario para o MainTab
          navigation.reset({routes: [{name: 'MainTab'}]});
        } else {
          // nao tem token ? envia pro login!
          navigation.navigate('SignIn');
        }
      } else {
        // nao tem token ? envia pro login!
        navigation.navigate('SignIn');
      }
    };
    checkToken();
  }, [navigation, userDispatch]);

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <LoadingIcon />
    </Container>
  );
};
