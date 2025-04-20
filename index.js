const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.json());
const recordRoutes = require('./routes/record'); // or './record.js' if in root
app.use('/records', recordRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
