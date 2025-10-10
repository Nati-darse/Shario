  import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Hello from Shario server! we will build a platform to share all of your resources');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});