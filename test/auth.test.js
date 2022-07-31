const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');

const api = request(app);

describe('Test Auth Route /auth/login', () => { 
    console.log('testing...')
 })