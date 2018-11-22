import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://bbuilder-73aff.firebaseio.com/'
});

export default instance;