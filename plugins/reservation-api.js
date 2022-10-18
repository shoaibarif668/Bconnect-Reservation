import TokenService from "~/services/token.service";
import {PUBLIC_ENDPOINTS} from "~/utils/constants";
import {businessIdFromURL} from "~/utils/helpers";
import {ROUTES} from "~/utils/constants/routes";

export default function ({ $axios,app,redirect,route }, inject) {

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
    const token = TokenService.getLocalAccessToken(app.$cookies) || "";
    if(token && !PUBLIC_ENDPOINTS.includes(request.url)){ //&& request.url !== `/auth/tokens?userId=${userId}`
      api.setToken(token, 'Bearer')
    }
  })

  api.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      TokenService.clearStorage(app.$cookies)
      redirect(`/reservation/${route.params?.business}${ROUTES.BOOKING}`)
    }
  })

  inject('api', api)
}
