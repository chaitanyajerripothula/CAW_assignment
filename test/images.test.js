const httprequest = require('supertest');

//initilizing super agent
const request = httprequest.agent("http://localhost:3000");

describe('/images/getThumnail', ()=>{
    let token="";
    beforeAll(function(done) {
        request.post('/users/gettoken')
          .send({ username: "admin", password: "admin" })
          .end(function(err, res) {
            token = res.body.token;
            done();
          });
      });
    test('POST /images/getThumbnail shoud return 200 with error', async()=>{
        const res = await request.set('token',"").post('/images/getThumnail').send({"uri":"https://www.google.com/images/srpr/logo3w.png"}).set('Accept', 'application/json');
        console.log(res.status);
        expect(res.status).toEqual(400);
    },30000)
    test('POST /images/getThumbnail shoud return 200 with error', async()=>{
        const res = await request.set('token',token).post('/images/getThumnail').send({"uri":"https://www.google.com/images/srpr/logo3w.png"}).set('Accept', 'application/json').set('Accept', 'application/json');
        expect(res.status).toEqual(200);
    },30000)
})