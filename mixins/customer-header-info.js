import {ROLES} from "~/utils/constants";
import TokenService from "~/services/token.service";

export default {
  data(){
    return{
      isCustomerLoggedIn:(this.$store.state.loggedInUserRole === ROLES.CUSTOMER),
      userData:TokenService.getUser(this.$cookies) || {}
    }
  },
  computed: {
    isUserLoggedIn () {
      return this.$store.state.loggedInUserRole
    }
  },
  watch:{
    isUserLoggedIn(){
      this.isCustomerLoggedIn = (this.$store.state.loggedInUserRole === ROLES.CUSTOMER)

      if(this.isCustomerLoggedIn){
        this.userData = TokenService.getUser(this.$cookies)
      }
    }
  },
}
