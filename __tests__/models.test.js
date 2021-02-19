'use strict';

require('@code-fellows/supergoose');

const FoodInterface = require('../src/models/food.js');
const foodModel = require('../src/models/data-collection-class.js');

const food = new FoodInterface(foodModel.foodExport);

describe('testing the model controller', () => {
  it('should be able to create a valid model', async () => {

    const newFood = await food.create({ type: 'test', cut: 'test' });

    expect(newFood.cut).toEqual('test');
  });
});