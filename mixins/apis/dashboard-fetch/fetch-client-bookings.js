import {businessIdFromURL} from "~/utils/helpers";
import TokenService from "~/services/token.service";

export const fetchClientBookings =  {
  methods:{
    async fetchClientBookingsService(isPrev){
      try{
        let response = await this.$api.get(`booking/business/filter/customer?customerId=${TokenService.getUser(this.$cookies)?._id}&page=1&limit=99&isPrevious=${isPrev}`)
        this.bookings = response?.data?.data
      }
      catch (e) {
        console.log(e, "1")
      }
    }
  }
  // multiple components can return the same `fetchKey` and Nuxt will track them both separately
}
