import React from "react";
import {
    View,
} from 'react-native';

const userServer = "http://loco.eastus.cloudapp.azure.com:1337/user"
const businessServer = "http://loco.eastus.cloudapp.azure.com:1337/business"
const reviewServer = "http://loco.eastus.cloudapp.azure.com:1337/review"

class UserController extends React.Component {

    async signUp(user) {
        try {
            const res = await fetch(userServer + "/signUp", {
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user : user })
            })
            if (res.ok) {
                const data = await res.json()
                return data
            } else {
                return 404
            }
        }
        catch (error) {
            return console.log(error);
        }
    }

    async signIn(username, password) {
        try {
            const res = await fetch(userServer + "/signIn", {
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            if (res.ok) {
                const data = await res.json()
                return data
            } else {
                return 404
            }
        }
        catch (error) {
            return console.log(error);
        }
    }

    async getUser(userID) {
        try {
            const res = await fetch(userServer + "/get/" + userID)
            const user = await res.json();
            return (user);
        }
        catch (error) {
            return console.log(error);
        }
    }

    async getSuggestions(userID) {
        try {
            const res = await fetch(userServer + "/getSuggestions/" + userID)
            const businesses = await res.json();
            return (businesses);
        }
        catch (error) {
            return console.log(error);
        }
    }
    

    async updateUser(user, userID) {
        try {
            const res = await fetch(userServer + "/put/" + userID, {
                body: { user: user }
            })
            if (res.ok) {
                console.log("user updated")
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
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ business: business})
            })
            if (res.ok) {
                const data = await res.json()
                return data.business._id
            } else {
                return 404
            }
        }
        catch (error) {
            return console.log(error);
        }
    }


    async getBusiness(businessID) {
        try {
            const res = await fetch(businessServer + "/get/" + businessID)
            const business = await res.json();
            return (business);
        }
        catch (error) {
            return console.log(error);
        }
    }

    //include businessID in business object when updating
    //CALL updateReviews to update reviews
    async updateBusiness(business, businessID) {
        try {
            const res = await fetch(businessServer + "/put/" + businessID, {
                body: { business: business } 
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
    async addReview(review, userID, businessID) {
        try {
            const res = await fetch(reviewServer + "/post/" + userID + "/" + businessID, {
                body: {review : review}
            })
            if (res.ok) {
                console.log("review added under " + businessID)
                return res.review._id
            }
        }
        catch (error) {
            return console.log(error);
        }
    }

    //pass review object with reviewID
    async updateReview(review, reviewID) {
        try {
            const res = await fetch(reviewServer + "/put/" + reviewID, {
                body: { review : review }
            })
            if (res.ok) {
                console.log("review updated under " + reviewID)
            }
        }
        catch (error) {
            return console.log(error);
        }
    }

    async deleteReview(reviewID) {
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


export default (UserController)