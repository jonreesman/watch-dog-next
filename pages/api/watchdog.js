import axios from 'axios';

export default axios.create({
    baseURL: 'http://54.163.14.12:8080/api',
    withCredentials: false,
});