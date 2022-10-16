<template>
  <auth-modal title="Confirm Your Booking" @close="$emit('handle-confirm-booking',false)" :show-modal="showConfirmBookingModal">
    <img slot="image" src="@/assets/img/confirm-booking-image.png" class="max-w-[220px] mt-16 object-contain" alt="Confirm Booking"/>
    <form class="flex flex-col gap-5" slot="form" @submit.prevent="handleConfirmBooking">
      <base-button is-submit-type custom-classes="w-full max-w-[400px] mt-5">
        Confirm Booking
      </base-button>
    </form>
  </auth-modal>
</template>

<script>
import AuthModal from "~/components/reservation/common/modal/auth-modal";
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BaseInput from "~/components/reservation/common/form/base-input";

export default {
  name: "confirm-booking-modal",
  components: {BaseInput, BaseButton, AuthModal},
  props:{
    showConfirmBookingModal:{
      type:Boolean
    },
    finalBookingData:{
      type:Object,
      default:{},
      required:true,
    }
  },
  data() {
    return{

    }
  },
  methods: {
    handleConfirmBooking(){
      this.$emit('handle-confirm-booking',false)
      this.$emit('handle-confirm-completed')
    },
  }
}
</script>
