<template>
  <div class="bg-peach__bg my-5 mx-10 p-5 border rounded-3xl flex items-center justify-between">
    <div class="flex gap-5 items-center">
      <menu-hamburger/>
      <h1 class="text-2xl text-dark__blue__cl font-bold capitalize">{{businessData && businessData.business_name}}</h1>
      <secondary-loader :is-loading="$fetch.pending"/>
      <div class="flex items-center gap-2.5" v-if="!$fetch.pending">
        <div class="bg-white flex items-center px-3">
          <font-awesome-icon class="text-dark__blue__cl" :icon="['fa','user']"/>
          <select
            class="rounded focus-visible:outline-none text-dark__blue__cl text-sm font-normal px-2.5 py-2 w-full bg-transparent"
            v-model="professional"
            @change="onProfessionalChange"
          >
            <option value="" disabled selected>Select Professional</option>
            <option
              v-for="option in businessProfessionals"
              :value="option._id"
              :key="option._id"
              :selected="option._id === professional"
            >{{ option && option.name }}</option>
          </select>
        </div>
        <div class="bg-white flex gap-2 items-center px-3">
          <font-awesome-icon class="text-dark__blue__cl" :icon="['fa','user']"/>
          <select
            class="rounded focus-visible:outline-none text-dark__blue__cl text-sm font-normal px-2.5 py-2 w-full bg-transparent"
            v-model="client"
            @change="onClientChange"
          >
            <option value="" disabled selected>Select Client</option>
            <option
              v-for="option in businessClients"
              :value="option._id"
              :key="option._id"
              :selected="option._id === client"
            >{{ option && option.userName }}</option>
          </select>
        </div>
      </div>
    </div>
    <div v-if="!isCustomerLoggedIn"></div>
    <top-bar-user-info :is-logged-in="isCustomerLoggedIn" :user-name="userData.userName || ''" :profile-picture="isCustomerLoggedIn.profilePicture || ''"/>
  </div>
</template>

<script>
import MenuHamburger from "~/components/reservation/widgets/menu-hamburger";
import WebsiteLogo from "~/components/reservation/common/website-logo";
import BaseSelect from "~/components/reservation/common/form/base-select";
import customerHeaderInfo from "~/mixins/customer-header-info";
import TopBarUserInfo from "~/components/reservation/widgets/top-bar-user-info";
import {businessIdFromURL} from "~/utils/helpers";
import {ROUTES} from "~/utils/constants/routes";
import {
  batchingBusinessProfessionalAndClients
} from "~/mixins/apis/settings-fetch/batching-business-professional-and-clients";
import PrimaryLoader from "~/components/reservation/common/loaders/primary-loader";
import SecondaryLoader from "~/components/reservation/common/loaders/secondary-loader";
import TokenService from "@/services/token.service";

export default {
  name: "business-header",
  components: {SecondaryLoader, PrimaryLoader, TopBarUserInfo, BaseSelect, WebsiteLogo, MenuHamburger},
  mixins:[customerHeaderInfo,batchingBusinessProfessionalAndClients],
  data(){
    return{
      professional:"",
      client:"",
      businessData:TokenService.getBusiness(this.$cookies)
    }
  },
  methods:{
    onProfessionalChange(){
      this.$router.push(`/reservation/${businessIdFromURL(this)}${ROUTES.MANAGE_PROFESSIONALS}?q=${this.professional}`)
    },
    onClientChange(){
      this.$router.push(`/reservation/${businessIdFromURL(this)}${ROUTES.MANAGE_CLIENTS}?q=${this.client}`)

    }
  }
}
</script>
