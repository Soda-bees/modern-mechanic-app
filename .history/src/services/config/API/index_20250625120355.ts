import {axiosInstance} from '../Axiosinstance';

const API_ENDPOINTS = {
  checkEmail: '/auth/check_email',
  uploadImage: '/user/upload_image',
  signup: '/auth/signup',
  login: '/auth/login',
  getUserDetails: '/user/get_user_details',
  changePassword: '/user/change_password',
  updateUserData: '/user/update_user_data',
  sendOtp: '/auth/send_otp',
  verifyOtp: '/auth/verify_otp',
  resetPassword: '/auth/reset_password',
  addVehicle: '/user/add_vehicle',
  editVehicle: '/user/edit_vehicle',
  removeVehicle: '/user/remove_vehicle',
  getAllReviews: '/user/get_all_reviews',
  addReview: '/user/add_review',
  editReview: '/user/edit_review',
  deleteReview: '/user/delete_review',
  processDtcs: '/user/process_dtc',
  selectCar: '/user/select_car',
  getAllScans: '/user/get_all_scans',
  submitComplaint: '/user/submit_complaint',
};

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
): Promise<CheckEmailResponse> => {
  try {
    const response = await axiosInstance.post<CheckEmailResponse>(
      API_ENDPOINTS.checkEmail,
      body,
      {
        validateStatus: status => status >= 200 && status < 500,
      },
    );
    return response.data;
  } catch (error: any) {
    console.error('checkEmail API error:', error.message || error);
    return {success: false, message: error.message || 'Unknown error'};
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
): Promise<UploadImageResponse | null> => {
  try {
    const formData = new FormData();
    const fileName = body.imageUri?.split('/').pop(); // Dynamically extract file name
    formData.append('imageUri', {
      uri: body.imageUri,
      name: fileName || 'uploaded_image.jpg', // Default to 'uploaded_image.jpg' if undefined
      type: 'image/jpeg',
    });

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    const response = await axiosInstance.post<UploadImageResponse>(
      API_ENDPOINTS.uploadImage,
      formData,
      {headers, validateStatus: status => status >= 200 && status < 500},
    );

    return response.data;
  } catch (error: any) {
    console.error('UploadImage API error:', error.message || error);
    return {success: false, message: error.message || 'Unknown error'};
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
      API_ENDPOINTS.signup,
      body,
      {headers, validateStatus: status => status >= 200 && status < 500},
    );
    return response.data; // Return the response data
  } catch (error: any) {
    console.error('SignUp API error:', error.message || error);
    throw {success: false, message: error.message || 'Unknown error'};
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
      API_ENDPOINTS.getUserDetails,
      {
        headers,
        validateStatus: status => status >= 200 && status < 500,
      },
    );
    return response.data; // Return the response data
  } catch (error: any) {
    console.error('GetUserDetails API error:', error.message || error);
    throw {success: false, message: error.message || 'Unknown error'};
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
      API_ENDPOINTS.changePassword,
      body,
      {
        headers,
        validateStatus: status => status >= 200 && status < 500,
      },
    );
    return response.data; // Return the response data
  } catch (error: any) {
    console.error('ChangePassword API error:', error.message || error);
    throw {success: false, message: error.message || 'Unknown error'};
  }
};

export type LoginBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  success: boolean;
  token?: string;
  userData?: any;
  error?: any;
};

