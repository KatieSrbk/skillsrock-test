import Question from  '../models/question.mjs'

export const createQuestion = async (req, res) => {
    try {
        const { text, type, options, explanation, difficulty, topic } = req.body;
        const question = new Question({ text, type, options, explanation, difficulty, topic });
        await question.save();
        res.json({ message: 'Question created successfully', question });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getQuestions = async (req, res) => {
    try {
        const { topicId } = req.params;
        const questions = await Question.find({topic: topicId});
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        const { text, type, options, explanation, difficulty, topic } = req.body;
        const question = await Question.findByIdAndUpdate(questionId, { text, type, options, explanation, difficulty, topic }, { new: true });
        res.json({ message: 'Question updated successfully', question });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        await Question.findByIdAndDelete(questionId);
        res.json({ message: 'Question deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
