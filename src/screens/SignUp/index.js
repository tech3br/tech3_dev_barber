import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext} from 'react';
import BarberLogo from '../../assets/barber.svg';
import SignInput from '../../components/SignInput';
import {UserContext} from '../../contexts/UserContext';
import {
  Container,
  CustomButton,
  CustomButtonText,
  InputArea,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';
import api from '../../services/api';

import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const {dispatch: userDispatch} = useContext(UserContext);
  const navigation = useNavigation();

  // funcao que faz cadastro
  const handleSignClick = async () => {
    if (nameField !== '' && emailField !== '' && passwordField !== '') {
      let res = await api.signUp(nameField, emailField, passwordField);
      if (res.token) {
        // salva o token no Async Storage
        await AsyncStorage.setItem('token', res.token);
        // salva o avatar no Context API
        userDispatch({type: 'setAvatar', payload: {avatar: res.data.avatar}});
        // manda o usuario para o MainTab
        navigation.reset({routes: [{name: 'MainTab'}]});
      } else {
        // eslint-disable-next-line no-alert
        alert('Erro: ' + res.error);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Preencha os campos');
    }
  };

  const handleMessageButtonClick = () => {
    navigation.reset({routes: [{name: 'SignIn'}]});
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <InputArea>
        {/* Input de Nome */}
        <SignInput
          IconSvg={PersonIcon}
          placeholder="Digite seu nome"
          value={nameField}
          onChangeText={(text) => setNameField(text)}
        />
        {/* Input de Email */}
        <SignInput
          IconSvg={EmailIcon}
          placeholder="Digite seu email"
          value={emailField}
          onChangeText={(text) => setEmailField(text)}
        />
        {/* Input de Senha */}
        <SignInput
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={(text) => setPasswordField(text)}
          password={true}
        />
        {/* Botao de Login */}
        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Ja possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faca Login</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
