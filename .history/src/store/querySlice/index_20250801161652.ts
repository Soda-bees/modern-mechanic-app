import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index'; // Adjust path as needed

export interface ScanInfo {
  dtc_codes: string;
  vehicle_info: string;
}

export interface Query {
  id: number;
  workshop_id: number;
  full_name: string;
  email: string;
  phone_number: string;
  description: string;
  status: string;
  created_at: string;
  scans: ScanInfo[];
}

interface QueryState {
  queries: Query[];
}

const initialState: QueryState = {
  queries: [],
};

const querySlice = createSlice({
  name: 'queries',
  initialState,
  reducers: {
    setQueries: (state, action: PayloadAction<Query[]>) => {
      state.queries = action.payload;
    },
    clearQueries: state => {
      state.queries = [];
    },
  },
});

export const {setQueries, clearQueries} = querySlice.actions;

export const selectQueries = (state: RootState): Query[] =>
  state.queries.queries;

export default querySlice.reducer;
