const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

router.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

router.post('/', async (req, res) => {
  const newCustomer = new Customer(req.body);
  await newCustomer.save();
  res.json(newCustomer);
});

router.put('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(customer);
});

router.delete('/:id', async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;