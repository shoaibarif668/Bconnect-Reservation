import {viewError} from "~/utils/helpers";

export const handleEditService =  {
  data(){
    return{
      isHandleEditServiceLoading : false,
      handleEditServiceError: ''
    }
  },
  methods:{
    async handleEditServiceMixinSubmit(data,serviceId) {
      this.isHandleEditServiceLoading = true
      this.handleEditServiceError = false
      this.$api.put(`/service/?serviceId=${serviceId}`,data)
        .then(()=>{
          this.$emit('handle-edit-services',false)
          this.$emit('confirm-service-added')
        })
        .catch((e)=>{
          this.handleEditServiceError = viewError(e)
        })
        .finally(()=>{
          this.isHandleEditServiceLoading = false
        })
    },
  }
}
