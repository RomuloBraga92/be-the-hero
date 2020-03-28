const req = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async ()=>{
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async ()=>{
    await connection.destroy();
  });

  it('it should be able to create a new ONG', async () => {
    const res = await req(app)
    .post('/ongs')
    .send({
      name: "Ong3",
	    email: "ong3@gmail.com",
	    whatsapp: "2199998555",
	    city: "rio de janeiro",
	    uf: "RJ",
    });

    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toHaveLength(8);
  });
})