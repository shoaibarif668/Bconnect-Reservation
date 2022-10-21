<template>
  <div class="bg-peach__bg my-5 mx-10 p-5 border rounded-3xl flex items-center justify-between">
    <div class="flex gap-5 items-center">
      <menu-hamburger/>
      <website-logo/>
    </div>
    <h1 class="text-4xl text-dark__blue__cl font-bold capitalize">{{businessData && businessData.business_name}}</h1>
    <div v-if="!isCustomerLoggedIn"></div>
    <top-bar-user-info :is-logged-in="isCustomerLoggedIn" :user-name="userData && userData.userName" :profile-picture="isCustomerLoggedIn && isCustomerLoggedIn.profilePicture"/>
  </div>
</template>

<script>
import MenuHamburger from "~/components/reservation/widgets/menu-hamburger";
import WebsiteLogo from "~/components/reservation/common/website-logo";
import TopBarUserInfo from "~/components/reservation/widgets/top-bar-user-info";
import customerHeaderInfo from "~/mixins/customer-header-info";
import TokenService from "@/services/token.service";

export default {
  name: "reservation-header",
  components: {TopBarUserInfo, WebsiteLogo, MenuHamburger},
  mixins:[customerHeaderInfo],
  data(){
    return{
      businessData:TokenService.getBusiness(this.$cookies)
    }
  }
}
</script>
