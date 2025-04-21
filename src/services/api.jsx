import axios from 'axios';

const API = axios.create({
  baseURL:"https://cors-anywhere.herokuapp.com/https://stem.dawillygene.com/api",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export default API;
