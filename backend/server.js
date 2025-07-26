const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const customerRoutes = require('./routes/customers');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/customers', customerRoutes);

mongoose.connect('mongodb://localhost:27017/crm')
  .then(() => app.listen(5000, () => console.log('Server running')))
  .catch(err => console.error(err));