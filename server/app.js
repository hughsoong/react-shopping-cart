const path = require('path');

const express = require('express');
const cors = require('cors');

const bodyParser = require("body-parser");
const data = require("./data/products.json");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const port = 8001;

app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'products.json'));
});

app.post('/api/products', (req, res) => {
  data.products.push(req.body);
  res.status(201).send(data);
});

app.listen(port, () => {
  console.log(`[products] API listening on port ${port}.`);
});
