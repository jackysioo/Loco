import React from "react";
import {
    View,
} from 'react-native';

const userServer = "http://loco.eastus.cloudapp.azure.com:1337/user"
const businessServer = "http://loco.eastus.cloudapp.azure.com:1337/business"
const reviewServer = "http://loco.eastus.cloudapp.azure.com:1337/review"

class UserController extends React.Component {

    async createUser(user) {
        try {
            const res = await fetch(userServer + "/post", {
                body: user
            })
            if (res.ok) {
                console.log("user created")
                return res.userID
            }
        }
        catch (error) {
            return console.log(error);
        }
    }

    async updateUser(user, userID) {
        try {
            const res = await fetch(userServer + "/put/" + userID, {
                body: user
            })
            if (res.ok) {
                console.log("user updated")
                return res.userID
            }
        }
        catch (error) {
            return console.log(error);
        }
    }

    async deletdUser(userID) {
        try {
            const res = await fetch(userServer + "/delete/" + userID)
            if (res.ok) {
                console.log("user deleted")
            }
        }
        catch (error) {
            return console.log(error);
        }
    }

    //new business object EXCLUDE reviews
    async addBusiness(business, userID) {
        try {
            const res = await fetch(businessServer + "/post/" + userID, {
                body: business
            })
            if (res.ok) {
                console.log("business added under " + userID)
                return res.business_id
            }
        }
        catch (error) {
            return console.log(error);
        }
    }

    //include businessID in business object when updating
    async updateBusiness(business, businessID) {
        try {
            const res = await fetch(businessServer + "/put/" + businessID, {
                body: business
            })
            if (res.ok) {
                console.log("business updated under " + businessID)
            }
        }
        catch (error) {
            return console.log(error);
        }
    }


    async deleteBusiness(businessID) {
        try {
            const res = await fetch(businessServer + "/delete/" + businessID)
            if (res.ok) {
                console.log("business deleted")
            }
        }
        catch (error) {
            return console.log(error);
        }
    }


    //pass review object with reviewID
    async addBusinessReview(review, userID, businessID) {
        try {
            const res = await fetch(reviewServer + "/post/" + userID + "/" + businessID, {
                body: review
            })
            if (res.ok) {
                console.log("review added under " + businessID)
                return res.review_id
            }
        }
        catch (error) {
            return console.log(error);
        }
    }

    //pass review object with reviewID
    async updateBusinessReview(review, reviewID) {
        try {
            const res = await fetch(reviewServer + "/put/" + reviewID, {
                body: review
            })
            if (res.ok) {
                console.log("review updated under " + reviewID)
            }
        }
        catch (error) {
            return console.log(error);
        }
    }

    async deleteBusinessReview(reviewID) {
        try {
            const res = await fetch(reviewServer + "/delete/" + reviewID)
            if (res.ok) {
                console.log("review deleted")
            }
        }
        catch (error) {
            return console.log(error);
        }
    }



    render() {
        return (
            <View>
            </View>
        )
    }
}


const userController = new UserController()
export default (userController)