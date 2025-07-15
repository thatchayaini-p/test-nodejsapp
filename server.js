const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const repo = req.body.repository?.full_name;
  const branch = req.body.ref;
  const pusher = req.body.pusher?.name;

  console.log(`📦 Repo: ${repo}`);
  console.log(`🌿 Branch: ${branch}`);
  console.log(`👤 Pushed by: ${pusher}`);

  if (branch === 'refs/heads/main') {
    try {
      await axios.post('http://localhost:8080/job/webhook_test/build', {}, {
        auth: {
          username: 'thatchayaini', // ✅ your Jenkins username
          password: 'ghp_your_api_token_here' // ✅ your API token
        }
      });
      console.log('🚀 Jenkins job triggered!');
      res.status(200).send('Jenkins triggered!');
    } catch (err) {
      console.error('❌ Jenkins trigger failed:', err.message);
      res.status(500).send('Error triggering Jenkins');
    }
  } else {
    res.status(200).send('Not main branch, no Jenkins trigger.');
  }
});

app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
});

