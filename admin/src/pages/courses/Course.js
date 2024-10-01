import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCourse } from '../../features/courses/coursesThunk';
import { TextField, Button, Paper, Typography} from '@mui/material';

const Course = () => {
    const dispatch = useDispatch();

    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        instructor: '',
        modules: '',
        students: '',
    });

    const handleChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCourse(courseData));
        setCourseData({
            title: '',
            description: '',
            instructor: '',
            modules: '',
            students: '',
        });
    };

    return (
        <Paper sx={{ padding: 3, maxWidth: 600, margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>Create New Course</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    name="title"
                    value={courseData.title}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Description"
                    name="description"
                    value={courseData.description}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Instructor"
                    name="instructor"
                    value={courseData.instructor}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Modules"
                    name="modules"
                    value={courseData.modules}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Students"
                    name="students"
                    value={courseData.students}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Create Course
                </Button>
            </form>
        </Paper>
    );
};

export default Course;
