// Base URL for the API
import {createAsyncThunk} from "@reduxjs/toolkit";
import apiClient from '../../utils/apiClient';

const API_URL = '/courses';

// Async thunks for CRUD operations

// Fetch all courses
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
    const response = await apiClient.get(API_URL);
    return response.data;
});

// Fetch specific course
export const fetchCourse = createAsyncThunk('courses/fetchCourse', async (courseId) => {
    const response = await apiClient.get(`${API_URL}/${courseId}`);
    return response.data;
});

// Add a new course
export const addCourse = createAsyncThunk('courses/addCourse', async (newCourse) => {
    const response = await apiClient.post(API_URL, newCourse);
    return response.data;
});

// Update a course
export const updateCourse = createAsyncThunk('courses/updateCourse', async (updatedCourse) => {
    const { id, ...data } = updatedCourse;
    const response = await apiClient.put(`${API_URL}/${id}`, data);
    return response.data;
});

// Delete a course
export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (courseId) => {
    await apiClient.delete(`${API_URL}/${courseId}`);
    return courseId;
});
