const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000; 

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.get('/data', async (req, res) => {
  const url = 'exempleURL.com/testData.txt';
  const username = 'exampleUserName';
  const password = 'examplePassword';
  const token = Buffer.from(`${username}:${password}`).toString('base64');

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    });
    res.send(response.data);
  } catch (error) {
    console.error('Error on trying to get the data:', error);
    res.status(500).send('Server error!');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
