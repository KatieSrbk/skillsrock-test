import Course from  '../models/course.mjs'

export const createCourse = async (req, res) => {
    try {
        const { title, description, instructor } = req.body;
        const course = new Course({ title, description, instructor });
        await course.save();
        res.json({ message: 'Course created successfully', course });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('instructor');
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, instructor } = req.body;
        const course = await Course.findByIdAndUpdate(courseId, { title, description, instructor }, { new: true });
        res.json({ message: 'Course updated successfully', course });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        await Course.findByIdAndDelete(courseId);
        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
