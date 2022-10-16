<template>
  <div class="reservation__main__wrapper">
    <reservation-header/>
    <Nuxt keep-alive :keep-alive-props="{ max: 10 }"/>
  </div>
</template>

<script>
import ReservationHeader from "~/components/reservation/widgets/reservation-header";
export default {
  name: "reservation-layout",
  components: {ReservationHeader},
}
</script>

