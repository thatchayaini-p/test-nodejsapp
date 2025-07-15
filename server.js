app.post('/webhook', (req, res) => {
  const repo = req.body.repository.full_name;
  const branch = req.body.ref;
  const pusher = req.body.pusher.name;

  console.log(`📦 Repo: ${repo}`);
  console.log(`🌿 Branch: ${branch}`);
  console.log(`👤 Pushed by: ${pusher}`);

  res.status(200).send('Webhook received!');
});

