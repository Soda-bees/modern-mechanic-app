import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';

// Define the base URL for the API
// export const BASE_URL: string = 'http://192.168.100.199:5000/';
// export const BASE_URL: string = 'http://192.168.18.27:5000/';

export const BASE_URL: string = 'https://obd-8dbb3da637bf.herokuapp.com/'; // Live

// Create an Axios instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Define a type for the error response
type ErrorResponse = {
  message?: string;
  [key: string]: any; // To allow other properties in the response
};

// Centralized error handling
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Successful response
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    // Centralized error handling logic
    if (error.response) {
      const {status, data} = error.response;
      console.error(`Error [${status}]:`, data?.message || data);
      return Promise.reject({
        success: false,
        status,
        message: data?.message || 'An error occurred',
        data,
      });
    } else if (error.request) {
      console.error('No response received:', error.request);
      return Promise.reject({
        success: false,
        message:
          'No response from server. Please check your network connection.',
      });
    } else {
      console.error('Request setup error:', error.message);
      return Promise.reject({
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
      });
    }
  },
);

// code before error handeling

// import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';

// // Define the base URL for the API
// export const BASE_URL: string = 'http://192.168.100.111:5000/';
// // export const BASE_URL: string = 'https://obd-8dbb3da637bf.herokuapp.com/'; // Live

// // Create an Axios instance
// export const axiosInstance: AxiosInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// // Set up response interceptors
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
//       console.error('Error response:', error.response); // Log response error details
//       return Promise.reject(error.response); // Return the error response object
//     } else if (error.request) {
//       // The request was made, but no response was received
//       console.error('Error request:', error.request); // Log request details
//     } else {
//       // Something happened in setting up the request that triggered an error
//       console.error('Error message:', error.message); // Log message error details
//     }
//     // Reject the promise with the error for further handling
//     return Promise.reject(error);
//   },
// );

// very old code

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
