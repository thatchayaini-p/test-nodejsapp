const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Parse application/json
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  console.log('✅ Webhook received!');
  console.log(JSON.stringify(req.body, null, 2)); // Print payload
  res.status(200).send('Webhook received!');
});

// Fallback route (optional)
app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
});

