const express = require('express');
const cors = require('cors');

const app = express();


app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));
app.get('/', (req, res) => res.send('Backend is running!'));
app.get('/health', (req, res) => res.status(200).send('OK'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
