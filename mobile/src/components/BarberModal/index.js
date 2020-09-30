/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import months from '../../configs/months';
import days from '../../configs/days';
import ExpandIcon from '../../assets/expand.svg';
import NavNextIcon from '../../assets/nav_next.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import {
  CloseButton,
  FinishButton,
  FinishButtonText,
  Modal,
  ModalArea,
  ModalBody,
  ModalItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  UserAvatar,
  UserInfo,
  UserName,
  DateInfo,
  DatePrevArea,
  DateTitleArea,
  DateTitle,
  DateNextArea,
  DateList,
  DateItem,
  DateItemWeekDay,
  DateItemNumber,
  TimeList,
  TimeItem,
  TimeItemText,
} from './styles';
export default ({show, setShow, user, service}) => {
  const navigation = useNavigation();

  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);
  const [listDays, setListDays] = useState([]);
  const [listHours, setListHours] = useState([]);

  // Fechar o modal
  const handleCloseButton = () => {
    setShow(false);
  };

  // Finalizar o agendamento
  const handleClickFinishAppointment = async () => {
    if (
      user.id &&
      service !== null &&
      selectedYear > 0 &&
      selectedMonth > 0 &&
      selectedDay > 0 &&
      selectedHour !== null
    ) {
      // Quando existir o endpoint no webservice para agendamento descomentar estas linhas
      /*let res = await api.setAppointment(
        user.id,
        service,
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedHour,
      );
      if (res.error === '') {
        setShow(false);
        navigation.navigate('Appointments');
      } else {
        alert(res.error);
      }*/

      setShow(false);
      navigation.navigate('Appointments');
    } else {
      alert('Preencha todos os campos!');
    }
  };

  // Ir para o mes anterior
  const handleLeftDateClick = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() - 1);
    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(0);
  };

  // Ir para o mes seguinte
  const handleRightDateClick = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() + 1);
    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(0);
  };

  useEffect(() => {
    let today = new Date();
    setSelectedYear(today.getFullYear());
    // O mes no JS comeca com 0
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDate());
  }, []);

  useEffect(() => {
    if (user.available !== undefined && user.available !== null) {
      // Trick para saber quantos dias o mes tem (devo ter o ano e o mes)
      let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      let newListDays = [];

      for (let i = 1; i <= daysInMonth; i++) {
        let d = new Date(selectedYear, selectedMonth, i);
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        let selDate = `${year}-${month}-${day}`;

        // Trick para procurar se existe aquela data dentro do array do webservice, se tiver bate e o barbeiro tem disponibilidade
        let availability = user.available.filter((e) => e.date === selDate);

        newListDays.push({
          status: availability.length > 0 ? true : false,
          weekday: days[d.getDay()],
          number: i,
        });
      }

      setListDays(newListDays);
      setSelectedDay(0);
      setListHours([]);
      setSelectedHour(0);
    }
  }, [user, selectedMonth, selectedYear]);

  useEffect(() => {
    if (user.available !== undefined && user.available !== null) {
      if (selectedDay > 0) {
        let d = new Date(selectedYear, selectedMonth, selectedDay);
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        let selDate = `${year}-${month}-${day}`;

        let availability = user.available.filter((e) => e.date === selDate);

        if (availability.length > 0) {
          setListHours(availability[0].hours);
        }
      }
    }
    setSelectedHour(null);
  }, [user, selectedDay, selectedMonth, selectedYear]);

  return (
    <Modal transparent={true} visible={show} animationType="slide">
      <ModalArea>
        <ModalBody>
          <CloseButton onPress={handleCloseButton}>
            <ExpandIcon width="30" height="30" fill="#FFF" />
          </CloseButton>
          <ModalItem>
            <UserInfo>
              <UserAvatar source={{uri: user.avatar}} />
              <UserName>{user.name}</UserName>
            </UserInfo>
          </ModalItem>
          {service !== null && (
            <ModalItem>
              <ServiceInfo>
                <ServiceName>{user.services[service].name}</ServiceName>
                <ServicePrice>
                  R$ {user.services[service].price.toFixed(2)}
                </ServicePrice>
              </ServiceInfo>
            </ModalItem>
          )}

          <ModalItem>
            <DateInfo>
              <DatePrevArea onPress={handleLeftDateClick}>
                <NavPrevIcon width="35" height="35" fill="#fff" />
              </DatePrevArea>
              <DateTitleArea>
                <DateTitle>
                  {months[selectedMonth]} {selectedYear}
                </DateTitle>
              </DateTitleArea>
              <DateNextArea onPress={handleRightDateClick}>
                <NavNextIcon width="35" height="35" fill="#fff" />
              </DateNextArea>
            </DateInfo>

            <DateList horizontal={true} showsHorizontalScrollIndicator={false}>
              {listDays.map((item, key) => (
                <DateItem
                  key={key}
                  onPress={() =>
                    item.status ? setSelectedDay(item.number) : null
                  }
                  style={{
                    opacity: item.status ? 1 : 0.4,
                    backgroundColor:
                      item.number === selectedDay ? '#1e1b44' : '#000',
                  }}>
                  <DateItemWeekDay
                    style={{
                      fontWeight:
                        item.number === selectedDay ? 'bold' : 'normal',
                    }}>
                    {item.number}
                  </DateItemWeekDay>
                  <DateItemNumber
                    style={{
                      fontWeight:
                        item.number === selectedDay ? 'bold' : 'normal',
                    }}>
                    {item.weekday}
                  </DateItemNumber>
                </DateItem>
              ))}
            </DateList>
          </ModalItem>

          {selectedDay > 0 && listHours.length > 0 && (
            <ModalItem>
              <TimeList
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {listHours.map((item, key) => (
                  <TimeItem
                    key={key}
                    onPress={() => setSelectedHour(item)}
                    style={{
                      backgroundColor:
                        item === selectedHour ? '#1e1b44' : '#000',
                    }}>
                    <TimeItemText
                      style={{
                        fontWeight: item === selectedHour ? 'bold' : 'normal',
                      }}>
                      {item}
                    </TimeItemText>
                  </TimeItem>
                ))}
              </TimeList>
            </ModalItem>
          )}

          <FinishButton onPress={handleClickFinishAppointment}>
            <FinishButtonText>Finalizar Agendamento</FinishButtonText>
          </FinishButton>
        </ModalBody>
      </ModalArea>
    </Modal>
  );
};
