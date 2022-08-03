const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');
const user = require('../models/user');

const api = request(app);


describe('Test Users /api/users', async() => { 
    const random = Math.random();
    let token, idUser;

    const postUser = {
        email: `${ random }@correo.com`,
        password: 'Prueba123',
        name: 'userTest'
    }

    const badUser = {
        name: 'test',
        password: '123456',
        name: 123
    }

    after( async() => {
        await user.findOneAndRemove({email: postUser.email});
    })
    
    it('POST [SUCCESS] - It should create a new User', async ()=> {
      
        const { body } = await api.post('/api/users')
                                        .set('Accept', 'application/json')
                                        .send( postUser )
                                        .expect('Content-Type', /json/)
                                        .expect(201)
                    
        const { code, status, message, body: bodyRes } = body;
        expect( code ).to.be.a('number').equal(201);
        expect( status ).to.be.a('boolean').equal(true);
        expect( message ).to.be.a('string').equal('User Created')
        expect( bodyRes ).to.be.a('object');        
        expect( bodyRes.user ).to.be.a('object');
        expect( bodyRes.token ).to.be.a('string');
       token = bodyRes.token; 
       idUser = bodyRes.user.uid; 
    })
    
    it('POST [ERROR] - It should return message with detail errors', async ()=> {
      
        const res = await api.post('/api/users')
                                        .set('Accept', 'application/json')
                                        .send( badUser )
                                        .expect('Content-Type', /json/)
                                        .expect(403)
       
        expect( res.status).to.be.a('number').equal(403);
        expect( res ).to.have.property('text');
                    
    })
    
    it('PUT [SUCCESS] - It should return an updated user', async ()=> {
      
        const { body } = await api.put(`/api/users/${ idUser }`)
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .send( { name: 'user edit'} )
                                        .expect('Content-Type', /json/)
                                        .expect(200)
       

        const { code, status, message, body: bodyRes } = body;
        expect( code ).to.be.a('number').equal(200);
        expect( status ).to.be.a('boolean').equal(true);
        expect( message ).to.be.a('string').equal('User Updated')
        expect( bodyRes ).to.be.a('object');
    })
    
    it('PUT [ERROR] - It should return an error with id isn\'t a mongo id', async ()=> {
      
        const res = await api.put(`/api/users/1234abcd`)
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .send( { name: 'user edit'} )
                                        .expect('Content-Type', /json/)
                                        .expect(403)
       

        expect( res.status).to.be.a('number').equal(403);
        expect( res ).to.have.property('text').include('id isn\'t a mongo id');
                                
    })
    
    // it('PUT [ERROR] - It should return an error with user does not exist', async ()=> {
      
    //     const res = await api.put(`/api/users/62d02dbc335220c79d715d1q`)
    //                                     .set('Accept', 'application/json')
    //                                     .set('x-token', token)
    //                                     .send( { name: 'user edit'} )
    //                                     .expect('Content-Type', /json/)
    //                                     .expect(403)
       
    //     console.log(res)
    //     // expect( res.status).to.be.a('number').equal(403);
    //     // expect( res ).to.have.property('text').include('id isn\'t a mongo id');
                                
    // })
    
    it('PUT [ERROR] - It should return message with there is no token in the request', async ()=> {
      
        const res = await api.put(`/api/users/${ idUser }`)
                                        .set('Accept', 'application/json')
                                        .send( { name: 'user edit'} )
                                        .expect('Content-Type', /text\/html/)
                                        .expect(401)
       

        expect( res.status).to.be.a('number').equal(401);
        expect( res ).to.have.property('text').include('there is no token in the request');
                                
    })

    it('GET [SUCCESS] - It Should return a list of users', async () => {
        const { body } = await api.get('/api/users')
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .expect('Content-Type', /json/)
                                        .expect(200)
                    
        const { code, status, message, body: bodyRes } = body;
        expect( code ).to.be.a('number').equal(200);
        expect( status ).to.be.a('boolean').equal(true);
        expect( message ).to.be.a('string').equal('Users list retrieved successfully')
        expect( bodyRes ).to.be.a('object');
        expect( bodyRes.users ).to.be.an('array');
        expect( bodyRes.total ).to.be.a('number');
    })

    it('GET [ERROR] - It Should return an error with jwt malformed', async () => {
        const res= await api.get('/api/users')
                                .set('x-token', 'token' )
                                .expect('Content-Type', /text\/html/)
                                .expect(401)
                    
        expect( res.status).to.be.a('number').equal(401);
        expect( res ).to.have.property('text').include('jwt malformed');
    })

    it('GET [ERROR] - It Should return an error with there is not token in the request', async () => {
        const res = await api.get('/api/users')
                                .expect('Content-Type', /text\/html/)
                                .expect(401)
                    
        expect( res.status).to.be.a('number').equal(401);
        expect( res ).to.have.property('text').include('there is no token in the request');
    })

    it('DELETE [SUCCESS] - It should delete a user', async ()=> {
      
        const { body } = await api.delete(`/api/users/${ idUser }`)
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .expect('Content-Type', /json/)
                                        .expect(200)
       
        const { code, status, message, body: bodyRes } = body;
        expect( code ).to.be.a('number').equal(200);
        expect( status ).to.be.a('boolean').equal(true);
        expect( message ).to.be.a('string').equal('User Deleted')
        expect( bodyRes ).to.be.a('object');
    })    

    it('DELETE [ERROR] - It should return an error User unauthorized', async ()=> {
      
        const res = await api.delete(`/api/users/${ idUser }`)
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .expect('Content-Type', /text\/html/)
                                        .expect(401)
       
        expect( res.status).to.be.a('number').equal(401);
        expect( res ).to.have.property('text').include('User unauthorized');
    })    

 })