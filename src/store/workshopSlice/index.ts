import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index'; // Adjust path as needed

export interface Workshop {
  id: number;
  image: string;
  name: string;
  email: string;
  phone_number: string;
  zipcode: string;
  website_link: string;
  description: string;
  address: string;
  created_at: string;
}

interface WorkshopState {
  workshops: Workshop[];
}

const initialState: WorkshopState = {
  workshops: [],
};

const workshopSlice = createSlice({
  name: 'workshops',
  initialState,
  reducers: {
    setWorkshops: (state, action: PayloadAction<Workshop[]>) => {
      state.workshops = action.payload;
    },
    clearWorkshops: state => {
      state.workshops = [];
    },
  },
});

export const {setWorkshops, clearWorkshops} = workshopSlice.actions;

export const selectWorkshops = (state: RootState): Workshop[] =>
  state.workshops.workshops;

export default workshopSlice.reducer;
