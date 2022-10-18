import {businessIdFromURL, viewError} from "~/utils/helpers";
import TokenService from "~/services/token.service";
import {ROLES} from "~/utils/constants";

export const handleLogin =  {
  data(){
    return{
      isHandleLoginLoading : false,
      handleLoginError: ''
    }
  },
  methods:{
    async handleLoginMixinSubmit(data) {
      this.isHandleLoginLoading = true
      this.handleLoginError = false
      this.$api.post(`/auth/login?businessId=${businessIdFromURL(this)}`,data)
        .then((response)=>{
          let userObjectWithId = response.data?.data?.user?.id ? {...response.data?.data?.user,_id:response.data?.data?.user?.id} : response.data?.data?.user
          let userObjectWithRole = userObjectWithId?.isBusiness ? userObjectWithId : {...userObjectWithId,isBusiness:false}

          TokenService.saveLocalAccessToken(response.data?.data?.tokens?.access_token,this.$cookies)
          TokenService.setUser(userObjectWithRole,this.$cookies)
          this.$store.commit('HANDLE_LOGGED_IN_USER_ROLE',response.data?.data?.user?.isBusiness ? ROLES.BUSINESS : ROLES.CUSTOMER)
          this.$emit('handle-login',false)
          if(this.isBooking){
            this.$emit('handle-confirm-booking',true,response.data?.data?.user?._id)
          }
        })
        .catch((e)=>{
          this.handleLoginError = viewError(e)
        })
        .finally(()=>{
          this.isHandleLoginLoading = false
        })
    },
  }
}
