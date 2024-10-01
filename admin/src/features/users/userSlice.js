import { createSlice } from '@reduxjs/toolkit';
import {addUser, deleteUser, fetchUser, updateUser} from "./usersThunk";

const initialState = {
    user: null,
    status: 'idle', // 'idle' | 'fetching' | 'fetched' | 'failed'
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'fetching';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'fetched';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.status = 'succeeded';
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
            });
    }
});

export const { resetState } = userSlice.actions;
export default userSlice.reducer;
