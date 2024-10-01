import React, {useEffect} from 'react';
import {Button, Paper} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import {useDispatch, useSelector} from "react-redux";
import {fetchCourses} from "../../features/courses/coursesThunk";
import './Courses.scss';
import {useNavigate} from "react-router-dom";
const Courses = () => {
    const dispatch = useDispatch();
    const { courses = [], status, error } = useSelector((state) => state.courses);

    const columns = [
        { field: 'title', headerName: 'Title', width: 130 },
        { field: 'description', headerName: 'Description', width: 250 },
        { field: 'modules', headerName: 'Modules', width: 150 },
        { field: 'instructor', headerName: 'Instructor', width: 150 },
        { field: 'students', headerName: 'students', width: 150 },
    ];

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCourses());
        }
    }, [status, dispatch]);

    const navigate = useNavigate()

    const createUpdateCourse = (courseId) =>{
        let path = '/dashboard/add-course';
        if (courseId) path = `/dashboard/update-course/${courseId}`
        navigate(path);
    }

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <div>
            <div className='coursesTitle'>
                <h1>Courses List</h1>
                <Button onClick={() => {createUpdateCourse()} } variant="contained">Create New Course</Button>
            </div>

            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={courses}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>
        </div>
    );
};

export default Courses;