export const LogIn = async (body: LoginBody): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      API_ENDPOINTS.login,
      body,
      {
        validateStatus: status => status >= 200 && status < 500,
      },
    );

    return response.data;
  } catch (error: any) {
    console.error('LogIn API error:', error.message || error);
    throw {success: false, message: error.message || 'Unknown error'};
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
      API_ENDPOINTS.updateUserData,
      body,
      {
        headers,
        validateStatus: status => status >= 200 && status < 500,
      },
    );
    return response.data; // Return the response data
  } catch (error: any) {
    console.error('UpdateUserData API error:', error.message || error);
    throw {success: false, message: error.message || 'Unknown error'};
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
      API_ENDPOINTS.sendOtp,
      body,
      {
        headers,
        validateStatus: status => status >= 200 && status < 500,
      },
    );
    return response.data; // Return the response data
  } catch (error: any) {
    console.error('SendOtp API error:', error.message || error);
    throw {success: false, message: error.message || 'Unknown error'};
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
      API_ENDPOINTS.verifyOtp,
      body,
      {
        headers,
        validateStatus: status => status >= 200 && status < 500,
      },
    );
    return response.data; // Return the response data
  } catch (error: any) {
    console.error('VerifyOtp API error:', error.message || error);
    throw {success: false, message: error.message || 'Unknown error'};
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
      API_ENDPOINTS.resetPassword,
      body,
      {
        headers,
        validateStatus: status => status >= 200 && status < 500,
      },
    );
    return response.data; // Return the response data
  } catch (error: any) {
    console.error('ResetPassword API error:', error.message || error);
    throw {success: false, message: error.message || 'Unknown error'};
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
  authToken: string | null,
): Promise<AddVehicleResponse> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    const response = await axiosInstance.post<AddVehicleResponse>(
      API_ENDPOINTS.addVehicle,
      body,
      {
        headers,
        validateStatus: status => status >= 200 && status < 500,
      },
    );

    return response.data;
  } catch (error: any) {
    console.error('AddVehicle API error:', error.message || error);
    throw {success: false, message: error.message || 'Unknown error'};
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
      `${API_ENDPOINTS.editVehicle}/${carId}`,
      body,
      {
        headers,
        validateStatus: status => status >= 200 && status < 500,
      },
    );
    return response.data; // Return the response data
  } catch (error: any) {
    console.error('EditVehicle API error:', error.message || error);
    throw {success: false, message: error.message || 'Unknown error'};
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
      `${API_ENDPOINTS.removeVehicle}/${carId}`,
      {
        headers,
        validateStatus: status => status >= 200 && status < 500,
      },
    );
    return response.data; // Return the response data
  } catch (error: any) {
    console.error('RemoveVehicle API error:', error.message || error);
    throw {success: false, message: error.message || 'Unknown error'};
  }
};

export type GetAllReviewsResponse = {
  message: string;
  reviews: any;
  success: boolean;
  error?: any;
};

export const getAllReviews = async (
  authToken: String | null,
): Promise<GetAllReviewsResponse | undefined> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    const response = await axiosInstance.get<GetAllReviewsResponse>(
      API_ENDPOINTS.getAllReviews,
      {
        headers,
        validateStatus: status => status >= 200 && status < 500,
      },
    );
    return response.data; // Return the response data
  } catch (error: any) {
    console.error('GetAllReviews API error:', error.message || error);
    throw {success: false, message: error.message || 'Unknown error'};
  }
};

export type AddReviewBody = {
  reviewerName: string;
  reviewText: string;
  rating: number;
};

export type AddReviewResponse = {
  message: string;
  userData: any;
  review: any;
  success: boolean;
  error?: any;
};

export const addReview = async (
  body: AddReviewBody,
  authToken: String | null,
): Promise<AddReviewResponse | undefined> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    const response = await axiosInstance.post<AddReviewResponse>(
      API_ENDPOINTS.addReview,
      body,
      {
        headers,
        validateStatus: status => status >= 200 && status < 500,
      },
    );
    return response.data; // Return the response data
  } catch (error: any) {
    console.error('AddReview API error:', error.message || error);
    throw {success: false, message: error.message || 'Unknown error'};
  }
};

export type EditReviewBody = {
  reviewText: string;
  rating: number;
};

export type EditReviewResponse = {
  message: string;
  userData: any;
  review: any;
  success: boolean;
  error?: any;
};

export const editReview = async (
  body: EditReviewBody,
  authToken: String | null,
): Promise<EditReviewResponse | undefined> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    const response = await axiosInstance.post<EditReviewResponse>(
      API_ENDPOINTS.editReview,
      body,
      {
        headers,
        validateStatus: status => status >= 200 && status < 500,
      },
    );
    return response.data; // Return the response data
  } catch (error: any) {
    console.error('EditReview API error:', error.message || error);
    throw {success: false, message: error.message || 'Unknown error'};
  }
};

export type DTCResponse = {
  description: string;
  analysis: string;
  repair_instructions: string[];
  urgency_level: string;
  urgency_color: string;
  urgency_explanation: string;
  repair_difficulty: string;
  difficulty_color: string;
  difficulty_explanation: string;
  cost_estimate: string;
  required_parts: string[];
  required_tools: string[];
  youtube_videos: string[];
  user_notes: string;
  code: string;
};

