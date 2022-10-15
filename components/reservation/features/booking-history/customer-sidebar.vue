<template>
  <div class="bg-peach__bg w-full px-6 pt-10 pb-2.5 rounded-3xl max-h-[750px] h-full overflow-y-auto">
    <div class="mb-5 pb-5 border-b border-dark__blue__cl">
      <base-button :click-handler="()=>$router.push(`/reservation/asd${routes.BOOKING}`)">Book New Appointment</base-button>
    </div>
    <h5 class="text-dark__blue__cl text-center pb-5 text-lg ">Previous Appointments</h5>
    <div class="flex flex-col items-center gap-5">
      <booking-card :price="120" professional="Aly" timing="12:00-13:00" :services="['Nail Art','Styling']"/>
      <booking-card :price="120" professional="Aly" timing="12:00-13:00" :services="['Nail Art','Styling']"/>
      <booking-card :price="120" professional="Aly" timing="12:00-13:00" :services="['Nail Art','Styling']"/>
      <booking-card :price="120" professional="Aly" timing="12:00-13:00" :services="['Nail Art','Styling']"/>
      <booking-card :price="120" professional="Aly" timing="12:00-13:00" :services="['Nail Art','Styling']"/>
    </div>
  </div>
</template>

<script>
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BookingCard from "~/components/reservation/common/cards/booking-card";
import {ROUTES} from "~/utils/constants/routes";

export default {
  name: "customer-sidebar",
  components: {BookingCard, BaseButton},
  data() {
    return {
      routes: ROUTES,
    }
  }
}
</script>

<style scoped>

</style>
