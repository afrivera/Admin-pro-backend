const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');
const user = require('../models/user');

const api = request(app);

describe('Test Authenticate a user /auth', () => { 
    const random = Math.random();
    let token;

    const postUser = {
        email: `${ random }@correo.com`,
        password: 'Prueba123',
        name: 'userTest'
    }

    before( async() => {
        await api.post('/api/users')
        .set('Accept', 'application/json')
        .send( postUser )
    })

    after( async() => {
        await user.findOneAndRemove({email: postUser.email});
    })

    it( 'POST [SUCCESS] - It should return a login success response', async() => {

        const { body } = await api.post('/api/auth/login')
                                        .set('Accept', 'application/json')
                                        .send( postUser )
                                        .expect('Content-Type', /json/)
                                        .expect(200)
                    
       const { code, status, message, body: bodyRes } = body;

       expect( code ).to.be.a('number').equal(200);
       expect( status ).to.be.a('boolean').equal(true);
       expect( message ).to.be.a('string').equal('User login succesfully');
       expect( bodyRes ).to.be.a('object');
       expect( bodyRes.user ).to.be.a('object');
       expect( bodyRes.token ).to.be.a('string');
       expect( bodyRes.menu ).to.be.a('array');

       token = bodyRes.token;

    })

    it( 'POST [ERROR] - It should return a message with password required', async() => {

        const { body } = await api.post('/api/auth/login')
                                        .send( { email: 'usernoexist@test.com'} )
                                        .expect('Content-Type', /json/)
                                        .expect(403)
                    
        const { msg } = body.errors[0]
        expect( msg ).to.be.a('string');
        expect( msg ).to.equal('Password is required');

    })

    it( 'POST [ERROR] - It should return a message with email required', async() => {

        const { body } = await api.post('/api/auth/login')
                                        .send( { password: 'passwordTest'} )
                                        .expect('Content-Type', /json/)
                                        .expect(403)
                    
        const { msg } = body.errors[0]
        expect( msg ).to.be.a('string');
        expect( msg ).to.equal('Email is required');

    })

    it( 'POST [ERROR] - It should return an error with credentials invalid', async() => {

        const res = await api.post('/api/auth/login')
                                        .send( { password: 'passwordTest', email: 'emailtest@test.com'} )
                                        // .expect('Content-Type', /application\/json/)
                                        .expect(401)
                    
        expect( res.status).to.be.a('number').equal(401);
        expect( res ).to.have.property('text').includes('Invalid Credentials');

    })

    it( 'GET [SUCCESS] - It should return a new token', async() => {

        const { body } = await api.get('/api/auth/renew')
                                        .set('x-token', token )
                                        .expect('Content-Type', /application\/json/)
                                        .expect(200)
                    
        const { code, status, message, body: bodyRes } = body;

        expect( code ).to.be.a('number').equal(200);
        expect( status ).to.be.a('boolean').equal(true);
        expect( message ).to.be.a('string').equal('renew token succesfully');
        expect( bodyRes ).to.be.a('object');    
        expect( bodyRes.user ).to.be.a('object');
        expect( bodyRes.token ).to.be.a('string');
        expect( bodyRes.menu ).to.be.a('array');
    
        token = bodyRes.token;

    })

    it( 'GET [ERROR] - It should return an error with jwt malformed', async() => {

        const res  = await api.get('/api/auth/renew')
                                        .set('x-token', 'token' )
                                        .expect('Content-Type', /text\/html/)
                                        .expect(401)
            

        expect( res.status).to.be.a('number').equal(401);
        expect( res ).to.have.property('text').include('jwt malformed');
    })

})