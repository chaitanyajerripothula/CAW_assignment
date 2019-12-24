const httprequest = require('supertest');

//initilizing super agent
const request = httprequest.agent("http://localhost:3000");

describe('/users/gettoken', ()=>{
    let token="";
    beforeAll(function(done) {
        request.post('/users/gettoken')
          .send({ username: "admin", password: "admin" })
          .end(function(err, res) {
            token = res.body.token;
            done();
          });
      });

      
    test('POST /users/gettoken shoud return 200', async()=>{
        const res = await request.post('/users/gettoken').send({username:"chaitanya",password:"122345"}).set('Accept', 'application/json');
        expect(res.status).toEqual(200);
    })
    test('POST /users/gettoken shoud return 200 with error code 500 if username doesnot exists', async()=>{
        const res = await request.post('/users/gettoken').send({username:"chaitanya"}).set('Accept', 'application/json');
        expect(res.status).toEqual(500);
        expect(JSON.parse(res.text).error.code).toEqual(500);
        expect(JSON.parse(res.text).error.message).toEqual("requires username and password");

    })
    test('POST /users/gettoken shoud return 200 with error code 500 if password doesnot exists', async()=>{
        const res = await request.post('/users/gettoken').send({username:"chaitanya"}).set('Accept', 'application/json');
        expect(res.status).toEqual(500);
        expect(JSON.parse(res.text).error.code).toEqual(500);
        expect(JSON.parse(res.text).error.message).toEqual("requires username and password");
    })
    test('PATCH /users/username shoud return 200 with error', async()=>{
        const res = await request.set('token',token).patch('/users/username').send({"data":{"name":"chaitanya","password":"12345"},"patch":{"name":"123"}
        }).set('Accept', 'application/json');
        expect(res.status).toEqual(200);
        expect(JSON.parse(res.text).name === "123" &&  JSON.parse(res.text).password === "12345").toBe(true);
    })

})