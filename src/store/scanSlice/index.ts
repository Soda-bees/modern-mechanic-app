import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index'; // Adjust path if needed

export interface ScanData {
  id: number;
  dtcCode: string;
  description: string;
  analysis: string;
  repairInstructions: string[];
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
}

interface ScanState {
  scans: ScanData[];
}

const initialState: ScanState = {
  scans: [],
};

const scanSlice = createSlice({
  name: 'scans',
  initialState,
  reducers: {
    setScans: (state, action: PayloadAction<ScanData[]>) => {
      state.scans = action.payload;
    },
    clearScans: state => {
      state.scans = [];
    },
  },
});

export const {setScans, clearScans} = scanSlice.actions;

export const selectScans = (state: RootState): ScanData[] => state.scans.scans;

export default scanSlice.reducer;
