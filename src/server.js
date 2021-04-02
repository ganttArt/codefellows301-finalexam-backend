'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const Data = require('./data.js');

app.use(express.urlencoded({extended:true}));

app.get('/items', Data.getAllItems);
app.get('/items/:id', Data.getOneItem); //added Data
app.delete('/items/:id', Data.deleteOneItem);
app.post('/items', Data.addAnItem);
app.put('/items/:id', Data.updateOneItem); // created anew put route

app.use('*', (req,res) => {
  res.status(404).send('These are not the droids you are looking for.');
});

app.use( (error,req,res,next) => {
  res.status(500).send(`My Bad ... ${error.message}`);
});

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, console.log(`Server is up and running on port: ${port}`));
  },
};
