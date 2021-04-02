'use strict';

const DataModel = require('./item-model.js');

const Data = { };

Data.addAnItem = async (req, res, next) => {
  try {
    const data = req.body;
    // console.log('next', next);
    // console.log('request object', req.body, req.data, req.query, req.params);
    // none of the data coming in from the request at all. Don't know where to find it.
    // console.log('add an item data', data);
    const item = new DataModel(data);
    // console.log('add an item', item);
    res.status(200).json(item);
  } catch(e) { 
    next(e); 
    // res.status(500).send(e.message);
  }
}

Data.getAllItems = async (req, res) => {
  const items = await DataModel.find();
  res.status(200).json(items);
}

Data.getOneItem = async(req, res) => {
  const id = req.params.id;
  console.log('getoneitem', id);
  const items = await DataModel.find({ _id:id });
  console.log(items);
  res.status(200).json(items);
}

Data.deleteOneItem = async(req, res) => {

}

Data.updateOneItem = async(req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log('update', id, data);
  // data is a completely empty object, and it should be going here.
  const item = await DataModel.findByIdAndUpdate(id, data, {new:true, useFindAndModify:false});
  res.status(200).json(item);
}

module.exports = Data;
