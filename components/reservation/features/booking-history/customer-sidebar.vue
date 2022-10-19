<template>
  <div class="bg-peach__bg w-full px-6 pt-10 pb-2.5 rounded-3xl max-h-[750px] h-full overflow-y-auto">
    <div class="mb-5 pb-5 border-b border-dark__blue__cl">
      <base-button :click-handler="()=>$router.push(`/reservation/${businessId()}${routes.BOOKING}`)">Book New Appointment</base-button>
    </div>
    <booking-list :appointment-type="appointment || ''" :bookings="bookingData"/>
  </div>
</template>

<script>
import BaseButton from "~/components/reservation/common/buttons/base-button";
import {ROUTES} from "~/utils/constants/routes";
import {businessIdFromURL} from "~/utils/helpers";
import BookingList from "~/components/reservation/features/booking-history/booking-list";

export default {
  name: "customer-sidebar",
  components: {BookingList, BaseButton},
  props:{
    appointment:{
      type:String,
      default:'Previous'
    },
    bookingData:Array,
  },
  data() {
    return {
      routes: ROUTES,
      businessId : ()=>businessIdFromURL(this)
    }
  }
}
</script>

<style scoped>

</style>
