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

export const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier.toUpperCase() === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  console.log(time12h,`${hours}:${minutes}`,"1")
  return `${hours}:${minutes}`;
}

export const convertTime24to12 = (time) => {

  // Check correct time format and split into components
  time = time?.toString ()?.match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time?.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time?.join(''); // return adjusted time or original string
}
