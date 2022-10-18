import {businessIdFromURL} from "~/utils/helpers";

export const fetchBusinessBookings =  {
  data(){
    return{
      businessBookings:[],
    }
  },
  methods:{
    async fetchBookingStatsService(isPrev){
      try{
        let response = await this.$api.get(`/booking/business/filter?businessId=${businessIdFromURL(this)}&page=1&limit=99&isPrevious=${isPrev}`)
        this.businessBookings = response?.data?.data
      }
      catch (e) {
        console.log(e, "1")
      }
    }
  }
  // multiple components can return the same `fetchKey` and Nuxt will track them both separately
}
