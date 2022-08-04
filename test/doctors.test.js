const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');
const user = require('../models/user');

const api = request(app);


describe('Test Users /api/users', async() => { 
    const random = Math.random();
    let token, idHospital, idDoctor;

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

        const { body: bodyHospital } = await api.post('/api/hospitals')
                .set('Accept', 'application/json')
                .set('x-token', token)
                .send({ name: 'Hospital Test'})
        idHospital = bodyHospital.body._id;
    })

    after( async() => {
        await user.findOneAndRemove({email: postUser.email});
    })
    
    it('POST [SUCCESS] - It should create a new Doctor', async ()=> {
      
        const { body } = await api.post('/api/doctors')
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .send({ name: 'New Doctor', hospital: idHospital })
                                        .expect('Content-Type', /json/)
                                        .expect(201)

        const { code, status, message, body: bodyRes } = body;
        expect( code ).to.be.a('number').equal(201);
        expect( status ).to.be.a('boolean').equal(true);
        expect( message ).to.be.a('string').equal('Doctor Created')
        expect( bodyRes ).to.be.a('object');        
        expect( bodyRes.user ).to.be.a('string');
        expect( bodyRes.name ).to.be.a('string');
        expect( bodyRes._id ).to.be.a('string');

        idDoctor = bodyRes._id
    })
    
    it('POST [ERROR] - It should return message with there is no token in the request', async ()=> {
      
        const res = await api.post('/api/doctors')
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /text\/html/)
                                        .expect(401)
       
        expect( res.status).to.be.a('number').equal(401);
        expect( res ).to.have.property('text');
                    
    })
    
    it('POST [ERROR] - It should return error "hospital and name is required"', async ()=> {
      
        const res = await api.post('/api/doctors')
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .send({ noHospital: 'noHospitalSend' })
                                        .expect('Content-Type', /json/)
        //                                 .expect(403)
       
        expect( res.status).to.be.a('number').equal(403);
        expect( res ).to.have.property('text').includes('Name is required')
        expect( res ).to.have.property('text').includes('Hospital is required');
                    
    })
    
    it('PUT [SUCCESS] - It should return an updated Doctor', async ()=> {
      
        const { body } = await api.put(`/api/doctors/${ idDoctor }`)
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .send( { name: 'Doctor edit'} )
                                        .expect('Content-Type', /json/)
                                        .expect(200)
       

        const { code, status, message, body: bodyRes } = body;
        expect( code ).to.be.a('number').equal(200);
        expect( status ).to.be.a('boolean').equal(true);
        expect( message ).to.be.a('string').equal('Doctor Updated')
        expect( bodyRes ).to.be.a('object');
    })
    
    it('PUT [ERROR] - It should return an error with id isn\'t a mongo id', async ()=> {
      
        const res = await api.put(`/api/doctors/1234abcd`)
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .send( { name: 'Doctor edit'} )
                                        .expect('Content-Type', /json/)
                                        .expect(403)
       

        expect( res.status).to.be.a('number').equal(403);
        expect( res ).to.have.property('text').include('id isn\'t a mongo id');
                                
    })
    
    it('PUT [ERROR] - It should return message with there is no token in the request', async ()=> {
      
        const res = await api.put(`/api/doctors/${ idDoctor }`)
                                        .set('Accept', 'application/json')
                                        .send( { name: 'doctor edit'} )
                                        .expect('Content-Type', /text\/html/)
                                        .expect(401)
       

        expect( res.status).to.be.a('number').equal(401);
        expect( res ).to.have.property('text').include('there is no token in the request');
                                
    })

    it('GET [SUCCESS] - It Should return a list of Doctors', async () => {
        const { body } = await api.get('/api/doctors')
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .expect('Content-Type', /json/)
                                        .expect(200)
                    
        const { code, status, message, body: bodyRes } = body;
        expect( code ).to.be.a('number').equal(200);
        expect( status ).to.be.a('boolean').equal(true);
        expect( message ).to.be.a('string').equal('Doctors list retrieved successfully')
        expect( bodyRes ).to.be.a('array');
    })

    it('GET [ERROR] - It Should return an error with jwt malformed', async () => {
        const res= await api.get('/api/doctors')
                                .set('x-token', 'token' )
                                .expect('Content-Type', /text\/html/)
                                .expect(401)
                    
        expect( res.status).to.be.a('number').equal(401);
        expect( res ).to.have.property('text').include('jwt malformed');
    })

    it('GET [ERROR] - It Should return an error with there is not token in the request', async () => {
        const res = await api.get('/api/doctors')
                                .expect('Content-Type', /text\/html/)
                                .expect(401)
                    
        expect( res.status).to.be.a('number').equal(401);
        expect( res ).to.have.property('text').include('there is no token in the request');
    })

    it('DELETE [SUCCESS] - It should delete a Doctor', async ()=> {
      
        const { body } = await api.delete(`/api/doctors/${ idDoctor }`)
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .expect('Content-Type', /json/)
                                        .expect(200)
       
        const { code, status, message, body: bodyRes } = body;
        expect( code ).to.be.a('number').equal(200);
        expect( status ).to.be.a('boolean').equal(true);
        expect( message ).to.be.a('string').equal('Doctor Deleted')
        expect( bodyRes ).to.be.a('object');
    })    

    it('DELETE [ERROR] - It should return an error doctor doesn\'t exist', async ()=> {
      
        const res = await api.delete(`/api/doctors/${ idDoctor }`)
                                        .set('Accept', 'application/json')
                                        .set('x-token', token)
                                        .expect('Content-Type', /text\/html/)
                                        .expect(404)
       
        expect( res.status).to.be.a('number').equal(404);
        expect( res.text).includes('Error retrieving Doctor Delete');
    })    

 })