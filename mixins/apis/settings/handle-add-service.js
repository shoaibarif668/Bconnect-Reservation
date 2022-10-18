import {businessIdFromURL, viewError} from "~/utils/helpers";

export const handleAddService =  {
  data(){
    return{
      isHandleAddServiceLoading : false,
      handleAddServiceError: ''
    }
  },
  methods:{
    async handleAddServiceMixinSubmit(data) {
      this.isHandleAddServiceLoading = true
      this.handleAddServiceError = false
      this.$api.post(`/service?businessId=${businessIdFromURL(this)}`,data)
        .then(()=>{
          this.$emit('handle-add-services',false)
          this.$emit('confirm-service-added')
        })
        .catch((e)=>{
          this.handleAddServiceError = viewError(e)
        })
        .finally(()=>{
          this.isHandleAddServiceLoading = false
        })
    },
  }
}
