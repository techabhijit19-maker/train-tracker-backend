const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const trains = [
  { id: '12001', name: 'Rajdhani Express', status: 'On Time', platform: 1, delay: 0 },
  { id: '12951', name: 'Mumbai Rajdhani', status: 'Delayed', platform: 3, delay: 15 },
  { id: '12259', name: 'Sealdah Duronto', status: 'On Time', platform: 2, delay: 0 },
];

app.get('/', (req, res) => {
  res.send('Train Tracker Backend is running');
});

app.get('/api/trains', (req, res) => {
  res.json(trains);
});

app.get('/api/train/:id', (req, res) => {
  const train = trains.find(t => t.id === req.params.id);
  if (train) {
    res.json(train);
  } else {
    res.status(404).json({ error: 'Train not found' });
  }
});

app.post('/api/pnr', (req, res) => {
  const { pnr } = req.body;
  res.json({
    pnr,
    status: 'Confirmed',
    train: 'Rajdhani Express',
    date: '2026-07-15',
    from: 'Delhi',
    to: 'Mumbai'
  });
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

