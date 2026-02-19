const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/log', (req, res) => {
  const { city } = req.body;
  const ts = new Date().toISOString();
  console.log(`User selected city: ${city} at ${ts}`);
  res.status(200).json({ ok: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));