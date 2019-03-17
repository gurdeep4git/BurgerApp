import axios from 'axios';

const instance = axios.create( {
    baseURL: 'https://burger-app-4c372.firebaseio.com/',
});

export default instance;