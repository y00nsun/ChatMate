const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chatRouter = require('./routes/chat');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/chat', chatRouter);

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});