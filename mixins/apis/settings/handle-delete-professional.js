import {businessIdFromURL, viewError} from "~/utils/helpers";

export const handleDeleteProfessional =  {
  data(){
    return{
      isHandleDeleteProfessionalLoading : false,
    }
  },
  methods:{
    async handleDeleteProfessionalMixinSubmit(professionalId) {
      this.isHandleDeleteProfessionalLoading = true

      this.$api.delete(`/professional?professionalId=${professionalId}`)
        .then(()=>{
          this.$fetch()
        })
        .catch((e)=>{
          console.log(e,'1')
        })
        .finally(()=>{
          this.isHandleDeleteProfessionalLoading = false
        })
    },
  }
}
