import axios from 'axios';

export default axios.create({
    baseURL: 'http://35.172.216.42:8090/api',
    withCredentials: false,
});