import { loginRequest, loginSuccess, loginFailure, logout } from './authSlice';
import AuthService from './authService';

export const login = (credentials) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const user = await AuthService.login(credentials);
        dispatch(loginSuccess(user));
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const checkAuth = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
        // Optionally verify token or fetch user data
        dispatch(loginSuccess(/* user data */));
    } else {
        dispatch(logout());
    }
};
