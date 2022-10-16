import TokenService from "~/services/token.service";
import {PUBLIC_ENDPOINTS} from "~/utils/constants";

export default function ({ $axios,app }, inject) {
  const token = TokenService.getLocalAccessToken(app.$cookies) || "";
  const userId = TokenService.getUser(app.$cookies)?._id

  // // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      },
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }
  })


  api.setBaseURL('https://booking-api.bconnect-staging.com/api/v1')


  api.onRequest((request)=>{
    console.log(request,"api")
    if(token && !PUBLIC_ENDPOINTS.includes(request.url)){ //&& request.url !== `/auth/tokens?userId=${userId}`
      api.setToken(token, 'Bearer')
    }
    // else{
    //   api.setToken('2', 'Bearer')
    // }
  })

  // api.onError(async err=>{
  //   const originalConfig = err.config;
  //
  //   const retries = TokenService.getTokenRetries(app.$cookies)
  //   // console.log(originalConfig,"originalConfig")
  //
  //   if (!PUBLIC_ENDPOINTS.includes(originalConfig?.url.split("?")[0] ? originalConfig?.url.split("?")[0] : originalConfig?.url) || err.response) {
  //     //!originalConfig._retry ||
  //     // console.log(originalConfig.url.split("?")[0] ? originalConfig.url.split("?")[0] : originalConfig.url,"hehe")
  //     if(retries > 0 && retries){
  //       const userId = TokenService.getUser(app.$cookies)?._id
  //       // Access Token was expired
  //       if (err.response.status === 401) {
  //
  //         // console.log(originalConfig,"originalConfig2")
  //         if(originalConfig.url === `/auth/tokens?userId=${userId}`){
  //           TokenService.setTokenRetries(retries-1,app.$cookies)
  //         }
  //         originalConfig._retry = true;
  //         try {
  //           const rs = await api.get(`/auth/tokens?userId=${userId}`)
  //
  //           const { access_token,refresh_token } = rs.data.data.tokens;
  //           TokenService.saveLocalRefreshToken(refresh_token,app.$cookies)
  //           TokenService.saveLocalAccessToken(access_token,app.$cookies);
  //           TokenService.setTokenRetries(5,app.$cookies)
  //           return api(originalConfig);
  //         } catch (error) {
  //           return Promise.reject(error);
  //         }
  //       }
  //       else{
  //         app.router.push(`/reservation/asdd/booking`)
  //       }
  //     }else{
  //       TokenService.clearStorage(app.$cookies)
  //       //Call for new refresh token
  //       app.router.push(`/reservation/asdd/booking`)
  //     }
  //   }
  //   return Promise.reject(err);
  // })

  inject('resAxios', api)
}
