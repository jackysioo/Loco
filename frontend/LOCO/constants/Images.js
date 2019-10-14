const Logo = require("../assets/imgs/logo.png");
const ProfileBackground = require("../assets/imgs/profile-screen-bg.png");
const MealIcon = require("../assets/icons/icons8-meal-50.png");

// internet imgs
const ProfilePicture = 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?fit=crop&w=1650&q=80'; 
const CategoryIcons = [
    {   name: 'Tutor',
        uri: require("../assets/icons/icons8-book-and-pencil-50.png")
    },
    {   name: 'Meal',
        uri: require("../assets/icons/icons8-meal-50.png")
    },
    {   name: 'Beauty',
        uri: require("../assets/icons/icons8-eyelash-50.png")
    },
    {   name: 'Photo',
        uri: require("../assets/icons/icons8-slr-camera-50.png")
    },
    {   name: 'Dessert',
        uri: require("../assets/icons/icons8-cake-50.png")
    },
    {   name: 'Language',
        uri: require("../assets/icons/icons8-translation-50.png")
    },
    {   name: 'Hair Stylist',
        uri: require("../assets/icons/icons8-hair-dryer-50.png")
    },
    {   name: 'More',
        uri: require("../assets/icons/icons8-more-50.png")
    }
  ];

export default {
    Logo,
    ProfilePicture,
    ProfileBackground,
    CategoryIcons,
    MealIcon
};