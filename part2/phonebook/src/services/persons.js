import axios from 'axios';

//const url = 'http://localhost:3001/persons';
//make url work with backend
//const url = 'http://localhost:3002/api/persons';

// after deploymment
const url = '/api/persons';

const getAllPersons = () => {
  return axios.get(url).then(res => {
    return res.data;
  });
};

const createEntry = newObject => {
  return axios.post(url, newObject).then(res => {
    return res.data;
  });
};

const deleteEntry = id => {
  return axios.delete(`${url}/${id}`).then(res => {
    return res.data;
  });
};

const updateEntry = (id, newObject) => {
  return axios.put(`${url}/${id}`, newObject).then(res => {
    return res.data;
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllPersons,
  createEntry,
  deleteEntry,
  updateEntry,
};
