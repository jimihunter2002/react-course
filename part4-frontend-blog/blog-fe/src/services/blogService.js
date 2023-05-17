import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newBlogObj => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlogObj, config);
  return response.data;
};

const update = (id, newBlogObj) => {
  const req = axios.put(`${baseUrl}/${id}`, newBlogObj);
  return req.then(res => res.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  setToken,
  update,
  create,
  getAll,
};
