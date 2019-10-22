# LOCO

Business Data Object:
{ 
  title: String,
  user: String,
  about: String,
  profilePic: Url,
  images: [Url],     /// max size = 6
  rating: Num,       /// 0 to 5
  region: String,
  location: {
    lat: Num,
    long: Num
  }                   /// coordinates
  price: String,
  tags: [String],
  reviews: [{
    title: String,
    date: String,
    review: String,
    rating: Num,
    image: Url,
    user: String
  }]
}


exmaple:
{
      title: "Homemade Fresh Pasta",
      user: "Alfonso",
      aobut: "Viverra adipiscing at in tellus. Et leo duis ut diam. Adipiscing commodo elit at imperdiet. Amet consectetur adipiscing elit ut. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis.",
      profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      images: [
        'https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80',
        "https://images.unsplash.com/photo-1560785477-d43d2b34e0df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
      ],
      rating: 4.15,
      region: "Central Vancouver",
      location: {
        lat: 147.23,
        long: -49.003
      }
      price: "$15/set",
      reviews: [{
        title: "Great food!",
        date: "Jan 23, 2019",
        review: "This experience was incredible! They were so friendly and welcoming.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1481931098730-318b6f776db0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=637&q=80"
       },{
        title: "Authentic experience",
        date: "Jan 23, 2019",
        review: "Would definitely come back!",
        rating: 4,
        image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=653&q=80"
       },{
        title: "Loved chatting with them",
        date: "Jan 23, 2019",
        review: "The price is slightly pricey, but worth it for the experience",
        rating: 3.5,
        image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=653&q=80"
       },{
        title: "Loved chatting with them",
        date: "Jan 23, 2019",
        review: "The price is slightly pricey, but worth it for the experience",
        rating: 3.5,
        image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
       }],
      tags: ["food", "homecooked", "pasta", "meal"]
}





User Data Object:
{
  username: String,
  fullName: String,
  profilePic: URL,
  following: Num,
  address: [String],
  birthday: String,
  reviews: [{
    title: String,
    date: String,
    review: String,
    rating: Num,
    image: Url,
    user: String
  }],
  services: [{
    title: String,
    rating: Num,
    image: URL
  }]
}

example:
{
username: "pengu123",
    fullName: "Tanya Cooper",
    profilePic: 'https://images.unsplash.com/photo-1481824429379-07aa5e5b0739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=942&q=80',
    following: 100,
    address: ["8888 Address Street", "Vancouver, BC", "A8A 8A8"],
    birthday: "Feb 14, 1996",
    reviews: [{
      title: "Great food!",
      date: "Jan 23, 2019",
      review: "This experience was incredible! They were so friendly and welcoming.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1481931098730-318b6f776db0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=637&q=80"
    }, {
      title: "Authentic experience",
      date: "Jan 23, 2019",
      review: "Would definitely come back!",
      rating: 4,
      image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=653&q=80"
    }, {
      title: "Loved chatting with them",
      date: "Jan 23, 2019",
      review: "The price is slightly pricey, but worth it for the experience",
      rating: 3.5,
      image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=653&q=80"
    }, {
      title: "Loved chatting with them",
      date: "Jan 23, 2019",
      review: "The price is slightly pricey, but worth it for the experience",
      rating: 3.5,
      image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    }],
    services: [{
      title: "Hard Gel Manicure",
      rating: 5,
      image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
    }, {
      title: "3D Volume Lash Extensions",
      rating: 4,
      image: "https://images.unsplash.com/photo-1558622625-697f40efc834?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"
    }]
}
