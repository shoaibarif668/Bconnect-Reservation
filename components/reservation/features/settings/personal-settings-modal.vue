<template>
  <edit-modal :title="`Edit Your Settings`" @close="$emit('handle-personal-settings-modal',false)" :show-modal="showSettingsModal">
    <form class="flex flex-col gap-5 items-center w-full text-center" slot="form" @submit.prevent="handleEditPersonalSettingsSubmit">
      <input
        class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
        v-model="fieldsData.userName"
        placeholder="User Name"
        type="text"
        required
      />
      <input
        class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
        v-model="fieldsData.email"
        placeholder="Email"
        type="email"
        required
      />
      <input
        class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
        v-model="fieldsData.phoneNumber"
        placeholder="Phone Number"
        type="number"
        required
      />

<!--        <div v-if="mediaFromLocalStorage" class="">-->
<!--          <img :src="`${mediaBaseUrl}${mediaFromLocalStorage}`" alt="User">-->
<!--        </div>-->
      <base-button is-submit-type custom-classes="w-full max-w-[400px] mt-5" v-if="!isHandleEditSettingsLoading">
        Edit Settings
      </base-button>
      <primary-loader :is-loading="isHandleEditSettingsLoading"/>
      <error-message :is-error="!!handleEditSettingsError" :message="handleEditSettingsError"/>
    </form>
  </edit-modal>
</template>

<script>
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BaseInput from "~/components/reservation/common/form/base-input";
import PrimaryLoader from "~/components/reservation/common/loaders/primary-loader";
import ErrorMessage from "~/components/reservation/common/messages/error-message";
import EditModal from "~/components/reservation/common/modal/edit-modal";
import TokenService from "@/services/token.service";
import {handleEditSettings} from "@/mixins/apis/settings/handle-edit-settings";

export default {
  name: "personal-settings-modal",
  components: {EditModal, ErrorMessage, PrimaryLoader, BaseInput, BaseButton},
  mixins:[handleEditSettings],
  props:{
    showSettingsModal:{
      type:Boolean
    }
  },
  data() {
    return{
      fieldsData:{
        userName: TokenService.getUser(this.$cookies)?.userName,
        email: TokenService.getUser(this.$cookies)?.email,
        phoneNumber:  TokenService.getUser(this.$cookies)?.phoneNumber
      },
    }
  },
  methods: {
    handleEditPersonalSettingsSubmit(){
      this.handleEditSettingsMixinSubmit(this.fieldsData,TokenService.getUser(this.$cookies)?._id)
    },
  }
}
</script>

<style scoped>

</style>
