import React, {useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import InputArea from '../../components/SignInput';
import SearchIcon from '../../assets/search.svg';
import api from '../../services/api';
import Loading from '../../components/Loading';
import BarberItem from '../../components/BarberItem';
import {
  Container,
  Scroller,
  SearchArea,
  ListArea,
  ContentArea,
  BarberInfos,
  BarberName,
  ErrorText,
  ErrorArea,
} from './styles';

export default () => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [listBarbers, setListBarbers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getBarbers = async () => {
    setLoading(true);
    setListBarbers([]);

    let res = await api.getBarbers();
    if (res.error === '') {
      setListBarbers(res.data);
      setLoading(false);
    } else {
      // eslint-disable-next-line no-alert
      alert('Erro: ' + res.error);
    }
  };

  const onRefresh = () => {
    setRefreshing(false);
    getBarbers();
  };

  useEffect(() => {
    getBarbers();
  }, []);

  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <SearchArea>
          <InputArea
            IconSvg={SearchIcon}
            value={searchValue}
            onChangeText={(value) => setSearchValue(value)}
            placeholder="Digite o nome do barbeiro"
          />
        </SearchArea>

        <ContentArea>
          {loading === true ? (
            <Loading />
          ) : (
            // mostra a lista de barbeiros
            <ListArea>
              {listBarbers.map((item, key) => {
                <BarberItem key={key} data={item} />;
              })}
            </ListArea>
          )}
        </ContentArea>
      </Scroller>
    </Container>
  );
};
