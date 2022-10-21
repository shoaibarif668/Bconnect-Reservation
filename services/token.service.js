import {cookieAuth, cookieBusiness, cookieData} from "@/utils/constants/cookies";

class TokenService {
    getLocalAccessToken = (cookies) => {
        return cookies.get(cookieAuth)
    }
    saveLocalAccessToken = (token,cookies) => {
      cookies.set(cookieAuth,token)
    }

    getUser = (cookies) => {
      return cookies.get(cookieData)
    }
    setUser = (user,cookies) => {
        // localStorage.setItem(cookieData, JSON.stringify(user));
      cookies.set(cookieData, JSON.stringify(user));
    }

    getBusiness = (cookies) => {
      return cookies.get(cookieBusiness)
    }
    setBusiness = (data,cookies) => {
      cookies.set(cookieBusiness, JSON.stringify(data));
    }

    updateUser = (cookies,key, value) => {
        const userObject = this.getUser(cookies);
        userObject[key] = value;
        this.setUser(userObject,cookies);
    }

    clearStorage = (cookies) => {
        // localStorage.clear();
        cookies.removeAll()
    }
}
export default new TokenService();
