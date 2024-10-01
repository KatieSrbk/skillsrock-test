import { createSlice } from '@reduxjs/toolkit';
import {addUser, deleteUser, fetchUser, fetchUsers, updateUser} from "./usersThunk";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
    },
    reducers: {
        addOrUpdateUser: (state, action) => {
            const user = action.payload;
            const index = state.users.findIndex(({ _id }) => user._id === _id);

            if (index !== -1) {
                // Update the existing user
                state.users[index] = { ...state.users[index], ...user };
            } else {
                // Add new user
                state.users.push(user);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload.users;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export const { addOrUpdateUser } = usersSlice.actions;
export default usersSlice.reducer;
