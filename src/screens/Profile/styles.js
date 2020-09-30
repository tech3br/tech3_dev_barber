import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #000000;
`;

export const HeaderProfile = styled.View`
  padding: 15px;
  background-color: #000000;
  flex-direction: row;
`;

export const UserImageProfile = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const UserName = styled.Text`
  color: #ffffff;
  font-size: 17px;
  font-weight: bold;
`;
