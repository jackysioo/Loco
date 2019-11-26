
import  userCache  from "../caches/UserCache";

export const USER_KEY = "auth-demo-key";

export const onSignIn = () => userCache.storeData(USER_KEY, "true");

export const onSignOut = () => userCache.removeData(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    userCache.getData(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};