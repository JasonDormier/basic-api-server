'use strict';

class ClothesInterface {

  constructor() {
    this.id = 0;
    this.db = [];
  }

  read(id) {
    if (id) {
      return this.db.find(record => record.id === id);
    } else {
      return this.db;
    }
  }

  create(obj) {
    const record = {
      id: this.id += 1,
      data: obj,
    };
    this.db.push(record);
    return record;
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
module.exports = ClothesInterface;