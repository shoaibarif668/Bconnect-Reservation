import {fetchBookingStats} from "~/mixins/apis/dashboard-fetch/fetch-booking-stats";
import {fetchBusinessBookings} from "~/mixins/apis/dashboard-fetch/fetch-business-bookings";
import {fetchClientBookings} from "~/mixins/apis/dashboard-fetch/fetch-client-bookings";
import {ROLES} from "~/utils/constants";
import TokenService from "~/services/token.service";
import {currentLoggedInUserRole} from "~/utils/helpers";

export const batchingBookingsAndStats =  {
  mixins:[fetchBookingStats,fetchBusinessBookings,fetchClientBookings],
  activated() {
    if (this.$fetchState.timestamp <=  Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch() {
    await this.fetchBookingStatsService()
    await this.handleBookings()

  },
  methods:{
    async handleBookings(){

      if(currentLoggedInUserRole(this.$cookies) === ROLES.CUSTOMER){
        await this.fetchBusinessBookingsService(this.isPrev || false)
      }else if(currentLoggedInUserRole(this.$cookies) === ROLES.BUSINESS){
        await this.fetchClientBookingsService(this.isPrev || false)
      }

    }
  }
}
