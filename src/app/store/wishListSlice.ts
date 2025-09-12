import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Movie } from '../types/Movie';

interface WishlistState {
    movies: Movie[];
}

const initialState: WishlistState = {
    movies: [],
};

const wishListSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
        addToWishList(state, action: PayloadAction<Movie>) {
            if (!state.movies.find(m => m.id === action.payload.id)) {
                state.movies.push(action.payload);
            }
        },
        removeFromWishList(state, action: PayloadAction<number>) {
            state.movies = state.movies.filter(m => m.id !== action.payload);
        },
        clearWishList(state) {
            state.movies = [];
        },
    },
});

export const { addToWishList, removeFromWishList, clearWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
