<template>
  <div>
    <page-loader v-if="$fetchState.pending"/>
    <div class="reservation__main__wrapper" v-if="!$fetchState.pending">
      <business-header/>
      <Nuxt keep-alive :keep-alive-props="{ max: 10 }"/>
    </div>
  </div>

</template>

<script>
import BusinessHeader from "~/components/reservation/widgets/business-header";
import TokenService from "~/services/token.service";
import {ROLES} from "~/utils/constants";
import {currentLoggedInUserRole} from "@/utils/helpers";
import {fetchBusinessById} from "@/mixins";
import PageLoader from "@/components/reservation/common/loaders/page-loader";
export default {
  name: "business-layout",
  components: {PageLoader, BusinessHeader},
  mixins:[fetchBusinessById],
  mounted() {
    if(TokenService.getLocalAccessToken(this.$cookies)){
      this.$store.commit('HANDLE_LOGGED_IN_USER_ROLE',currentLoggedInUserRole(this.$cookies))
    }
  }
}
</script>

