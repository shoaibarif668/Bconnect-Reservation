<template>
  <div>
    <h5 class="text-dark__blue__cl text-center pb-5 text-lg ">{{ appointmentType }} Appointments</h5>
    <div class="flex flex-col items-center gap-5">
      <div v-for="card in [1,2,3,4]" class="w-full">
        <booking-card :price="120" professional="Aly" timing="12:00-13:00" :services="['Nail Art','Styling']"/>
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
  }
}
</script>

<style scoped>

</style>
