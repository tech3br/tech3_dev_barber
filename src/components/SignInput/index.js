import React from 'react';

import {InputArea, Input} from './styles';

export default ({IconSvg, placeholder, value, onChangeText, password}) => {
  return (
    <InputArea>
      <IconSvg width="24" height="24" fill="#443D98" />
      <Input
        placeholder={placeholder}
        placeholderTextColor="#443D98"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
      />
    </InputArea>
  );
};
