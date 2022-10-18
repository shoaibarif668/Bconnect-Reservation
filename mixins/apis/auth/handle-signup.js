import {businessIdFromURL, viewError} from "~/utils/helpers";
import TokenService from "~/services/token.service";
import {ROLES} from "~/utils/constants";

export const handleSignup =  {
  data(){
    return{
      isHandleSignupLoading : false,
      handleSignupError: ''
    }
  },
  methods:{
    async handleSignupMixinSubmit(data) {
      this.isHandleSignupLoading = true
      this.handleSignupError = false
      this.$api.post(`/auth/signup?businessId=${businessIdFromURL(this)}`,data)
        .then((response)=>{
          TokenService.saveLocalAccessToken(response.data?.data?.tokens?.access_token,this.$cookies)
          TokenService.setUser(response.data?.data?.user?.id ? {...response.data?.data?.user,_id:response.data?.data?.user?.id} : response.data?.data?.user,this.$cookies)
          this.$store.commit('HANDLE_LOGGED_IN_USER_ROLE',response.data?.data?.user?.isBusiness ? ROLES.BUSINESS : ROLES.CUSTOMER)
          this.$emit('handle-signup',false)
          if(this.isBooking){
            this.$emit('handle-confirm-booking',true,response.data?.data?.user?._id)
          }
        })
        .catch((e)=>{
          this.handleSignupError = viewError(e)
        })
        .finally(()=>{
          this.isHandleSignupLoading = false
        })
    },
  }
}
