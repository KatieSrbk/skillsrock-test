import React, {useEffect} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import AppRoutes from './routes/AppRoutes';
import theme from './styles/theme';
import {useDispatch} from "react-redux";
import {checkAuth} from "./features/auth/authThunk";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth()); // Check auth status on app load
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <AppRoutes />
        </ThemeProvider>
    );
};

export default App;
