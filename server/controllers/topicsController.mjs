import Topic from  '../models/topic.mjs'

export const createTopic = async (req, res) => {
    try {
        const { title, content, module } = req.body;
        const topic = new Topic({ title, content, module });
        await topic.save();
        res.json({ message: 'Topic created successfully', topic });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getTopics = async (req, res) => {
    try {
        const topics = await Topic.find().populate('module');
        res.json(topics);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        const { title, content, module } = req.body;
        const topic = await Topic.findByIdAndUpdate(topicId, { title, content, module }, { new: true });
        res.json({ message: 'Topic updated successfully', topic });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        await Topic.findByIdAndDelete(topicId);
        res.json({ message: 'Topic deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
