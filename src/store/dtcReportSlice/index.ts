import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index'; // Adjust the path to your store
import {DTCResponse} from '../../services/config/API';

interface DtcReportState {
  dtcReport: DTCResponse[] | null;
}

const initialState: DtcReportState = {
  dtcReport: null,
};

const dtcReportSlice = createSlice({
  name: 'dtcReport',
  initialState,
  reducers: {
    setDtcReport: (state, action: PayloadAction<DTCResponse[]>) => {
      state.dtcReport = action.payload;
    },
    removeDtcReport: state => {
      state.dtcReport = null;
    },
  },
});

export const {setDtcReport, removeDtcReport} = dtcReportSlice.actions;

// Selector with proper RootState typing
export const selectDtcReport = (state: RootState): DTCResponse[] | null =>
  state.dtcReport.dtcReport;

export default dtcReportSlice.reducer;
