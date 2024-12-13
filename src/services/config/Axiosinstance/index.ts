import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';

// Define the base URL for the API
export const BASE_URL: string = 'http://192.168.100.111:5000/';

// Create an Axios instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Set up response interceptors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Successful response
    return response;
  },
  (error: AxiosError) => {
    // Handle errors
    if (error.response) {
      // The request was made, and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response:', error.response); // Log response error details
      return Promise.reject(error.response); // Return the error response object
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('Error request:', error.request); // Log request details
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error message:', error.message); // Log message error details
    }
    // Reject the promise with the error for further handling
    return Promise.reject(error);
  },
);

// Set up response interceptors
// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     // Successful response
//     return response;
//   },
//   (error: AxiosError) => {
//     // Handle errors
//     if (error.response) {
//       // The request was made, and the server responded with a status code
//       // that falls out of the range of 2xx
//       // console.log('Response data:', error.response.data);
//       // console.log('Response status:', error.response.status);
//       // console.log('Response headers:', error.response.headers);
//       return error.response; // Returning the error response object
//     } else if (error.request) {
//       // The request was made, but no response was received
//       // console.log('Request:', error.request);
//     } else {
//       // Something happened in setting up the request that triggered an error
//       // console.log('Error:', error.message);
//     }
//     // console.log('Config:', error.config);
//     return Promise.reject(error); // Reject the promise with the error
//   },
// );
