import {cookieAuth, cookieData, cookieRefresh} from "@/utils/constants/cookies";
import {TOKEN_RETRIES} from "@/utils/constants/tokens";

class TokenService {
    getLocalAccessToken = (cookies) => {
        return cookies.get(cookieAuth)
    }
    saveLocalAccessToken = (token,cookies) => {
      cookies.set(cookieAuth,token)
    }
    getLocalRefreshToken = (cookies) => {
        return cookies.get(cookieRefresh)
    }
    saveLocalRefreshToken = (token,cookies) => {
      cookies.set(cookieRefresh,token)
    }
    getUser = (cookies) => {
        // try {
        //     // return {}//JSON.parse(localStorage.getItem(cookieData));
        //
        // } catch{
        //     return {}
        // }
      return cookies.get(cookieData)
    }
    setUser = (user,cookies) => {
        // localStorage.setItem(cookieData, JSON.stringify(user));
      cookies.set(cookieData, JSON.stringify(user));
    }
    updateUser = (key, value) => {
        const userObject = this.getUser();
        userObject[key] = value;
        this.setUser(userObject);
    }
    setTokenRetries = (retries,cookies) => {
        // localStorage.setItem(TOKEN_RETRIES,retries)
      cookies.set(TOKEN_RETRIES,retries)
    }
    getTokenRetries = (cookies) => {
        // return {}//localStorage.getItem(TOKEN_RETRIES)
      return cookies.get(TOKEN_RETRIES)
    }
    clearStorage = (cookies) => {
        // localStorage.clear();
        cookies.removeAll()
    }
}
export default new TokenService();
