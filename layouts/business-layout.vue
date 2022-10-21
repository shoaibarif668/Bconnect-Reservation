<template>
  <div class="reservation__main__wrapper">
    <business-header/>
    <Nuxt keep-alive :keep-alive-props="{ max: 10 }"/>
  </div>
</template>

<script>
import BusinessHeader from "~/components/reservation/widgets/business-header";
import TokenService from "~/services/token.service";
import {ROLES} from "~/utils/constants";
import {currentLoggedInUserRole} from "@/utils/helpers";
export default {
  name: "business-layout",
  components: {BusinessHeader},
  mounted() {
    if(TokenService.getLocalAccessToken(this.$cookies)){
      this.$store.commit('HANDLE_LOGGED_IN_USER_ROLE',currentLoggedInUserRole(this.$cookies))
    }
  }
}
</script>

