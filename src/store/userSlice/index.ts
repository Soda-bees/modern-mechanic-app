import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index'; // Adjust the path to your store

interface Car {
  image: string;
  make: string;
  model: string;
  year: number;
  transmission: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  zipCode: number;
  cars: Car[];
}

interface UserState {
  userData: UserData | null;
}

const initialState: UserState = {
  userData: null,
};

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    removeUserData: state => {
      state.userData = null;
    },
  },
});

export const {setUserData, removeUserData} = userSlice.actions;

// Selector with proper RootState typing
export const selectUserData = (state: RootState): UserData | null =>
  state.user.userData;

export default userSlice.reducer;
