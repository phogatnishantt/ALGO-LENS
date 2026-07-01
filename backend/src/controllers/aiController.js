const { generateHints } = require("../services/aiService");

const getHints = async (req, res) => {
    try {

        const {
            title,
            statement,
            constraints
        } = req.body;

        const hints = await generateHints(
            title,
            statement,
            constraints
        );

        res.status(200).json({
            success: true,
            data: hints
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

module.exports = {
    getHints
};