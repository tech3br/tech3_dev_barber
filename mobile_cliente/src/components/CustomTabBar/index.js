import React, {useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {TabArea, TabItem, TabItemCenter, AvatarIcon} from './styles';
import HomeIcon from '../../assets/home.svg';
import SearchIcon from '../../assets/search.svg';
import TodayIcon from '../../assets/today.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import AccountIcon from '../../assets/account.svg';

export default ({state, navigation}) => {
  const {state: user} = useContext(UserContext);

  // function tooltip para navegar ate a tela desejada
  // Ir para qual tela...
  const goTo = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <TabArea>
      <TabItem
        // eslint-disable-next-line react-native/no-inline-styles
        style={{backgroundColor: state.index === 0 ? '#262255' : null}}
        onPress={() => goTo('Home')}>
        <HomeIcon width="24" height="24" fill="#FFFFFF" />
      </TabItem>
      <TabItem
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: state.index === 1 ? '#262255' : null,
        }}
        onPress={() => goTo('Search')}>
        <SearchIcon width="24" height="24" fill="#FFFFFF" />
      </TabItem>
      <TabItemCenter onPress={() => goTo('Appointments')}>
        <TodayIcon width="32" height="32" fill="#171433" />
      </TabItemCenter>
      <TabItem
        // eslint-disable-next-line react-native/no-inline-styles
        style={{backgroundColor: state.index === 3 ? '#262255' : null}}
        onPress={() => goTo('Favorites')}>
        <FavoriteIcon width="24" height="24" fill="#FFFFFF" />
      </TabItem>
      <TabItem
        // eslint-disable-next-line react-native/no-inline-styles
        style={{backgroundColor: state.index === 4 ? '#262255' : null}}
        onPress={() => goTo('Profile')}>
        {user.avatar !== '' ? (
          <AvatarIcon source={{uri: user.avatar}} />
        ) : (
          <AccountIcon width="24" height="24" fill="#FFFFFF" />
        )}
      </TabItem>
    </TabArea>
  );
};
