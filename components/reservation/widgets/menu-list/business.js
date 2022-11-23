import {ROUTES} from "~/utils/constants/routes";

export const business = [
  {
    title:"Dashboard",
    link:ROUTES.BUSINESS,
  },
  {
    title:"Marketing",
    externalLink:"https://bconnect-client.netlify.app/",
  },
  {
    title:"Booking",
    link:ROUTES.BOOKING,
  },
  {
    title:"Booking History",
    link:ROUTES.BOOKING_HISTORY,
  },
  {
    title:'Manage Business',
    children:[
      {
        title:"Business Settings",
        link:ROUTES.BUSINESS_SETTINGS,
      },
      {
        title:"Manage Professionals",
        link:ROUTES.MANAGE_PROFESSIONALS,
      },
      {
        title:"Manage Clients",
        link:ROUTES.MANAGE_CLIENTS,
      },
      {
        title:"Manage Services",
        link:ROUTES.MANAGE_SERVICES,
      },
    ]
  },
  {
    title:"Logout",
  },
]
