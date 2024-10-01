import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from "../features/dashboard/dashboardSlice";
import coursesReducer from "../features/courses/coursesSlice";
import permissionsReducer from "../features/permissions/permissionsSlice"
import permissionReducer from "../features/permissions/permissionSlice"
import usersReducer from "../features/users/usersSlice"
import userReducer from "../features/users/userSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    courses: coursesReducer,
    permissions: permissionsReducer,
    permission: permissionReducer,
    users: usersReducer,
    user: userReducer,
});

export default rootReducer;
