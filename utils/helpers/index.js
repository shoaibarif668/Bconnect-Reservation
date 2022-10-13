import TokenService from "@/services/token.service";
import {cookieAuth, cookieRefresh} from "@/utils/constants/cookies";
import Cookies from "js-cookie";

export const viewError = (error) => {
    return Array.isArray(error) ? error[0] :error
}

export const isUserLoggedIn = () => {
    return !!TokenService.getUser()?._id && (!!Cookies.get(cookieAuth) && !!Cookies.get(cookieRefresh))
}

export const userTimeZone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export const twentyFourHourToTwelveHourFormat = (time) => {
    // Check correct time format and split into components
    time = time?.toString ()?.match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time?.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time?.join (''); // return adjusted time or original string
}

export const isoDateToNormalDate = (isoDate) => {
    if(!isNaN(Date.parse(isoDate))){
        const date = new Date(isoDate?.split("T")[0])

        return date.toDateString()
    }else return null
}

export const userCurrentTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export const dateToTimeRange = (eventStartDate) => {

    const currentTimezone = userCurrentTimezone()
    const eventTimezoneDate = new Date(eventStartDate).toLocaleString('en-US', { timeZone: currentTimezone })
    const currentTimezoneDate = eventTimezoneDate.toLocaleString('en-US', { timeZone: currentTimezone })
    const userCurrentDate = new Date().toLocaleString('en-US', { timeZone: currentTimezone })

    //If the user's date is greater than the event date, then event is in the past and is already started.
    if(new Date(userCurrentDate).getTime() > new Date(currentTimezoneDate).getTime()){
        return {days : 0,hours : 0,minutes : 0,seconds : 0}
    }

    // get total seconds between the times
    let delta = Math.abs(new Date(currentTimezoneDate) - new Date()) / 1000;

    // calculate (and subtract) whole days
    let days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    let seconds = delta % 60;  // in theory the modulus is not required

    return {days,hours,minutes,seconds}
}
