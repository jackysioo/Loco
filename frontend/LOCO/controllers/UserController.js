import React from "react";
import {
    View,
} from 'react-native';
import userCache from '../caches/UserCache'

const userServer = "http://loco.eastus.cloudapp.azure.com:1337/user"
const businessServer = "http://loco.eastus.cloudapp.azure.com:1337/business"
const reviewServer = "http://loco.eastus.cloudapp.azure.com:1337/review"

class UserController extends React.Component {

    constructor(props) {
        super(props);
        this.userID = null
        this.userToken = null
    }

    async init() {
        try {
            const userID = await userCache.getUserID()
            const data = await userCache.getData(userID)
            this.userID = userID
            this.userToken = data.token
        }
        catch (error) {
            console.log(error);
        }
    }

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
            const res = await fetch(userServer + "/get/" + userID,{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
                }
            })
            const user = await res.json();
            return (user);
        }
        catch (error) {
            return console.log(error);
        }
    }

    async getSuggestions() {
        try {
            const res = await fetch(userServer + "/getSuggestions/" + this.userID,{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
                }
            })
            const businesses = await res.json();
            return (businesses);
        }
        catch (error) {
            return console.log(error);
        }
    }
    

    async updateUser(user) {
        try {
            const res = await fetch(userServer + "/put/" + this.userID, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
                },
                body: JSON.stringify({ user: user})
            })
            if (res.ok) {
                await this._updateUserData()
                return true
            } else {
                return 404
            }
        }
        catch (error) {
            return console.log(error);
        }
    }

    async deletdUser() {
        try {
            const res = await fetch(userServer + "/delete/" + this.userID, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
                }
            })
            if (res.ok) {
                console.log("user deleted")
            }
        }
        catch (error) {
            return console.log(error);
        }
    }


    //new business object EXCLUDE reviews
    async addBusiness(business) {
        try {
            const res = await fetch(businessServer + "/post/" + this.userID, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
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
            const res = await fetch(businessServer + "/get/" + businessID, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
                }})
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
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
                },
                body: JSON.stringify({ business: business})
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
            const res = await fetch(businessServer + "/delete/" + businessID, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
                }})
            if (res.ok) {
                console.log("business deleted")
            }
        }
        catch (error) {
            return console.log(error);
        }
    }

    //pass review object with reviewID
    async addReview(review, businessID) {
        try {
            const res = await fetch(reviewServer + "/post/" + this.userID + "/" + businessID, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
                },
                body: JSON.stringify({ review: review})
            })
            if (res.ok) {
                const data = await res.json()
                return data.review._id
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
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
                },
                body: JSON.stringify({ review: review})
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
            const res = await fetch(reviewServer + "/delete/" + reviewID, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.userToken
                },
            })
            if (res.ok) {
                console.log("review deleted")
            }
        }
        catch (error) {
            return console.log(error);
        }
    }

    async _updateUserData() {
        try {
            const res = await this.getUser(this.userID)
            console.log(res)
            userCache.removeData(this.userID)
            userCache.storeData(this.userID, JSON.stringify(res))
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