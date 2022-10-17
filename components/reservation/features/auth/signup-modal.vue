<template>
  <auth-modal title="Sign Up" @close="$emit('handle-signup',false)" :show-modal="showSignupModal">
    <img slot="image" src="@/assets/img/auth-woman-2.png" class="max-w-[220px] mt-16 object-contain" alt="Auth Woman"/>
    <form class="flex flex-col gap-5" slot="form" @submit.prevent="handleSignupSubmit">
      <input
        class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
        v-model="signupFieldsData.userName"
        placeholder="Username"
        type="text"
        required
      />
      <input
        class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
        v-model="signupFieldsData.email"
        placeholder="Email"
        type="email"
        required
      />
      <input
        class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
        v-model="signupFieldsData.password"
        placeholder="Password"
        type="password"
        required
      />
      <input
        class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
        v-model="signupFieldsData.phoneNumber"
        placeholder="Phone Number"
        type="number"
        required
      />
      <base-button is-submit-type custom-classes="w-full max-w-[400px] mt-5" v-if="!isHandleSignupLoading">
        Sign Up
      </base-button>
      <primary-loader :is-loading="isHandleSignupLoading"/>
      <error-message :is-error="!!handleSignupError" :message="handleSignupError"/>
    </form>
  </auth-modal>
</template>

<script>
import AuthModal from "~/components/reservation/common/modal/auth-modal";
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BaseInput from "~/components/reservation/common/form/base-input";
import {handleSignup} from "~/mixins/apis/auth/handle-signup";
import PrimaryLoader from "~/components/reservation/common/loaders/primary-loader";
import ErrorMessage from "~/components/reservation/common/messages/error-message";

export default {
  name: "signup-modal",
  components: {ErrorMessage, PrimaryLoader, BaseInput, BaseButton, AuthModal},
  mixins:[handleSignup],
  props:{
    showSignupModal:{
      type:Boolean
    },
    isBooking:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return{
      signupFieldsData:{
        userName:"",
        phoneNumber:"",
        email:"",
        password:"",
      }
    }
  },
  methods: {
    handleSignupSubmit(){
      this.handleSignupMixinSubmit({...this.signupFieldsData})
    },
  }
}
</script>

<style scoped>

</style>
