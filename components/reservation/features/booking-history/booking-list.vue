<template>
  <div>
    <h5 class="text-dark__blue__cl text-center pb-5 text-lg ">{{ appointmentType }} Appointments</h5>
    <div class="flex flex-col items-center gap-5">
      <div v-for="booking in bookings" class="w-full">
        <booking-card
          :image="booking.service && booking.service.media"
          :professional="booking.professional && booking.professional.name"
          :timing="`${!!(booking.startDateTime && booking.endDateTime) && booking.startDateTime.split('T')[1].split('.')[0]} - ${booking.endDateTime.split('T')[1].split('.')[0] }`"
          :service="booking.service && booking.service.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BookingCard from "~/components/reservation/common/cards/booking-card";

export default {
  name: "booking-list",
  components: {BookingCard},
  props:{
    appointmentType:String,
    bookings:Array
  },
}
</script>

<style scoped>

</style>
