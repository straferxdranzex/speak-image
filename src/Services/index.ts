import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY || '';

app.get('/test-api-key', (req, res) => {
    res.json({ OPENAI_API_KEY });
});

app.get('/', (req, res) => {
    res.send('Welcome to VisualGPT!');
});

app.post('/api/generate-answer', async (req, res) => {
    const userQuery = req.body.query;
    console.log(`Received query: ${userQuery}`);
    if (!userQuery) {
        console.error('No query provided in request');
        return res.status(400).json({ error: 'No query provided' });
    }

    const messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userQuery }
    ];

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4-turbo',
            messages: messages,
            max_tokens: 150,
            temperature: 0.3,
        }, {
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const generatedResponse = response.data.choices[0].message.content;

        let imageUrl = null;
        if (userQuery.toLowerCase().includes('human skeleton')) {
            const imageResponse = await axios.post('http://localhost:5001/api/generate-image', {
                description: userQuery
            }, {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            if (imageResponse.status === 200) {
                imageUrl = imageResponse.data.url;
            }
        }

        res.json({ response: generatedResponse, image_url: imageUrl });
    } catch (error) {
        console.error(`API request failed: ${error}`);
    }
});

app.post('/api/generate-image', async (req, res) => {
    const description = req.body.description;
    if (!description) {
        return res.status(400).json({ error: 'No description provided' });
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
            model: 'dall-e-3',
            prompt: description,
            n: 1,
            size: '1024x1024'
        }, {
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
    }
});

app.get('/api/image', async (req, res) => {
    const description = req.query.description;
    if (!description) {
        console.error('No description provided');
        return res.status(400).json({ error: 'No description provided' });
    }
    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${description}&image_type=photo`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error(`Failed to fetch image: ${error}`);
    }
});

app.get('/api/video', async (req, res) => {
    const description = req.query.description;
    if (!description) {
        return res.status(400).json({ error: 'No description provided' });
    }
    const url = `https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${description}`;

    try {
        const response = await axios.get(url);
        const videoData = response.data;
        if (videoData.hits.length > 0) {
            res.json(videoData.hits[0].videos.medium.url);
        } else {
            res.status(404).json({ error: 'No videos found' });
        }
    } catch (error) {
    }
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
