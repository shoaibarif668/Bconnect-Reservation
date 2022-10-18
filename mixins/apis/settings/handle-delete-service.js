
export const handleDeleteService =  {
  data(){
    return{
      isHandleDeleteServiceLoading : false,
    }
  },
  methods:{
    async handleDeleteServiceMixinSubmit(serviceId) {
      this.isHandleDeleteServiceLoading = true
      this.$api.delete(`/service?serviceId=${serviceId}`)
        .then(()=>{
          this.$fetch()
        })
        .finally(()=>{
          this.isHandleDeleteServiceLoading = false
        })
    },
  }
}
