import {businessIdFromURL} from "~/utils/helpers";

export const fetchProfessionalsByService =  {
  data(){
    return{
      businessProfessionalsByService:[],
      isFetchBusinessServiceLoading:false
    }
  },
  methods:{
    async fetchBusinessProfessionalsByService(serviceId){
      try{
        this.isFetchBusinessServiceLoading = true
        let response = await this.$api.get(`/professional/service?businessId=${businessIdFromURL(this)}&serviceId=${serviceId}&page=1&limit=99`)
        this.businessProfessionalsByService = response?.data?.data

      }
      catch (e) {
        console.log(e, "1")
      }
      finally {
        this.isFetchBusinessServiceLoading = false
      }
    }
  }
  // multiple components can return the same `fetchKey` and Nuxt will track them both separately
}
