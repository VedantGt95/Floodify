import axios from 'axios'

const BASE_URL = "http://13.204.45.167:8080";

export const registerUser = (user) =>  axios.post(`${BASE_URL}/user/register`,user);

export const loginUser = (user) =>  axios.post(`${BASE_URL}/user/login`,user);

export const loginAdmin = (admin) =>  axios.post(`${BASE_URL}/admin/login`,admin);

export const getMarkers = () => axios.get(`${BASE_URL}/markers/getmarker`);

export const setMarker = (marker) => axios.post(`${BASE_URL}/markers/setmarker`, marker);

export const verifyMarker = (id) => axios.put(`${BASE_URL}/markers/${id}/verify`);

export const deleteMarker = (id) => axios.delete(`${BASE_URL}/markers/${id}`);

export const getFloodAreas = () => axios.get(`${BASE_URL}/flood/areas`);

export const addFloodArea = (marker) => axios.post(`${BASE_URL}/flood/add`, marker);

export const verifyFloodArea = (id) => axios.put(`${BASE_URL}/flood/${id}/verify`);

export const deleteFloodArea = (id) => axios.delete(`${BASE_URL}/flood/${id}`);
