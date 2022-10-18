import {viewError} from "~/utils/helpers";

export const handleEditProfessional = {
  data(){
    return{
      isHandleEditProfessionalLoading : false,
      handleEditProfessionalError:''
    }
  },
  methods:{
    async handleEditProfessionalMixinSubmit(professionalData,professionalId) {
      this.isHandleEditProfessionalLoading = true
      this.handleEditProfessionalError=''
      this.$api.put(`/professional?professionalId=${professionalId}`,professionalData)
        .then(()=>{
          this.$emit('handle-add-professional',false)
          this.$emit('confirm-professional-added')
        })
        .catch((e)=>{
          this.handleEditProfessionalError=viewError(e)
        })
        .finally(()=>{
          this.isHandleEditProfessionalLoading = false
        })
    },
  }
}
