import {businessIdFromURL, viewError} from "~/utils/helpers";
import TokenService from "@/services/token.service";

export const handleEditSettings =  {
  data(){
    return{
      isHandleEditSettingsLoading : false,
      handleEditSettingsError: ''
    }
  },
  methods:{
    async handleEditSettingsMixinSubmit(fieldDetails,userId) {
      this.isHandleEditSettingsLoading = true
      this.handleEditSettingsError = false
      this.$api.put(`/customer?businessId=${businessIdFromURL(this)}&customerId=${userId}`,fieldDetails)
        .then(()=>{
          TokenService.updateUser(this.$cookies,'userName',fieldDetails?.userName)
          TokenService.updateUser(this.$cookies,'email',fieldDetails?.email)
          TokenService.updateUser(this.$cookies,'phoneNumber',fieldDetails?.phoneNumber)
          this.$emit('handle-personal-settings-modal',false)
          this.$emit('confirm-settings')
        })
        .catch((e)=>{
          this.handleEditSettingsError = viewError(e)
        })
        .finally(()=>{
          this.isHandleEditSettingsLoading = false
        })
    },
  }
}
