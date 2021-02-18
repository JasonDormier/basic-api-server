'use strict';

const server = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(server.app);

describe('Server tests', () => {
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

  it('should be able to create a food on POST /food', async () => {
    const response = await request.post('/food').send({
      type: 'red meat',
      cut: 'steak',
    });
    const response2 = await request.post('/food').send({
      type: 'pork',
      cut: 'chop',
    });

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.data.cut).toEqual('steak');
    expect(response2.body.data.cut).toEqual('chop');
  });

  it('should get a food with by request parameter on GET /food', async () => {
    const response = await request.get('/food/1');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
  });

  it('should get a food list with by request parameter on GET /food', async () => {
    const response = await request.get('/food');

    expect(response.status).toEqual(200);
    expect(response.body[0].id).toEqual(1);
    expect(response.body[1].id).toEqual(2);
  });

  it('should update an existing food on PUT /food/:id', async () => {
    const response = await request.put('/food/1').send({
      type: 'poultry',
      cut: 'breast',
    });

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.data.cut).toEqual('breast');
  });
  it('should should delete an existing food on DELETE', async () => {
    const response = await request.delete('/food/1');

    expect(response.status).toEqual(204);
  });

  //======= clothes test ============

  it('should be able to create a clothes on POST /clothes', async () => {
    const response = await request.post('/clothes').send({
      type: 'Gucci',
      item: 'watch',
    });
    const response2 = await request.post('/clothes').send({
      type: 'Gucci',
      item: 'socks',
    });

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.data.item).toEqual('watch');
    expect(response2.body.data.item).toEqual('socks');
  });

  it('should get a clothes with by request parameter on GET /clothes', async () => {
    const response = await request.get('/clothes/1');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
  });

  it('should get a clothes list with by request parameter on GET /clothes', async () => {
    const response = await request.get('/clothes');

    console.log(response.body);

    expect(response.status).toEqual(200);
    expect(response.body[0].id).toEqual(1);
    expect(response.body[1].id).toEqual(2);
  });

  it('should update an existing clothes on PUT /clothes/:id', async () => {
    const response = await request.put('/clothes/1').send({
      type: 'Gucci',
      item: 'shirt',
    });

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.data.item).toEqual('shirt');
  });
  it('should should delete an existing clothes on DELETE', async () => {
    const response = await request.delete('/clothes/1');

    expect(response.status).toEqual(204);
  });

});
