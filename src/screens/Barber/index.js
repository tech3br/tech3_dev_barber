/* eslint-disable react-native/no-inline-styles */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Container,
  Scroller,
  FakeSwiper,
  PageBody,
  TestimonialArea,
  TestimonialItem,
  TestimonialInfo,
  TestimonialName,
  TestimonialBody,
  SwipeDot,
  SwipeItem,
  SwipeImage,
  UserInfoArea,
  UserAvatar,
  UserInfo,
  UserInfoName,
  UserFavButton,
  BackButton,
  ServicesTitle,
  ServiceArea,
  ServiceItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  ServiceChooseButton,
  ServiceChooseButtonText,
} from './styles';
import api from '../../services/api';
import Stars from '../../components/Stars';
import BarberModal from '../../components/BarberModal';
import Loading from '../../components/Loading';
import Swiper from 'react-native-swiper';
import FavoriteIcon from '../../assets/favorite.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [userInfo, setUserInfo] = useState({
    id: route.params.id,
    avatar: route.params.avatar,
    name: route.params.name,
    stars: route.params.stars,
  });
  const [loading, setLoading] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleFavClick = () => {
    setFavorited(!favorited);
  };

  const handleServiceChoose = (key) => {
    setSelectedService(key);
    setShowModal(true);
  };

  useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true);

      let json = await api.getBarber(userInfo.id);
      if (json.error === '') {
        setUserInfo(json.data);
        setFavorited(json.data.favorited);
      } else {
        // eslint-disable-next-line no-alert
        alert('Erro: ' + json.error);
      }
      setLoading(false);
    };
    getBarberInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Scroller>
        {userInfo.photos && userInfo.photos.length > 0 ? (
          <Swiper
            style={{height: 240}}
            dot={<SwipeDot />}
            activeDot={<SwipeDot active />}
            paginationStyle={{
              top: 15,
              right: 15,
              bottom: null,
              left: null,
            }}
            autoPlay={true}>
            {userInfo.photos.map((item, key) => {
              <SwipeItem key={key}>
                <SwipeImage source={{uri: item.url}} resizeMode="cover" />
              </SwipeItem>;
            })}
          </Swiper>
        ) : (
          <FakeSwiper />
        )}
        <PageBody>
          <UserInfoArea>
            <UserAvatar source={{uri: userInfo.avatar}} />
            <UserInfo>
              <UserInfoName>{userInfo.name}</UserInfoName>
              <Stars stars={userInfo.stars} showNumber />
            </UserInfo>
            <UserFavButton onPress={handleFavClick}>
              {favorited ? (
                <FavoriteFullIcon width="24" height="23" fill="red" />
              ) : (
                <FavoriteIcon width="24" height="23" fill="#000" />
              )}
            </UserFavButton>
          </UserInfoArea>
          {loading && <Loading />}
          {userInfo.services && (
            <ServiceArea>
              <ServicesTitle>Lista de Serviços</ServicesTitle>
              {userInfo.services.map((item, key) => (
                <ServiceItem key={key}>
                  <ServiceInfo>
                    <ServiceName>{item.name}</ServiceName>
                    <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                  </ServiceInfo>
                  <ServiceChooseButton onPress={() => handleServiceChoose(key)}>
                    <ServiceChooseButtonText>Agendar</ServiceChooseButtonText>
                  </ServiceChooseButton>
                </ServiceItem>
              ))}
            </ServiceArea>
          )}
          {userInfo.testimonials && userInfo.testimonials.length > 0 && (
            <TestimonialArea>
              <Swiper
                style={{height: 110}}
                showsPagination={false}
                showsButtons={true}
                prevButton={<NavPrevIcon width="35" height="35" fill="#fff" />}
                nextButton={<NavNextIcon width="35" height="35" fill="#fff" />}>
                {userInfo.testimonials.map((item, key) => (
                  <TestimonialItem key={key}>
                    <TestimonialInfo>
                      <TestimonialName></TestimonialName>
                      <Stars stars={userInfo.stars} showNumber={false} />
                    </TestimonialInfo>
                    <TestimonialBody>{item.body}</TestimonialBody>
                  </TestimonialItem>
                ))}
              </Swiper>
            </TestimonialArea>
          )}
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <BackIcon width="44" height="44" fill="#fff" />
      </BackButton>

      <BarberModal
        show={showModal}
        setShow={setShowModal}
        user={userInfo}
        service={selectedService}
      />
    </Container>
  );
};
