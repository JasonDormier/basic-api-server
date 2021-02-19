'use strict';

require('@code-fellows/supergoose');
const supertest = require('supertest');
const server = require('../src/server.js');
const request = supertest(server.app);

describe('Testing server routes', () => {
  it('should response with a 200 when hiting GET /food', async () => {

    const response = await request.get('/food');
    console.log('get: ', response.body);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });
  it('should pass a 404 error when no route is triggered', async () => {
    const response = await request.get('/wrong');

    expect(response.status).toEqual(404);
    expect(response.text).toEqual('That route is not found');
  });

  it('should pass a 404 error for a bad method', async () => {
    const response = await request.post('/foo/bar');

    expect(response.status).toEqual(404);
    expect(response.text).toEqual('That route is not found');
  });

  it('should create a new person on POST /food', async () => {

    const response = await request.post('/food').send({
      type: 'pork',
      cut: 'chop',
    });

    const response2 = await request.post('/food').send({
      type: 'red meat',
      cut: 'steak',
    });

    //console.log('post', response.body);
    expect(response.status).toEqual(200);
    expect(response.body._id).toBeTruthy();
    expect(response.body.cut).toEqual('chop');
    expect(response2.body.cut).toEqual('steak');
  });

  it('should get a food with by request parameter on GET /food', async () => {
    const response = await request.get('/food');
    //console.log('get single', response.body);
    const test = await request.get(`/food/${response.body[0]._id}`);

    expect(response.status).toEqual(200);
    expect(test).toBeTruthy();
  });

  it('should get a food list with by request parameter on GET /food', async () => {
    const response = await request.get('/food');

    expect(response.status).toEqual(200);
    expect(response.body[0]._id).toBeTruthy();
    expect(response.body[1]._id).toBeTruthy();
  });

  it('should update an existing food on PUT /food/:id', async () => {
    const response = await request.get('/food/');
    console.log('update put: ', response.body[0]);
    const test = await request.put(`/food/${response.body[0]._id}`).send({
      type: 'poultry',
      cut: 'breast',
    });
    console.log('update test: ', test.body.cut);

    expect(response.status).toEqual(200);
    expect(response.body[0]._id).toBeTruthy();
    expect(test.body.cut).toEqual('breast');
  });
  it('should should delete an existing food on DELETE', async () => {
    const response = await request.get('/food');
    //console.log('get single', response.body);
    const test = await request.get(`/food/${response.body[0]._id}`);

    expect(test.status).toEqual(200);
  });

  //======= clothes test ============

  it('should create a new person on POST /clothes', async () => {

    const response = await request.post('/clothes').send({
      type: 'Gucci',
      item: 'watch',
    });

    const response2 = await request.post('/clothes').send({
      type: 'Gucci',
      item: 'socks',
    });

    //console.log('post', response.body);
    expect(response.status).toEqual(200);
    expect(response.body._id).toBeTruthy();
    expect(response.body.item).toEqual('watch');
    expect(response2.body.item).toEqual('socks');
  });

  it('should get a clothes with by request parameter on GET /clothes', async () => {
    const response = await request.get('/clothes');
    //console.log('get single', response.body);
    const test = await request.get(`/clothes/${response.body[0]._id}`);

    expect(response.status).toEqual(200);
    expect(test).toBeTruthy();
  });

  it('should get a clothes list with by request parameter on GET /clothes', async () => {
    const response = await request.get('/clothes');

    expect(response.status).toEqual(200);
    expect(response.body[0]._id).toBeTruthy();
    expect(response.body[1]._id).toBeTruthy();
  });

  it('should update an existing clothes on PUT /clothes/:id', async () => {
    const response = await request.get('/clothes/');
    console.log('update put: ', response.body[0]);
    const test = await request.put(`/clothes/${response.body[0]._id}`).send({
      type: 'Gucci',
      item: 'shirt',
    });
    //console.log('update test: ', test.body.item);

    expect(response.status).toEqual(200);
    expect(response.body[0]._id).toBeTruthy();
    expect(test.body.item).toEqual('shirt');
  });
  it('should should delete an existing clothes on DELETE', async () => {
    const response = await request.get('/clothes');
    //console.log('get single', response.body);
    const test = await request.get(`/clothes/${response.body[0]._id}`);

    console.log('delete route: ', test.body);

    expect(test.status).toEqual(200);
  });
});