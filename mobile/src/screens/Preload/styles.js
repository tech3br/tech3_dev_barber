import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background-color: #000000;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;

export const LoadingText = styled.Text`
  font-size: 16px;
  color: #ffffff;
`;
