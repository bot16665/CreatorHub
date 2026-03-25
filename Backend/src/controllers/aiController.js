// 1. Import the Google Generative AI package
const { GoogleGenerativeAI } = require('@google/generative-ai');

// 2. Initialize Gemini with API key from environment variables
// Note: Ensure GEMINI_API_KEY is set in your .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateContent = async (req, res) => {
    try {
        // Extract the prompt from the request body
        const { prompt } = req.body;

        // Validate that a prompt was provided
        if (!prompt) {
            return res.status(400).json({ error: 'Please provide a prompt string.' });
        }

        // Select the Gemini model for text generation
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        // Send the prompt to Gemini and await the result
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedText = response.text();

        // Return the generated text as JSON
        return res.status(200).json({ text: generatedText });

    } catch (error) {
        console.error('Error generating AI content:', error);
        return res.status(500).json({
            error: 'An internal server error occurred during AI generation'
        });
    }
};


// ADVANCED: Generate content with custom options
// POST /api/ai/generate-advanced
// Body: { prompt, model, maxTokens, temperature }
// ─────────────────────────────────────────────
const generateContentAdvanced = async (req, res) => {
    try {
        // Extract options from the request body, with sensible defaults
        const {
            prompt,
            model: modelName = 'gemini-2.0-flash',
            maxTokens = 1024,
            temperature = 0.7
        } = req.body;

        // Validate that a prompt was provided
        if (!prompt) {
            return res.status(400).json({ error: 'Please provide a prompt string.' });
        }

        // Select the Gemini model (allows caller to override model name)
        const model = genAI.getGenerativeModel({
            model: modelName,
            generationConfig: {
                // Control response length
                maxOutputTokens: maxTokens,
                // Control creativity: 0 = deterministic, 1 = more creative
                temperature: temperature,
            },
        });

        // Send the prompt to Gemini and await the result
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedText = response.text();

        // Return the generated text along with config used
        return res.status(200).json({
            text: generatedText,
            config: { model: modelName, maxTokens, temperature }
        });

    } catch (error) {
        console.error('Error generating advanced AI content:', error);
        return res.status(500).json({
            error: 'An internal server error occurred during AI generation'
        });
    }
};

// Export both functions for use in aiRoutes.js
module.exports = {
    generateContent,
    generateContentAdvanced
};
