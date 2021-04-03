'use strict';

const DataModel = require('./item-model.js');

const Data = { };

Data.addAnItem = async(req, res, next) => {
  try {
    // // hardcoded test data
    // const newdata = {
    //   name: 'Chris',
    //   description: 'software engineer'
    // };
    // const newItem = new DataModel(newdata);
    // console.log('newdata, newitem', newdata, newItem);

    const data = req.body;
    const item = new DataModel(data);
    await item.save(); // saving the item allowed 4 other tests to pass
    res.status(200).json(item);
  } catch(e) { next(e.message); }
}

Data.getAllItems = async(req, res) => {
  const items = await DataModel.find({}); // this line is correct from the docs, finds all documents
  res.status(200).json(items);
}

Data.getOneItem = async(req, res) => {
  const id = req.params.id; // added params
  const items = await DataModel.find({ _id:id });
  res.status(200).json(items[0]);
}

Data.deleteOneItem = async(req, res) => {
  const id = req.params.id;
  await DataModel.deleteOne({_id:id});
  res.status(200).send(`Deleted item with id ${id}`);
}

Data.updateOneItem = async(req, res) => {
  const id = req.params.id; //changed to params
  const data = req.body;
  const item = await DataModel.findByIdAndUpdate(id, data, {new:true, useFindAndModify:false});
  res.status(200).json(item);
}

module.exports = Data;
