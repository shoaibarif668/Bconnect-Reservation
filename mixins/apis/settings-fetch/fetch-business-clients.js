import {businessIdFromURL} from "~/utils/helpers";

export const fetchBusinessClients =  {
  data(){
    return{
      businessClients:[],
    }
  },
  methods:{
    async fetchBusinessClientsService(){
      try{
        let response = await this.$api.get(`/customer/business?businessId=${businessIdFromURL(this)}&page=1&limit=99`)
        this.businessClients = response?.data?.data
      }
      catch (e) {
        console.log(e, "1")
      }
    }
  }
  // multiple components can return the same `fetchKey` and Nuxt will track them both separately
}
