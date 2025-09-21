import express from 'express';

import cors from 'cors';
import { getFireBaseConfig } from './helpers/getConfig';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';

const app = express();
const PORT = 3001;

const firebaseConfig = getFireBaseConfig();
const fireBaseApp = initializeApp(firebaseConfig ?? {});
const db = getFirestore(fireBaseApp);
const config = getFireBaseConfig();

app.use(cors());

app.get('/nearestPub', async (req, res) => {
    if (!config) {
        res.status(500).json({ error: 'Failed to load Firebase config' });
    }

    try {
        const querySnapshot = await getDocs(collection(db, "pubs"));
        const pubs: Record<string, Record<string, string>> = {};
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            pubs[doc.id] = doc.data();
        });
        res.status(200).json(pubs);

    } catch (e) {
        console.error("Error retrieving pub: ", e);
    }

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});