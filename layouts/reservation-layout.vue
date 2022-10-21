<template>
  <div>
    <page-loader v-if="$fetchState.pending"/>
    <div class="reservation__main__wrapper" v-if="!$fetchState.pending">
      <reservation-header/>
      <Nuxt keep-alive :keep-alive-props="{ max: 10 }"/>
    </div>
  </div>

</template>

<script>
import ReservationHeader from "~/components/reservation/widgets/reservation-header";
import TokenService from "~/services/token.service";
import {ROLES} from "~/utils/constants";
import {currentLoggedInUserRole} from "@/utils/helpers";
import {fetchBusinessById} from "@/mixins";
import PageLoader from "@/components/reservation/common/loaders/page-loader";
export default {
  name: "reservation-layout",
  components: {PageLoader, ReservationHeader},
  mixins:[fetchBusinessById],
  mounted() {
    if(TokenService.getLocalAccessToken(this.$cookies)){
      this.$store.commit('HANDLE_LOGGED_IN_USER_ROLE',currentLoggedInUserRole(this.$cookies))
    }
  }
}
</script>

