import axios from 'axios'

const BASE_URL = "http://localhost:8080";

export const registerUser = (user) =>  axios.post(`${BASE_URL}/user/register`,user);

export const loginUser = (user) =>  axios.post(`${BASE_URL}/user/login`,user);