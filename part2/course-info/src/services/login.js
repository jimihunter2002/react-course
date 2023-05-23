import axios from 'axios';
//const baseUrl = 'http://localhost:3001/notes';

//this works with the help of cors as they are not on the same domain
//const baseUrl = 'http://localhost:3001/api/notes';
//fly.io deployment
//const baseUrl = 'https://my-note-app.fly.dev/api/notes';

const baseUrl = '/api/login'; // relative path after moving frontend into backend folder
// both FE and BE are on the same address

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
