import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext} from 'react';
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import SignInput from '../../components/SignInput';
import api from '../../services/api';
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

export default () => {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const {dispatch: userDispatch} = useContext(UserContext);
  const navigation = useNavigation();

  // funcao que faz login
  const handleSignClick = async () => {
    if (emailField !== '' && passwordField !== '') {
      let res = await api.signIn(emailField, passwordField);
      if (res.token) {
        // salva o token no Async Storage
        await AsyncStorage.setItem('token', res.token);
        // salva o avatar no Context API
        userDispatch({type: 'setAvatar', payload: {avatar: res.data.avatar}});
        // manda o usuario para o MainTab
        navigation.reset({routes: [{name: 'MainTab'}]});
      } else {
        // eslint-disable-next-line no-alert
        alert(res.error);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Preencha todos os campos!');
    }
  };

  // funcao que puxa para a pagina de cadastro
  const handleMessageButtonClick = () => {
    navigation.reset({routes: [{name: 'SignUp'}]});
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <InputArea>
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
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>
          Ainda nao possui uma conta?
        </SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
