import {businessIdFromURL, viewError} from "~/utils/helpers";

export const handleAddProfessional = {
  data(){
    return{
      isHandleAddProfessionalLoading : false,
      handleAddProfessionalError:''
    }
  },
  methods:{
    async handleAddProfessionalMixinSubmit(professionalData) {
      this.isHandleAddProfessionalLoading = true
      this.handleAddProfessionalError=''
      this.$api.post(`/professional?businessId=${businessIdFromURL(this)}`,professionalData)
        .then(()=>{
          this.$emit('handle-add-professional',false)
          this.$emit('confirm-professional-added')
        })
        .catch((e)=>{
          this.handleAddProfessionalError=viewError(e)
        })
        .finally(()=>{
          this.isHandleAddProfessionalLoading = false
        })
    },
  }
}
