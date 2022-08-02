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

       expect( code ).to.be.a('number');
       expect( code ).to.be.equal(200);
       expect( status ).to.be.a('boolean');
       expect( status ).to.equal(true);
       expect( message ).to.be.a('string');
       expect( message ).to.equal('User login succesfully');
       expect( bodyRes ).to.be.a('object');

       expect( bodyRes.user ).to.be.a('object');
       expect( bodyRes.token ).to.be.a('string');
       expect( bodyRes.menu ).to.be.a('array');

       token = bodyRes.token;

    })

})