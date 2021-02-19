'use strict';

class FoodInterface {

  // constructor() {
  //   this.id = 0;
  //   this.db = [];
  // }
  constructor(model) {
    this.model = model;
  }

  read(id) {
    // if (id) {
    //   return this.db.find(record => record.id === id);
    // } else {
    //   return this.db;
    // }
    if (id) {
      return this.model.find({ _id: id });
    }
    return this.model.find({});
  }

  create(obj) {
    // const record = {
    //   id: this.id += 1,
    //   data: obj,
    // };
    // this.db.push(record);
    // return record;
    const document = new this.model(obj);
    return document.save();
  }

  update(id, obj) {
    for (let i = 0; i < this.db.length; i++) {
      if (this.db[i].id === id) {
        this.db[i].data = obj;
        return this.db[i];
      }
    }
  }

  delete(id) {
    for (let i = 0; i < this.db.length; i++) {
      if (this.db[i].id === id) {
        delete this.db[i];
      }
    }
  }
}
module.exports = FoodInterface;