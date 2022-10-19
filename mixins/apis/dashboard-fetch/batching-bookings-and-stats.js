import {fetchBookingStats} from "~/mixins/apis/dashboard-fetch/fetch-booking-stats";
import {fetchBusinessBookings} from "~/mixins/apis/dashboard-fetch/fetch-business-bookings";
import {fetchClientBookings} from "~/mixins/apis/dashboard-fetch/fetch-client-bookings";
import {ROLES} from "~/utils/constants";
import {currentLoggedInUserRole} from "~/utils/helpers";
import {fetchClientStats} from "~/mixins/apis/dashboard-fetch/fetch-client-stats";

export const batchingBookingsAndStats =  {
  mixins:[fetchBookingStats,fetchBusinessBookings,fetchClientBookings,fetchClientStats],
  activated() {
    if (this.$fetchState.timestamp <=  Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch() {
    await this.handleBookings()
  },
  methods:{
    async handleBookings(){
      if(currentLoggedInUserRole(this.$cookies) === ROLES.CUSTOMER){
        await this.fetchClientBookingsService(this.isPrev || false)
        await this.fetchClientStatsService()
      }else if(currentLoggedInUserRole(this.$cookies) === ROLES.BUSINESS){
        await this.fetchBusinessBookingsService(this.isPrev || false)
        await this.fetchBookingStatsService()
      }

    }
  }
}
