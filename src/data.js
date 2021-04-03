'use strict';

const DataModel = require('./item-model.js');

const Data = { };

Data.addAnItem = async(req, res, next) => {
  try {
    const data = req.body;
    // console.log('next', next);
    // console.log('request object', req.body, req.data, req.query, req.params);
    // none of the data coming in from the request at all. Don't know where to find it.
    // console.log('add an item data', data);


    // hardcoded data
    // const newdata = {
    //   name: 'Chris',
    //   description: 'software engineer'
    // };
    // const newItem = new DataModel(newdata);
    // console.log('newdata, newitem', newdata, newItem);

    const item = new DataModel(data);
    // await item.save();
    console.log('add an item', item);
    res.status(200).json(item);
    console.log('add after response, Data', Data)
  } catch(e) { 
    next(e); 
    // res.status(500).send(e.message);
  }
}

Data.getAllItems = async(req, res) => {
  const items = await DataModel.find(); //tried findOne, removing and not removing {} inside find and returning items[0]
  res.status(200).json(items);
}

Data.getOneItem = async(req, res) => {
  const id = req.params.id;
  console.log('getoneitem', id);
  //id is coming in from params but the 
  const items = await DataModel.find({ _id:id }); //tried removing _id, using findOne and returning items[0]
  console.log(items);
  res.status(200).json(items);
}

Data.deleteOneItem = async(req, res) => {
  const id = req.params.id;
  await DataModel.deleteOne({_id:id});
  res.status(200).send(`Deleted item with id ${id}`);
}

Data.updateOneItem = async(req, res) => {
  const id = req.params.id; //changed to params
  const data = req.body;
  console.log('update', id, data);
  // data is a completely empty object, and it should be going here.
  const item = await DataModel.findByIdAndUpdate(id, data, {new:true, useFindAndModify:false});
  res.status(200).json(item);
}

module.exports = Data;
