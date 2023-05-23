import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/login';

const login = async loginCreds => {
  const response = await axios.post(baseUrl, loginCreds);
  return response.data;
};

export default { login };
