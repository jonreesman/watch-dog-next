import axios from 'axios';

export default axios.create({
    baseURL: 'https://wdk.project-archon.com:8090/api',
    withCredentials: false,
});