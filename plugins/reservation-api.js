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
  api.defaults.withCredentials = false

  api.onRequest((request)=>{
    if(token && !PUBLIC_ENDPOINTS.includes(request.url)){ //&& request.url !== `/auth/tokens?userId=${userId}`
      api.setToken(token, 'Bearer')
    }
  })

  api.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      console.log('here')
    }
  })

  inject('api', api)
}
