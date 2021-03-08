import { Platform } from 'react-native'


let baseURL = 'https://cdp-backend1.herokuapp.com/api/v1/';

// {Platform.OS == 'android'
// ? baseURL = 'http://10.0.2.2:5006/api/v1/'
// : baseURL = 'http://localhost:5006/api/v1/'
// }

export default baseURL;
