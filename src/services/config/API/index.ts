import {useSelector} from 'react-redux';
import {axiosInstance} from '../Axiosinstance';
import axios from 'axios';
import {selectAuthToken} from '../../../store/authSlice';

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

interface UploadImageBody {
  imageUri: string | undefined; // or just 'string' if it's always required
}
export const uploadImage = async (
  body: UploadImageBody,
): Promise<UploadImageResponse | undefined> => {
  try {
    const formData = new FormData();
    // Add the actual file to the formData
    formData.append('imageUri', {
      uri: body.imageUri, // The file URI
      name: 'uploaded_image.jpg', // A default file name
      type: 'image/jpeg', // File type
    });

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
  userDeta: any;
  error?: any;
};

export type SignupBody = {
  name: string;
  email: string;
  zipCode: number;
  password: string;
  cars: Array<{
    image: string;
    make: string;
    model: string;
    year: number;
    transmission: string;
  }>;
};

export const signUp = async (
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

type GetUserDataResponse = {
  message: string;
  success: boolean;
  userData: any;
  error?: any;
};

export const getUserDetails = async (
  authToken: String | null,
): Promise<GetUserDataResponse | undefined> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`, // Replace with the token from your Redux or storage
    };

    const response = await axiosInstance.get<GetUserDataResponse>(
      '/user/get_user_details',
      {
        headers,
      },
    );
    return response.data; // Return the response data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data; // Return error data if available
    }
    console.error('Error retrieving user details:', error); // Log any other errors
    return undefined; // Return undefined for unknown errors
  }
};

export type ChangePasswordBody = {
  oldPassword: string;
  newPassword: string;
};

export type ChangePasswordResponse = {
  message: string;
  success: boolean;
  error?: any;
};

export const changePassword = async (
  body: ChangePasswordBody,
  authToken: String | null,
): Promise<ChangePasswordResponse | undefined> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`, // Replace with the token from your Redux or storage
    };

    const response = await axiosInstance.post<ChangePasswordResponse>(
      '/user/change_password',
      body,
      {
        headers,
      },
    );
    return response.data; // Return the response data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data; // Return error data if available
    }
    console.error('Error retrieving user details:', error); // Log any other errors
    return undefined; // Return undefined for unknown errors
  }
};

export type LoginBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  success: boolean;
  token: string;
  userData: any;
  error?: any;
};

export const LogIn = async (
  body: LoginBody,
): Promise<LoginResponse | undefined> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await axiosInstance.post<LoginResponse>(
      '/auth/login',
      body,
      {
        headers,
      },
    );
    return response.data; // Return the response data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data; // Return error data if available
    }
    console.error('Error retrieving user details:', error); // Log any other errors
    return undefined; // Return undefined for unknown errors
  }
};

export type UpdateUserDataBody = {
  name: string;
  zipCode: number;
};

export type UpdateUserDataResponse = {
  message: string;
  userData: any;
  success: boolean;
  error?: any;
};

export const updateUserData = async (
  body: UpdateUserDataBody,
  authToken: String | null,
): Promise<UpdateUserDataResponse | undefined> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    const response = await axiosInstance.post<UpdateUserDataResponse>(
      '/user/update_user_data',
      body,
      {
        headers,
      },
    );
    return response.data; // Return the response data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data; // Return error data if available
    }
    console.error('Error retrieving user details:', error); // Log any other errors
    return undefined; // Return undefined for unknown errors
  }
};

export type SendOtpBody = {
  email: string;
};

export type SendOtpResponse = {
  message: string;
  otp: string;
  success: boolean;
  error?: any;
};

export const sendOtp = async (
  body: SendOtpBody,
): Promise<SendOtpResponse | undefined> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await axiosInstance.post<SendOtpResponse>(
      '/auth/send_otp',
      body,
      {
        headers,
      },
    );
    return response.data; // Return the response data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data; // Return error data if available
    }
    console.error('Error retrieving user details:', error); // Log any other errors
    return undefined; // Return undefined for unknown errors
  }
};

export type VerifyOtpBody = {
  email: string;
  otp: string;
};

export type VerifyOtpResponse = {
  message: string;
  success: boolean;
  error?: any;
};

export const verifyOtp = async (
  body: VerifyOtpBody,
): Promise<VerifyOtpResponse | undefined> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await axiosInstance.post<VerifyOtpResponse>(
      '/auth/verify_otp',
      body,
      {
        headers,
      },
    );
    return response.data; // Return the response data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data; // Return error data if available
    }
    console.error('Error retrieving user details:', error); // Log any other errors
    return undefined; // Return undefined for unknown errors
  }
};

export type ResetPasswordBody = {
  email: string;
  newPassword: string;
};

export type ResetPasswordResponse = {
  message: string;
  otp: string;
  success: boolean;
  error?: any;
};

export const resetPassword = async (
  body: ResetPasswordBody,
): Promise<ResetPasswordResponse | undefined> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await axiosInstance.post<ResetPasswordResponse>(
      '/auth/reset_password',
      body,
      {
        headers,
      },
    );
    return response.data; // Return the response data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data; // Return error data if available
    }
    console.error('Error retrieving user details:', error); // Log any other errors
    return undefined; // Return undefined for unknown errors
  }
};

export type AddVehicleBody = {
  image: string;
  make: string;
  model: string;
  year: number;
  transmission: string;
};

export type AddVehicleResponse = {
  message: string;
  userData: any;
  success: boolean;
  error?: any;
};

export const addVehicle = async (
  body: AddVehicleBody,
  authToken: String | null,
): Promise<AddVehicleResponse | undefined> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    const response = await axiosInstance.post<AddVehicleResponse>(
      '/user/add_vehicle',
      body,
      {
        headers,
      },
    );
    return response.data; // Return the response data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data; // Return error data if available
    }
    console.error('Error retrieving user details:', error); // Log any other errors
    return undefined; // Return undefined for unknown errors
  }
};

export type EditVehicleBody = {
  image: string;
  make: string;
  model: string;
  year: number;
  transmission: string;
};

export type EditVehicleResponse = {
  message: string;
  userData: any;
  success: boolean;
  error?: any;
};

export const editVehicle = async (
  body: EditVehicleBody,
  authToken: String | null,
  carId: number,
): Promise<EditVehicleResponse | undefined> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    const response = await axiosInstance.post<EditVehicleResponse>(
      `/user/edit_vehicle/${carId}`,
      body,
      {
        headers,
      },
    );
    return response.data; // Return the response data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data; // Return error data if available
    }
    console.error('Error retrieving user details:', error); // Log any other errors
    return undefined; // Return undefined for unknown errors
  }
};

export type RemoveVehicleResponse = {
  message: string;
  userData: any;
  success: boolean;
  error?: any;
};

export const removeVehicle = async (
  authToken: String | null,
  carId: number,
): Promise<RemoveVehicleResponse | undefined> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    const response = await axiosInstance.delete<RemoveVehicleResponse>(
      `/user/remove_vehicle/${carId}`,
      {
        headers,
      },
    );
    return response.data; // Return the response data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data; // Return error data if available
    }
    console.error('Error retrieving user details:', error); // Log any other errors
    return undefined; // Return undefined for unknown errors
  }
};
