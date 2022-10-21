
export const handleResetPassword = {
  data(){
    return{
      isHandleResetPasswordLoading : false,
    }
  },
  methods:{
    async handleResetPasswordMixinSubmit(customerId) {
      this.isHandleResetPasswordLoading = true
      this.$api.put(`customer/password?customerId=${customerId}`)
        .then(()=>{
          this.isPasswordReset = true
        })
        .catch((e)=>{
          console.log(e,"e")
        })
        .finally(()=>{
          this.isHandleResetPasswordLoading = false
        })
    },
  }
}
