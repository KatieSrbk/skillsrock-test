import Module from '../models/module.mjs';

export const createModule = async (req, res) => {
    try {
        const { title, content, course } = req.body;
        const module = new Module({ title, content, course });
        await module.save();
        res.json({ message: 'Module created successfully', module });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getModules = async (req, res) => {
    try {
        const modules = await Module.find().populate('course');
        res.json(modules);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateModule = async (req, res) => {
    try {
        const { moduleId } = req.params;
        const { title, content, course } = req.body;
        const module = await Module.findByIdAndUpdate(moduleId, { title, content, course }, { new: true });
        res.json({ message: 'Module updated successfully', module });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteModule = async (req, res) => {
    try {
        const { moduleId } = req.params;
        await Module.findByIdAndDelete(moduleId);
        res.json({ message: 'Module deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
