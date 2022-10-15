<template>
  <auth-modal title="Sign In" @close="$emit('handle-login',false)" :show-modal="showLoginModal">
    <img slot="image" src="@/assets/img/auth-woman.png" class="max-w-[220px] mt-16 object-contain" alt="Auth Woman"/>
    <form class="flex flex-col gap-5" slot="form" @submit.prevent="handleLoginSubmit">
      <base-input
        v-model="fieldsData.email"
        placeholder="Email"
        type="email"
        custom-classes="max-w-[400px]"
        required
      />
      <base-input
        v-model="fieldsData.password"
        placeholder="Password"
        type="password"
        custom-classes="max-w-[400px]"
        required
      />
      <base-button is-submit-type custom-classes="w-full max-w-[400px] mt-5">
        Sign In
      </base-button>
    </form>
  </auth-modal>
</template>

<script>
import AuthModal from "~/components/reservation/common/modal/auth-modal";
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BaseInput from "~/components/reservation/common/form/base-input";
export default {
  name: "login-modal",
  components: {BaseInput, BaseButton, AuthModal},
  props:{
    showLoginModal:{
      type:Boolean
    }
  },
  data() {
    return{
      fieldsData:{
        email:"",
        password:""
      }
    }
  },
  methods: {
    handleLoginSubmit(){
      // this.isUserLoggedIn = true
      this.$store.commit('HANDLE_IS_USER_LOGGED_IN',true)
      this.$emit('handle-login',false)
    },
  }
}
</script>

<style scoped>

</style>
