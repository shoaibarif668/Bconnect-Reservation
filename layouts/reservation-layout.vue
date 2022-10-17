<template>
  <div class="reservation__main__wrapper">
    <reservation-header/>
    <Nuxt keep-alive :keep-alive-props="{ max: 10 }"/>
  </div>
</template>

<script>
import ReservationHeader from "~/components/reservation/widgets/reservation-header";
import TokenService from "~/services/token.service";
import {ROLES} from "~/utils/constants";
export default {
  name: "reservation-layout",
  components: {ReservationHeader},
  mounted() {
    if(TokenService.getLocalAccessToken(this.$cookies)){
      this.$store.commit('HANDLE_LOGGED_IN_USER_ROLE',(TokenService.getUser(this.$cookies)?.isBusiness ? ROLES.BUSINESS : ROLES.CUSTOMER) || null)
    }
  }
}
</script>

