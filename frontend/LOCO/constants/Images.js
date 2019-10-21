const Logo = require("../assets/imgs/logo.png");
const ProfileBackground = require("../assets/imgs/profile-screen-bg.jpg");
const MealIcon = require("../assets/icons/icons8-meal-50.png");

// internet imgs
const ProfilePicture = 'https://i.pinimg.com/originals/52/f8/91/52f891d604b9dce10afd5e780219e68d.jpg'; 
const pic1 = 'https://i0.wp.com/lashtherapeutics.com/wp-content/uploads/2017/09/EE05288A-D6D4-4810-AA0D-832B27AC4846-e1518452791987-600x592.jpg?resize=600%2C592&ssl=1';
const pic2 = 'https://lashwaxboutique.com/wp-content/uploads/2018/05/lash-and-wax-boutique_home_hero5-1.jpg';
const pic3 = 'https://heytheredreamerblog.files.wordpress.com/2017/11/photo6111842306383521781.jpg?w=924';
const pic4 = 'https://www.graziame.com/sites/default/files/graziame/styles/full_img/public/images/2018/03/07/28152824_187277258541916_4613926939088912384_n%281%29.jpg?itok=_DqbVXPv';
const pic5 = 'https://balashes.com/wp-content/uploads/2019/03/beyelian-pandora-skyline-russian-volume-eyelash-extensions-2.jpg';
const pic6 = 'https://newagespainstitute.com/edu/wp-content/uploads/2018/05/Eyelash-Extension.jpg';
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
    MealIcon,
    pic1,
    pic2,
    pic3,
    pic4,
    pic5,
    pic6,
};