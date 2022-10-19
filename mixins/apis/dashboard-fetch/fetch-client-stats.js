import {businessIdFromURL} from "~/utils/helpers";
import TokenService from "~/services/token.service";

export const fetchClientStats =  {
  data(){
    return{
      stats:[],
    }
  },
  methods:{
    async fetchClientStatsService(){
      try{
        let response = await this.$api.get(`/booking/stats/customer?customerId=${TokenService.getUser(this.$cookies)?._id}`)
        this.stats = response.data?.data
      }
      catch (e) {
        console.log(e, "1")
      }
    }
  }
  // multiple components can return the same `fetchKey` and Nuxt will track them both separately
}
