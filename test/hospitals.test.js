const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');
const user = require('../models/user');

const api = request(app);


describe('Test Users /api/users', async() => { 
    const random = Math.random();
    let token, idUser, idHospital;

    const postUser = {
        email: `${ random }@correo.com`,
        password: 'Prueba123',
        name: 'userTest'
    }

    before( async() => {
        const { body } = await api.post('/api/users')
                .set('Accept', 'application/json')
                .send( postUser )

        token = body.body.token;
    })

    after( async() => {
        await user.findOneAndRemove({email: postUser.email});
    })
    
    it('POST [SUCCESS] - It should create a new Hospital', async ()=> {
      
        const { body } = await api.post('/api/hospitals')
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .send( { name: 'New Hospital'} )
                                        .expect('Content-Type', /json/)
                                        .expect(201)

        const { code, status, message, body: bodyRes } = body;
        expect( code ).to.be.a('number').equal(201);
        expect( status ).to.be.a('boolean').equal(true);
        expect( message ).to.be.a('string').equal('Hospital Created')
        expect( bodyRes ).to.be.a('object');        
        expect( bodyRes.user ).to.be.a('string');
        expect( bodyRes.name ).to.be.a('string');
        expect( bodyRes._id ).to.be.a('string');

        idHospital = bodyRes._id
    })
    
    it('POST [ERROR] - It should return message with there is no token in the request', async ()=> {
      
        const res = await api.post('/api/hospitals')
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /text\/html/)
                                        .expect(401)
       
        expect( res.status).to.be.a('number').equal(401);
        expect( res ).to.have.property('text');
        // console.log(res)
                    
    })
    
    it('POST [ERROR] - It should return error "name is required"', async ()=> {
      
        const res = await api.post('/api/hospitals')
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .send({ noName: 'noNameSend' })
                                        .expect('Content-Type', /json/)
        //                                 .expect(403)
       
        expect( res.status).to.be.a('number').equal(403);
        expect( res ).to.have.property('text').include('Name is required')
                    
    })
    
    it('PUT [SUCCESS] - It should return an updated Hospital', async ()=> {
      
        const { body } = await api.put(`/api/hospitals/${ idHospital }`)
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .send( { name: 'Hospital edit'} )
                                        .expect('Content-Type', /json/)
                                        .expect(200)
       

        const { code, status, message, body: bodyRes } = body;
        expect( code ).to.be.a('number').equal(200);
        expect( status ).to.be.a('boolean').equal(true);
        expect( message ).to.be.a('string').equal('Hospital Updated')
        expect( bodyRes ).to.be.a('object');
    })
    
    it('PUT [ERROR] - It should return an error with id isn\'t a mongo id', async ()=> {
      
        const res = await api.put(`/api/hospitals/1234abcd`)
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .send( { name: 'hospital edit'} )
                                        .expect('Content-Type', /json/)
                                        .expect(403)
       

        expect( res.status).to.be.a('number').equal(403);
        expect( res ).to.have.property('text').include('id isn\'t a mongo id');
                                
    })
    
    it('PUT [ERROR] - It should return message with there is no token in the request', async ()=> {
      
        const res = await api.put(`/api/hospitals/${ idHospital }`)
                                        .set('Accept', 'application/json')
                                        .send( { name: 'hospital edit'} )
                                        .expect('Content-Type', /text\/html/)
                                        .expect(401)
       

        expect( res.status).to.be.a('number').equal(401);
        expect( res ).to.have.property('text').include('there is no token in the request');
                                
    })

    it('GET [SUCCESS] - It Should return a list of Hospitals', async () => {
        const { body } = await api.get('/api/hospitals')
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .expect('Content-Type', /json/)
                                        .expect(200)
                    
        const { code, status, message, body: bodyRes } = body;
        expect( code ).to.be.a('number').equal(200);
        expect( status ).to.be.a('boolean').equal(true);
        expect( message ).to.be.a('string').equal('Hospitals list retrieved successfully')
        console.log(body)
        expect( bodyRes ).to.be.a('array');
    })

    it('GET [ERROR] - It Should return an error with jwt malformed', async () => {
        const res= await api.get('/api/hospitals')
                                .set('x-token', 'token' )
                                .expect('Content-Type', /text\/html/)
                                .expect(401)
                    
        expect( res.status).to.be.a('number').equal(401);
        expect( res ).to.have.property('text').include('jwt malformed');
    })

    it('GET [ERROR] - It Should return an error with there is not token in the request', async () => {
        const res = await api.get('/api/hospitals')
                                .expect('Content-Type', /text\/html/)
                                .expect(401)
                    
        expect( res.status).to.be.a('number').equal(401);
        expect( res ).to.have.property('text').include('there is no token in the request');
    })

    it('DELETE [SUCCESS] - It should delete a Hospital', async ()=> {
      
        const { body } = await api.delete(`/api/hospitals/${ idHospital }`)
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .expect('Content-Type', /json/)
                                        .expect(200)
       
        const { code, status, message, body: bodyRes } = body;
        expect( code ).to.be.a('number').equal(200);
        expect( status ).to.be.a('boolean').equal(true);
        console.log(body)
        expect( message ).to.be.a('string').equal('Hospital Deleted')
        expect( bodyRes ).to.be.a('object');
    })    

    it('DELETE [ERROR] - It should return an error hospital doesn\'t exist', async ()=> {
      
        const res = await api.delete(`/api/hospitals/${ idHospital }`)
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .expect('Content-Type', /text\/html/)
                                        .expect(404)
       
        expect( res.status).to.be.a('number').equal(404);
        expect( res.text).includes('Error retrieving Hospital Delete');
    })    

 })