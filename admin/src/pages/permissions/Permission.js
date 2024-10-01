import {Button, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {addPermission, fetchPermission, updatePermission} from "../../features/permissions/permissionsThunk";
import {useDispatch, useSelector} from "react-redux";
import {resetState} from "../../features/permissions/permissionSlice";

const Permission = ({ permissionId, handleClose }) => {
    const dispatch = useDispatch();
    // Select permission state from Redux store
    const { permission = {}, status, error } = useSelector((state) => state.permission);

    // Local state to handle form inputs
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    // Effect to fetch permission if `permissionId` is provided
    useEffect(() => {
        dispatch(fetchPermission(permissionId));
    }, []);

    // Sync local state with Redux state when `permission` changes
    useEffect(() => {
        if (permissionId && permission) {
            setFormData({
                name: permission.name || '',
                description: permission.description || ''
            });
        }
    }, [permissionId, permission]);

    // Automatically close modal if the status becomes "succeeded"
    useEffect(() => {
        if (status === 'succeeded') {
            handleClose(permission); // Close the modal
        }
    }, [status]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (permissionId) {
            dispatch(updatePermission({permissionId, updatedPermission: formData}));
        } else {
            dispatch(addPermission(formData));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Permission Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Description"
                name="description"
                value={formData.description}
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
                {permissionId ? 'Update' : 'Add' } Permission
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};


export default Permission;
