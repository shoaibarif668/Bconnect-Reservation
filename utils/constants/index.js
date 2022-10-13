
export const ROLES = Object.freeze({
    SEEKER : 'Seeker',
    ORGANIZER : 'Organizer',
    ADMIN : 'Admin'
})

export const WEBSITE =
    "http://localhost:8080/"
    //"https://renloc.vercel.app/"
    // "https://dev.renloc.com/"

export const PUBLIC_ENDPOINTS = ['/auth/signup','/auth/email-verification'
    ,'/auth/login','/auth/forgot-password','/auth/forgot-password/change-password'
    ,'/auth/user-validation']

/***
 * Media BaseUrl
 * @type {string}
 */
export const MEDIA_BASEURL = "https://dev.cultureinyourcity.com/uploads/"
