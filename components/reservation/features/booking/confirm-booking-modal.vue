<template>
  <auth-modal title="Confirm Your Booking" @close="$emit('handle-confirm-booking',false)" :show-modal="showConfirmBookingModal">
    <img slot="image" src="@/assets/img/confirm-booking-image.png" class="max-w-[220px] mt-16 object-contain" alt="Confirm Booking"/>
    <form class="flex flex-col gap-5" slot="form" @submit.prevent="handleConfirmBooking">
      <base-button is-submit-type custom-classes="w-full max-w-[400px] mt-5" v-if="!isHandleCreateBookingLoading">
        Confirm Booking
      </base-button>
      <primary-loader :is-loading="isHandleCreateBookingLoading"/>
      <error-message :is-error="!!handleCreateBookingError" :message="handleCreateBookingError"/>
    </form>
  </auth-modal>
</template>

<script>
import AuthModal from "~/components/reservation/common/modal/auth-modal";
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BaseInput from "~/components/reservation/common/form/base-input";
import {handleCreateBooking} from "~/mixins/apis/booking/handle-create-booking";
import TokenService from "~/services/token.service";
import ErrorMessage from "~/components/reservation/common/messages/error-message";
import PrimaryLoader from "~/components/reservation/common/loaders/primary-loader";
import {toIsoString, userTimeZone} from "@/utils/helpers";

export default {
  name: "confirm-booking-modal",
  components: {PrimaryLoader, ErrorMessage, BaseInput, BaseButton, AuthModal},
  mixins:[handleCreateBooking],
  props:{
    showConfirmBookingModal:{
      type:Boolean
    },
    finalBookingData:{
      type:Array,
      required:true,
    },
    userId:{
      type:String,
      default:'',
      required:true
    }
  },
  data() {
    return{
    }
  },
  computed:{
    loggedInUserId(){
      return this.userId || TokenService.getUser(this.$cookies)?._id
    }
  },
  methods: {
    handleConfirmBooking(){
      let submitData = this.finalBookingData.map(el=>{
        return{
          professionalId: el?.professionalId,
          service: el?.serviceId,
          timezone:userTimeZone(),
          startDateTime: toIsoString(new Date(el?.start))
          // ${new Date(el?.start).format('YYYY-MM-DD')}T${new Date(el?.start).format('HH:mm')}:00.000Z
        }
      })
      this.handleCreateBookingMixinSubmit(submitData,this.loggedInUserId)
    },
  }
}
</script>
