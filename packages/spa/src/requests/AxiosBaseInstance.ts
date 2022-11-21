import axios from 'axios';

export const axiosBaseInstance = axios.create({
    baseURL: "http://localhost:3001/",
    timeout: 1000
});

