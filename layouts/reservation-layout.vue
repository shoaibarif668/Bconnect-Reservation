<template>
  <div class="reservation__main__wrapper">
    <reservation-header/>
    <Nuxt/>
  </div>
</template>

<script>
import ReservationHeader from "~/components/reservation/widgets/reservation-header";
export default {
  name: "reservation-layout",
  components: {ReservationHeader}
}
</script>

