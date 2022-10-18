import TokenService from "~/services/token.service";
import {ROLES} from "~/utils/constants";
import {BUSINESS_PRIVATE_ROUTES, CUSTOMER_PRIVATE_ROUTES, PUBLIC_ROUTES, ROUTES} from "~/utils/constants/routes";
import {currentLoggedInUserRole} from "~/utils/helpers";

export default function ({$cookies,redirect,route,app}) {
  const userRole = currentLoggedInUserRole($cookies)
  const isUserLoggedIn = TokenService.getUser($cookies)?._id

  const mutatedBusinessPrivateRoutes = BUSINESS_PRIVATE_ROUTES.map((el)=>`/reservation/${route.params?.business}${el}`)
  const mutatedCustomerPrivateRoutes = CUSTOMER_PRIVATE_ROUTES.map((el)=>`/reservation/${route.params?.business}${el}`)
  const mutatedPublicRoutes = PUBLIC_ROUTES.map((el)=>`/reservation/${route.params?.business}${el}`)

  if(!isUserLoggedIn){
    TokenService.clearStorage($cookies)
    redirect(`/reservation/${route.params?.business}${ROUTES.BOOKING}`)
  }
  if(userRole === ROLES.BUSINESS){
    if(!mutatedBusinessPrivateRoutes.includes(route.fullPath.split('?')[0]) && !mutatedPublicRoutes.includes(route.fullPath.split('?')[0])){
      redirect(`/reservation/${route.params?.business}${ROUTES.BOOKING}`)
    }
  }else if(userRole === ROLES.CUSTOMER){
    if(!mutatedCustomerPrivateRoutes.includes(route.fullPath.split('?')[0]) && !mutatedPublicRoutes.includes(route.fullPath.split('?')[0])){
      redirect(`/reservation/${route.params?.business}${ROUTES.BOOKING}`)
    }
  } else{
    if(!mutatedPublicRoutes.includes(route.fullPath.split('?')[0])){
      redirect(`/reservation/${route.params?.business}${ROUTES.BOOKING}`)
    }
  }
}
