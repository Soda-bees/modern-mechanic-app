import {axiosInstance} from '../Axiosinstance';
import axios from 'axios';

type CheckEmailResponse = {
  message: string;
  success: boolean;
  error?: string;
};

type CheckEmailBody = {
  email: string;
};

export const checkEmail = async (
  body: CheckEmailBody,
): Promise<CheckEmailResponse | undefined> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axiosInstance.post<CheckEmailResponse>(
      'auth/check_email',
      body,
      {headers},
    );
    return response.data; // Return the response data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data; // Return error data if available
    }
    console.error('Error checking email:', error); // Log any other errors
    return undefined; // Return undefined for unknown errors
  }
};

type UploadImageResponse = {
  message: string;
  success: boolean;
  url?: string;
  error?: string;
};

type UploadImageBody = {
  imageUri: File;
};

export const uploadImage = async (
  body: UploadImageBody,
): Promise<UploadImageResponse | undefined> => {
  try {
    const formData = new FormData();
    formData.append('imageUri', body.imageUri); // Append the file to the form data

    const headers = {
      'Content-Type': 'multipart/form-data', // Specify multipart for file upload
    };

    const response = await axiosInstance.post<UploadImageResponse>(
      'user/upload_image', // Endpoint for image upload
      formData,
      {headers},
    );
    return response.data; // Return the response data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data; // Return error data if available
    }
    console.error('Error uploading image:', error); // Log any other errors
    return undefined; // Return undefined for unknown errors
  }
};

type SignupResponse = {
  message: string;
  token: string;
  success: boolean;
  userDetails: any;
  error?: string;
};

type SignupBody = {
  userName: string;
  email: string;
  zip_code: string;
  password: string;
  cars_data: Array<{
    image: string;
    make: string;
    model: string;
    year: number;
    transmission: string;
  }>;
};

export const signup = async (
  body: SignupBody,
): Promise<SignupResponse | undefined> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axiosInstance.post<SignupResponse>(
      'auth/signup',
      body,
      {headers},
    );
    return response.data; // Return the response data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data; // Return error data if available
    }
    console.error('Error during signup:', error); // Log any other errors
    return undefined; // Return undefined for unknown errors
  }
};
