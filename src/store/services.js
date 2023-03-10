// @ts-nocheck
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const API_URL = 'http://localhost:8080';

axios.interceptors.request.use((request) => {
  return request;
});

export const fetchAll = async (service) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${API_URL}/admin/${service}/all`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.code === '000') {
      return response.data.body;
    } else {
      throw Error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addItem = async (service, addObj) => {
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/admin/${service}/add`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: JSON.stringify({ ...addObj, staff: decoded.username })
    });

    if (response.data.code === '000') {
      return response.data.body;
    } else {
      throw Error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateItem = async (service, addObj) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/admin/${service}/update`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: JSON.stringify(addObj)
    });

    if (response.data.code === '000') {
      return response.data.body;
    } else {
      throw Error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteItem = async (service, itemId) => {
  try {
    const response = await axios({
      method: 'delete',
      url: `${API_URL}/admin/${service}/delete/${itemId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.code === '000') {
      return true;
    } else {
      throw Error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const authenticate = async (credentials) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/authenticate/`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(credentials)
    });

    if (response.data.code === '000') {
      localStorage.setItem('token', response.data.body.token);
      return response.data.body.token;
    } else {
      throw Error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
