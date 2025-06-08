import express from 'express';

import cors from 'cors';

const app = express();
const PORT = 3001;
const apiKey = 'test123'; //nothing to see here, move along
const url = 'https://places.googleapis.com/v1/places:searchNearby?fields=*'

app.use(cors());

app.get('/api/google/nearestPub', async (req: any, res: any) => {
    console.log("Received request to /api/google/nearestPub with params:", req.query);
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const body = {
        "includedTypes": ["pub", "bar"],
        "maxResultCount": 10, 
        "locationRestriction": {
            "circle": {
                "center": {
                    "latitude": lat, "longitude": lon
                }, "radius": 500
            }
        }
    }

    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    headers.set('Authorization', `Bearer ${apiKey}`);

    const request: RequestInfo = new Request(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    })

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch from Google API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});