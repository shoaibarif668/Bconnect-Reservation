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

export const userTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export const toIsoString = (date) => {
  let tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function(num) {
      return (num < 10 ? '0' : '') + num;
    };

  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    '.000' +
    dif + pad(Math.floor(Math.abs(tzo) / 60)) +
    ':' + pad(Math.abs(tzo) % 60);
}

export const dateFromUsersTimezone = (date) => {
  return !!Date.parse(new Date(date)) ? new Date(date).toLocaleString('en-US', { timeZone: userTimeZone() }) : null
}
