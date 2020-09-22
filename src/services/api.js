import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'https://api.b7web.com.br/devbarber/api';

export default {
  // refresh do token
  checkToken: async (token) => {
    const req = await fetch(`${BASE_API}/auth/refresh`, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({token}),
    });
    const json = await req.json();
    return json;
  },

  // requisicao de login
  signIn: async (email, password) => {
    const req = await fetch(`${BASE_API}/auth/login`, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    });
    const json = await req.json();
    return json;
  },

  // requisicao de cadastro
  signUp: async (name, email, password) => {
    const req = await fetch(`${BASE_API}/user`, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({name, email, password}),
    });
    const json = await req.json();
    return json;
  },

  // logout
  logout: async () => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/auth/logout`, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify(token),
    });
    const json = await req.json();
    return json;
  },

  // buscar barbeiros
  getBarbers: async (lat = null, long = null, address = null) => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(
      `${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${long}&address=${address}`,
    );
    const json = await req.json();
    return json;
  },
  // buscar um unico barbeiro
  getBarber: async (id) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/barber/${id}?token=${token}`);
    const json = await req.json();
    return json;
  },
  setAppointment: async (
    userId,
    service,
    selectedYear,
    selectedMonth,
    selectedDay,
    selectedHour,
  ) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/user/appointment`, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
        token,
        id: userId,
        service,
        year: selectedYear,
        month: selectedMonth,
        day: selectedDay,
        hour: selectedHour,
      }),
    });
    const json = await req.json();
    return json;
  },
};