export type ProcessDtcsBody = {
  dtcs: string[];
  userDescription: string;
  vehicleInfo: string;
  vehicleImage?: string;
  vehicleId: any;
};

export type ProcessDtcsResponse = {
  message: string;
  data: DTCResponse[];
  success: boolean;
};

export const processDtcs = async (
  body: ProcessDtcsBody,
  authToken: String | null,
): Promise<ProcessDtcsResponse | undefined> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    const response = await axiosInstance.post<ProcessDtcsResponse>(
      API_ENDPOINTS.processDtcs,
      body,
      {
        headers,
        validateStatus: status => status >= 200 && status < 500,
      },
    );
    return response.data; // Return the response data
  } catch (error: any) {
    console.error('EditReview API error:', error.message || error);
    throw {success: false, message: error.message || 'Unknown error'};
  }
};

export type DeleteReviewResponse = {
  message: string;
  userData: any;
  success: boolean;
  error?: any;
};

export type SelectCarResponse = {
  message: string;
  userData: any;
  success: boolean;
  error?: any;
};

export const selectCar = async (
  authToken: String | null,
  carId: number,
): Promise<SelectCarResponse | undefined> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    const response = await axiosInstance.post<SelectCarResponse>(
      `${API_ENDPOINTS.selectCar}/${carId}`,
      {},
      {
        headers,
        validateStatus: (status: number) => status >= 200 && status < 500,
      },
    );
    return response.data; // Return the response data
  } catch (error: any) {
    console.error('Select Car API error:', error.message || error);
    throw {success: false, message: error.message || 'Unknown error'};
  }
};

export type ScanData = {
  id: number;
  dtcCode: string;
  description: string;
  analysis: string;
  repairInstructions: string;
  urgencyLevel: string;
  urgencyColor: string;
  urgencyExplanation: string;
  repairDifficulty: string;
  difficultyColor: string;
  difficultyExplanation: string;
  costEstimate: string;
  requiredParts: string[];
  requiredTools: string[];
  youtubeVideos: string[];
  userNotes: string;
  vehicleInfo: string;
  vehicleImage: string;
  vehicleId: any;
  createdAt: string;
};

export type GetAllScansResponse = {
  message: string;
  scans: ScanData[];
  success: boolean;
  error?: any;
};

export const getAllScans = async (
  authToken: string | null,
): Promise<GetAllScansResponse | undefined> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
    console.log('heyyyy');

    const response = await axiosInstance.get<GetAllScansResponse>(
      API_ENDPOINTS.getAllScans,
      {
        headers,
        validateStatus: status => status >= 200 && status < 500,
      },
    );
    console.log(response, 'hellooo');

    return response.data;
  } catch (error: any) {
    console.error('GetAllScans API error:', error.message || error);
    throw {success: false, message: error.message || 'Unknown error'};
  }
};

export type submitComplaintBody = {
  scanId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  description: string;
};

export type submitComplaintResponse = {
  message: string;
  complaint: any;
  success: boolean;
  error?: any;
};

export const submitComplaint = async (
  body: submitComplaintBody,
  authToken: string | null,
): Promise<submitComplaintResponse> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    const response = await axiosInstance.post<submitComplaintResponse>(
      API_ENDPOINTS.submitComplaint,
      body,
      {
        headers,
        validateStatus: status => status >= 200 && status < 500,
      },
    );

    return response.data;
  } catch (error: any) {
    console.error('SubmitComplaint API error:', error.message || error);
    throw {success: false, message: error.message || 'Unknown error'};
  }
};

// export const deleteReview = async (
//   authToken: String | null,
// ): Promise<DeleteReviewResponse | undefined> => {
//   try {
//     const headers = {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${authToken}`,
//     };

//     const response = await axiosInstance.post<DeleteReviewResponse>(
//       API_ENDPOINTS.deleteReview,
//       {
//         headers,
//         validateStatus: status => status >= 200 && status < 500,
//       },
//     );
//     return response.data; // Return the response data
//   } catch (error: any) {
//     console.error('DeleteReview API error:', error.message || error);
//     throw {success: false, message: error.message || 'Unknown error'};
//   }
// };
