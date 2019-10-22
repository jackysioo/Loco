# LOCO

Business Data Object:
{ 
  title: String,
  user: String,
  profilePic: Url,
  images: [Url],     /// max size = 6
  rating: Num,       /// 0 to 5
  location: String,
  price: String,
  tags: [String],
  reviews: [{
    title: String,
    date: String,
    review: String,
    rating: Num,
    image: Url
  }]
}


exmaple:
{
      title: "Homemade Fresh Pasta",
      user: "Alfonso",
      profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      images: [
        'https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80',
        "https://images.unsplash.com/photo-1560785477-d43d2b34e0df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
      ],
      rating: 4.15,
      location: "Central Vancouver",
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
