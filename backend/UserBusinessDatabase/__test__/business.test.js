const businessController = require('../controllers/business');  
const businessModel = require('../models/business'); 
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
    {
      title: 'Calculus I & II Tutor',
      user: 'Carly',
      about: 'Arcu cursus euismod quis viverra nibh cras. Nulla pellentesque dignissim enim sit amet venenatis urna cursus eget. Scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt. Fermentum iaculis eu non diam phasellus.',
      profilePic: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      images: [
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80',
        'https://images.unsplash.com/photo-1560785477-d43d2b34e0df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'
      ],
      rating: 4.4,
      price: '$35/hr',
      region: 'Kitsilano',
      location: {
        lat: 49.2684,
        'long': -123.1683
      },
      tags: [
        'tutor',
        'math',
        'calculus'
      ]
    }, 
    {
      title: '3D Volume Lash Extensions',
      user: 'Sasha',
      about: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      profilePic: 'https://images.unsplash.com/photo-1532910404247-7ee9488d7292?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80',
      images: [
        'https://images.unsplash.com/photo-1493422884938-abd42cfa0f29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80',
        'https://images.unsplash.com/photo-1560785477-d43d2b34e0df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'
      ],
      rating: 3.89,
      price: '$80-$120',
      region: 'Downtown Vancouver',
      location: {
        lat: 49.282,
        'long': -123.1171
      },
      tags: [
        'beauty',
        'lashes',
        'spa'
      ]
    }, 
    {
      title: 'HomemadeNailFungusSalads',
      user: 'SaladQueen',
      about: 'eat my salad or ill hunt u down',
      profilePic: 'https://i.pinimg.com/originals/c2/34/99/c2349994d18f254db5e6ddee44a90348.jpg',
      images: [
        'http://blogs.newcastle.edu.au/wp-content/uploads/2012/12/salad-shoe.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/0f/22/c6/82/disgusting-salad.jpg'
      ],
      rating: 0.01,
      region: 'West Vancouver',
      location: {
        lat: 49.26,
        'long': -123.24
      },
      price: '$45/salad',
      tags: [
        'food',
        'homecooked',
        'fungus',
        'salad'
      ]
    }
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

describe('Business Integration Tests', () => {

    it('Can make a post request', async (done) => { 
      const user = await request.post('/user/signUp').send({user : userData[0]}); 
      const id = user.body.user._id; 
        const response = await request.post('/business/post/'+id).send({business : businessData[0]});
        expect(response.status).toBe(201);
        expect(response.body.business.title).toBe(businessData[0].title);
        
        done();
      });   

      it('Can make a get request getting a business by id', async (done) => { 
        
        const user = await request.post('/user/signIn').send({username : userData[0].username,password: userData[0].password}); 
        const uid = user.body.user._id; 
          const business = await request.post('/business/post/'+uid).send({business : businessData[0]}); 
        const id = business.body.business._id; 

        const response = await request.get('/business/get/'+id); 

        expect(response.status).toBe(200);
        expect(response.body.business.title).toBe(businessData[0].title);
        
        done();
      }); 


      it('Can make a get request getting a business by id', async (done) => { 
        
        const user = await request.post('/user/signIn').send({username : userData[0].username,password: userData[0].password}); 
      const uid = user.body.user._id; 
        const business = await request.post('/business/post/'+uid).send({business : businessData[0]});
        const id = business.body.business._id; 

        const response = await request.get('/business/get/'+id); 

        expect(response.status).toBe(200);
        expect(response.body.business.title).toBe(businessData[0].title);
        
        done();
      });
      
      it('Can make a get request getting a business', async (done) => { 
        
         const user = await request.post('/user/signIn').send({username : userData[0].username,password: userData[0].password}); 
        const uid = user.body.user._id; 
        const business = await request.post('/business/post/'+uid).send({business : businessData[0]}); 
         

        const response = await request.get('/business/get/'); 

        expect(response.status).toBe(200);
        expect(response.body.businesses[0].title).toBe(businessData[0].title);
        console.log(response);
        
        done();
      });   

      it('Can make a delete request', async (done) => { 
        
        const user = await request.post('/user/signIn').send({username : userData[0].username,password: userData[0].password});  
        const uid = user.body.user._id; 
        const business = await request.post('/business/post/'+uid).send({business : businessData[0]}); 
        const id = business.body.business._id; 

        const response = await request.delete('/business/delete/'+id); 

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('deleted');
        
        done();
      });  

      it('Can make a put request and update business', async (done) => { 
        
        const user = await request.post('/user/signIn').send({username : userData[0].username,password: userData[0].password});  
        const uid = user.body.user._id; 
        const business = await request.post('/business/post/'+uid).send({business : businessData[0]}); 
        const id = business.body.business._id; 

        const response = await request.put('/business/put/'+id).send({business : {title: 'changed title'}}); 

        expect(response.status).toBe(200);
        expect(response.body.business.title).toBe('changed title');
        
        done();
      });  

      it('Can search for correct options', async (done) => { 
        
        const user = await request.post('/user/signIn').send({username : userData[0].username,password: userData[0].password});  
        const id = user.body.user._id; 
        await request.post('/business/post/'+id).send({business : businessData[0]});  
        await request.post('/business/post/'+id).send({business : businessData[1]});  
        await request.post('/business/post/'+id).send({business : businessData[2]}); 
        await request.post('/business/post/'+id).send({business : businessData[3]}); 

         const response = await request.get('/business/get?title=home&lat=50&long=20&userId='+id); 

        expect(response.status).toBe(200);

        done();
      });  

}); 

describe('Business Unit Tests', () => { 

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

  

  it('can successfully add data to DB', async (done) => { 
    const req = mockRequest(
      {},
      { business : businessData[0] }, 
      {}
    ); 
    const res = mockResponse(); 
    const next = mockNext;
    const result =  await businessController.postBusinessData(req, res,next);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.anything());
      
      done();
    });  

    it('can successfully update data in DB', async (done) => {  
      const business = new businessModel(businessData[0]);

     const id = await business.save();  

      const req = mockRequest(
        {},
        {business : {title : 'new title'}}, 
        { businessId : id.id}
      ); 
      const res = mockResponse(); 
      const next = mockNext;
      const result =  await businessController.updateBusinessData(req, res,next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.anything());
        
        done();
      }); 

  

});