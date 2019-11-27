const userController = require('../controllers/user');  
const userModel = require('../models/user'); 
const app = require('./testapp') // Link to your server file
const supertest = require('supertest');  
const request = supertest(app); 
const mongoose = require('mongoose');

const dbHandler = require('./db');

const userData = [
    {
        username: "tanya_cooper123", 
        password: "123",
        firstName: "Tanya",
        lastName: "Cooper",
        profilePic: 'https://images.unsplash.com/photo-1481824429379-07aa5e5b0739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=942&q=80',
        addressLine: "8888 Address Street",
        addressCity: "Vancouver",
        addressProvince: "BC",
        addressPostalCode: "A8A 8A8",
        birthday: "Feb 14, 1996",
        phoneNumber: "604-888-8888",
        email: "tanya_cooper@gmail.com", 
    },
  ]; 

  const serviceData = {
    title: "Hard Gel Manicure",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
  } 



  beforeAll(async () => {await dbHandler.connect(); });

  /**
   * Clear all test data after every test.
   */
  // afterEach(async () => await dbHandler.clearDatabase());
  
  /**
   * Remove and close the db and server.
   */
  afterAll(async () => {await dbHandler.closeDatabase(); app.close()});

describe('User Integration Tests', () => {

    it('Can sign up', async (done) => {
        const response = await request.post('/user/signUp').send({user : userData[0]});
        expect(response.status).toBe(201);
        expect(response.body.user.title).toBe(userData[0].title);
        
        done();
      });   

      it('Can sign up', async (done) => {
        const response = await request.post('/user/signUp').send({user : userData[0]});
        expect(response.status).toBe(403);
        
        done();
      });   

      it('Can sign in', async (done) => {
        const response = await request.post('/user/signIn').send({username : "userData[0].username",password: userData[0].password}); 
        expect(response.status).toBe(401)
        done();
      });   

      it('Can make a get request getting a user by id', async (done) => { 
        
        const user = await request.post('/user/signIn').send({username : userData[0].username,password: userData[0].password}); 
        const id = user.body.user._id; 

        const response = await request.get('/user/get/'+(id+1)); 

        expect(response.status).toBe(500);
        
        done();
      });    

      it('Can make a get request getting a user by id', async (done) => { 
        
        const user = await request.post('/user/signIn').send({username : userData[0].username,password: userData[0].password}); 
        const id = user.body.user._id; 

        const response = await request.get('/user/get/'+id); 

        expect(response.status).toBe(200);
        expect(response.body.user.title).toBe(userData[0].title);
        
        done();
      });   

      it('Can make a put request and update user and delete', async (done) => { 
        
        const user = await request.post('/user/signIn').send({username : userData[0].username,password: userData[0].password}); 
        const id = user.body.user._id; 

        const response = await request.put('/user/put/'+id).send({user : {username: 'changed name'}}); 

        expect(response.status).toBe(200);
        expect(response.body.user.username).toBe('changed name');  

        const response4 = await request.put('/user/put/').send({user : {username: 'changed name'}}); 
        expect(response4.status).toBe(404);
       
        const response2 = await request.delete('/user/delete/'+id); 

        expect(response2.status).toBe(200);
        expect(response2.body.message).toBe('deleted'); 

        const response3 = await request.delete('/user/delete/'+id); 
        expect(response3.status).toBe(404); 

        
        done();
      });   

    
}); 

describe('User Unit Tests', () => { 

  const mockRequest = (sessionData, body,params) => ({
    session: { data: sessionData },
    body, 
    params
  });
  
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  }; 

  const mockNext = jest.fn();


    it('can successfully update data in DB', async (done) => {  
      const user = new userModel(userData[0]);

     const id = await user.save();  

      const req = mockRequest(
        {},
        {user : {title : 'new title'}}, 
        { userId : id.id}
      ); 
      const res = mockResponse(); 
      const next = mockNext;
      const result =  await userController.getSuggestions(req, res,next);
        expect(res.status).toHaveBeenCalledWith(200);
  
        
        done();
      }); 

  

});
