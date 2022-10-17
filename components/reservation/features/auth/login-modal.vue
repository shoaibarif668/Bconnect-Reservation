<template>
  <auth-modal :title="`Sign In As ${role}`" @close="$emit('handle-login',false)" :show-modal="showLoginModal">
    <img slot="image" src="@/assets/img/auth-woman.png" class="max-w-[220px] mt-16 object-contain" alt="Auth Woman"/>
    <form class="flex flex-col gap-5" slot="form" @submit.prevent="handleLoginSubmit">
      <div class="mb-2.5 max-w-[400px] w-full flex items-center gap-2.5" v-if="!isBooking">
        <button
          type="button"
          @click="()=>onRoleChange(roles.CUSTOMER || '')"
          class="text-lg text-dark__blue__cl border-b border-dark__blue__cl p-2.5 w-full"
          :class="role === roles.CUSTOMER ? 'bg-blue__cl !text-white !border-0' : ''"
        >
          Customer
        </button>
        <button
          type="button"
          @click="()=>onRoleChange(roles.BUSINESS || '')"
          class="text-lg text-dark__blue__cl border-b border-dark__blue__cl p-2.5 w-full"
          :class="role === roles.BUSINESS ? 'bg-blue__cl !text-white !border-0' : ''"
        >
          Business
        </button>
      </div>
      <input
        class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
        v-model="fieldsData.email"
        placeholder="Email"
        type="email"
        required
      />
      <input
        class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
        v-model="fieldsData.password"
        placeholder="Password"
        type="password"
        required
      />
      <base-button is-submit-type custom-classes="w-full max-w-[400px] mt-5" v-if="!isHandleLoginLoading">
        Sign In
      </base-button>
      <primary-loader :is-loading="isHandleLoginLoading"/>
      <error-message :is-error="!!handleLoginError" :message="handleLoginError"/>
    </form>
  </auth-modal>
</template>

<script>
import AuthModal from "~/components/reservation/common/modal/auth-modal";
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BaseInput from "~/components/reservation/common/form/base-input";
import {ROLES} from "~/utils/constants";
import {handleLogin} from "~/mixins/apis/auth/handle-login";
import ErrorMessage from "~/components/reservation/common/messages/error-message";
import PrimaryLoader from "~/components/reservation/common/loaders/primary-loader";

export default {
  name: "login-modal",
  components: {PrimaryLoader, ErrorMessage, BaseInput, BaseButton, AuthModal},
  mixins:[handleLogin],
  props:{
    showLoginModal:{
      type:Boolean
    },
    isBooking:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return{
      fieldsData:{
        email:"",
        password:"",
      },
      role:ROLES.CUSTOMER,
      roles:ROLES,
    }
  },
  methods: {
    handleLoginSubmit(){
      this.handleLoginMixinSubmit({...this.fieldsData,role:this.role})
    },
    onRoleChange(role){
      this.role = role
    }
  }
}
</script>

<style scoped>

</style>
