<template>
  <auth-modal title="Sign Up" @close="$emit('handle-signup',false)" :show-modal="showSignupModal">
    <img slot="image" src="@/assets/img/auth-woman-2.png" class="max-w-[220px] mt-16 object-contain" alt="Auth Woman"/>
    <form class="flex flex-col gap-5" slot="form" @submit.prevent="handleSignupSubmit">
      <base-input
        v-model="signupFieldsData.userName"
        placeholder="Username"
        type="text"
        custom-classes="max-w-[400px]"
        required
      />
      <base-input
        v-model="signupFieldsData.email"
        placeholder="Email"
        type="email"
        custom-classes="max-w-[400px]"
        required
      />
      <base-input
        v-model="signupFieldsData.password"
        placeholder="Password"
        type="password"
        custom-classes="max-w-[400px]"
        required
      />
      <base-input
        v-model="signupFieldsData.phoneNumber"
        placeholder="Phone Number"
        type="number"
        custom-classes="max-w-[400px]"
        required
      />
      <base-button is-submit-type custom-classes="w-full max-w-[400px] mt-5">
        Sign Up
      </base-button>
    </form>
  </auth-modal>
</template>

<script>
import AuthModal from "~/components/reservation/common/modal/auth-modal";
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BaseInput from "~/components/reservation/common/form/base-input";
export default {
  name: "signup-modal",
  components: {BaseInput, BaseButton, AuthModal},
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
      // this.isUserLoggedIn = true
      this.$store.commit('HANDLE_IS_USER_LOGGED_IN',true)
      this.$emit('handle-signup',false)
      if(this.isBooking){
        this.$emit('handle-confirm-booking',true)
      }
    },
  }
}
</script>

<style scoped>

</style>
