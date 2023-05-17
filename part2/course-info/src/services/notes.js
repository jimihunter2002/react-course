import axios from 'axios';
//const baseUrl = 'http://localhost:3001/notes';

//this works with the help of cors as they are not on the same domain
//const baseUrl = 'http://localhost:3001/api/notes';
//fly.io deployment
//const baseUrl = 'https://my-note-app.fly.dev/api/notes';

const baseUrl = '/api/notes'; // relative path after moving frontend into backend folder
// both FE and BE are on the same address

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  };
  const request = axios.get(baseUrl);
  return request.then(response => response.data.concat(nonExisting));
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
  // const request = await axios.post(baseUrl, newObject, config);
  // return request.then(response => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  update,
  setToken,
};
