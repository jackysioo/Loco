const Logo = require("../assets/imgs/logo.png");
const LogoIcon = require("../assets/icon.png");
const ProfileBackground = require("../assets/imgs/profile-screen-bg.jpg");
const MealIcon = require("../assets/icons/icons8-meal-50.png");
const BlankProfilePic = require("../assets/imgs/blankprofile.png");

const CategoryIcons = [
    {   name: 'Tutor',
        uri: require("../assets/icons/icons8-book-and-pencil-50.png")
    },
    {   name: 'Food',
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
    {   name: 'Hairstyle',
        uri: require("../assets/icons/icons8-hair-dryer-50.png")
    },
    {   name: 'Computer',
        uri: require("../assets/icons/icons8-working-with-a-laptop-50.png")
    }
  ];

export default {
    Logo,
    ProfileBackground,
    CategoryIcons,
    MealIcon,
    LogoIcon,
    BlankProfilePic,
};