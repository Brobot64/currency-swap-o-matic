
import axios from 'axios';
import { basisUrl } from './api';

const BASE_URL = `${basisUrl}/api/rate-email-recipients`;

export const getRecipients = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getRecipient = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createRecipient = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const updateRecipient = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

export const deleteRecipient = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
