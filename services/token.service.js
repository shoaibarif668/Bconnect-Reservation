import {cookieAuth, cookieData, cookieRefresh} from "@/utils/constants/cookies";
import {TOKEN_RETRIES} from "@/utils/constants/tokens";

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
    updateUser = (key, value) => {
        const userObject = this.getUser();
        userObject[key] = value;
        this.setUser(userObject);
    }

    clearStorage = (cookies) => {
        // localStorage.clear();
        cookies.removeAll()
    }
}
export default new TokenService();
