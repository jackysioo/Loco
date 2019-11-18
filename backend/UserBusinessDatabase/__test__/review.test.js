const userController = require('../controllers/user');  
const userModel = require('../models/user');  
const businessController = require('../controllers/business');  
const businessModel = require('../models/business'); 
const app = require('./testapp') // Link to your server file
const supertest = require('supertest');  
const request = supertest(app); 
const mongoose = require('mongoose');

const dbHandler = require('./db');

const reviewData = [
    {
        user: "tanya_cooper123",
        business: "business_name",
        title: "Great food!",
        date: "Jan 23, 2019",
        review: "This experience was incredible! They were so friendly and welcoming.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1481931098730-318b6f776db0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=637&q=80"
      }
  ];  

  const businessData = [
    {
      title: "Homemade Fresh Pasta",
      user: "Alfonso",
      about: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      images: [
        'https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80',
        "https://images.unsplash.com/photo-1560785477-d43d2b34e0df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
      ],
      rating: 4.15,
      region: "Central Vancouver",
      location: {
        lat: 49.2102,
        long: -123.1172
      },
      price: "$15/set",
      tags: ["language", "korean", "japanese"]
    },
  ];  

  const userData = [
    {
        username: "tanya_cooper123",
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

  beforeAll(async () => {await dbHandler.connect(); });

  /**
   * Clear all test data after every test.
   */
  // afterEach(async () => await dbHandler.clearDatabase());
  
  /**
   * Remove and close the db and server.
   */
  afterAll(async () => {await dbHandler.closeDatabase(); app.close()}); 

  describe('Review Integration Tests', () => {

    it('Can make a post request', async done => { 
        const business = await request.post('/business/post').send({business : businessData[0]}); 
        const bid = business.body.business._id; 

        const user = await request.post('/user/post').send({user : userData[0]}); 
        const uid = user.body.user._id; 

        const response = await request.post('/review/post/'+uid + '/' + bid).send({review : reviewData[0]});
        expect(response.status).toBe(200);
        expect(response.body.review.title).toBe(reviewData[0].title);
        
        done();
      });   

      it('Can make a put request and update business', async done => { 
        
        const business = await request.post('/business/post').send({business : businessData[0]}); 
        const bid = business.body.business._id; 

        const user = await request.post('/user/post').send({user : userData[0]}); 
        const uid = user.body.user._id; 

        const review = await request.post('/review/post/'+uid + '/' + bid).send({review : reviewData[0]}); 
        const rid = review.body.review._id; 
        const response = await request.put('/review/put/'+rid).send({review : {title: 'changed title'}}); 

        expect(response.status).toBe(200);
        expect(response.body.review.title).toBe('changed title');
        
        done();
      });   
    
      it('Can make a delete request', async done => { 
        
        const business = await request.post('/business/post').send({business : businessData[0]}); 
        const bid = business.body.business._id; 

        const user = await request.post('/user/post').send({user : userData[0]}); 
        const uid = user.body.user._id; 

        const review = await request.post('/review/post/'+uid + '/' + bid).send({review : reviewData[0]}); 
        const rid = review.body.review._id;  

        const response = await request.delete('/review/delete/'+ rid + '/' +uid + '/' + bid); 

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('deleted');
        
        done();
      });   
    }); 