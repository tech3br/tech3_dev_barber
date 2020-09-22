import styled from 'styled-components/native';

export const TabArea = styled.View`
  height: 60px;
  background-color: #171433;
  flex-direction: row;
`;

export const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 35px;
  border: 2px solid #1e1b44;
  margin-top: -20px;
`;

export const AvatarIcon = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`;
