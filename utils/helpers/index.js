import TokenService from "~/services/token.service";
import {ROLES} from "~/utils/constants";

export const viewError = (err) => {
  if (Array.isArray(err.response.data.message)){
    return err.response.data.message[0]
  }else{
    return err.response.data.message
  }
}
export const businessIdFromURL = (self) => {
  return self.$route.params?.business || ''
}

export const currentLoggedInUserRole = ($cookies) => {
  return  Object.keys(TokenService.getUser($cookies) || {}).includes('isBusiness') ? TokenService.getUser($cookies)?.isBusiness ? ROLES.BUSINESS : ROLES.CUSTOMER : null
}
