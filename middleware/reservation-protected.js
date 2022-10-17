import TokenService from "~/services/token.service";
import {ROLES} from "~/utils/constants";
import {BUSINESS_PRIVATE_ROUTES, CUSTOMER_PRIVATE_ROUTES, PUBLIC_ROUTES, ROUTES} from "~/utils/constants/routes";
import {currentLoggedInUserRole} from "~/utils/helpers";

export default function ({$cookies,redirect,route,app}) {
  const userRole = currentLoggedInUserRole($cookies)
  const mutatedBusinessPrivateRoutes = BUSINESS_PRIVATE_ROUTES.map((el)=>`/reservation/${route.params?.business}${el}`)
  const mutatedCustomerPrivateRoutes = CUSTOMER_PRIVATE_ROUTES.map((el)=>`/reservation/${route.params?.business}${el}`)
  const mutatedPublicRoutes = PUBLIC_ROUTES.map((el)=>`/reservation/${route.params?.business}${el}`)

  if(userRole === ROLES.BUSINESS){
    if(!mutatedBusinessPrivateRoutes.includes(route.fullPath) && !mutatedPublicRoutes.includes(route.fullPath)){
      redirect(`/reservation/${route.params?.business}${ROUTES.BOOKING}`)
    }
  }else if(userRole === ROLES.CUSTOMER){
    if(!mutatedCustomerPrivateRoutes.includes(route.fullPath) && !mutatedPublicRoutes.includes(route.fullPath)){
      redirect(`/reservation/${route.params?.business}${ROUTES.BOOKING}`)
    }
  }
}
