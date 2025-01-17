import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';

interface Review {
  id: number;
  userId: number;
  reviewerName: string;
  reviewText: string;
  rating: number;
  createdAt: Date;
}

interface ReviewState {
  allReviews: Review[];
}

const initialState: ReviewState = {
  allReviews: [],
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setAllReviews: (state, action: PayloadAction<Review[]>) => {
      state.allReviews = action.payload;
    },
    addReviewRedux: (state, action: PayloadAction<Review>) => {
      state.allReviews.unshift(action.payload);
    },
    editReviewRedux: (state, action: PayloadAction<Review>) => {
      const index = state.allReviews.findIndex(
        review => review.id === action.payload.id,
      );
      if (index !== -1) {
        state.allReviews[index] = action.payload;
      }
    },
    removeReviewRedux: (state, action: PayloadAction<number>) => {
      state.allReviews = state.allReviews.filter(
        review => review.id !== action.payload,
      );
    },
    clearAllReviews: state => {
      state.allReviews = [];
    },
  },
});

export const {
  setAllReviews,
  addReviewRedux,
  editReviewRedux,
  removeReviewRedux,
  clearAllReviews,
} = reviewsSlice.actions;

// Selector to retrieve all reviews
export const selectAllReviews = (state: RootState): Review[] =>
  state.reviews.allReviews; // Adjust according to your store's slice structure

export default reviewsSlice.reducer;
