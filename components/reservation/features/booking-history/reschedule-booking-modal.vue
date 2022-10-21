<template>
  <edit-modal base-modal-custom-class="overflow-hidden min-h-screen h-full overflow-y-auto" :title="`Reschedule Booking`" @close="$emit('handle-reschedule-booking',false,'',{})" :show-modal="showRescheduleBookingModal">
    <div class="flex flex-col gap-5 items-center w-full text-center" slot="form">

      <scheduling-calendar
        is-editable
        ref="schedulingCalendar"
        :business-schedule="businessSchedule"
        :professionals-by-service="professionalsByService"
        :existing-events="existingEvents"
        @handle-event-push="handleNewEventPush"
        :current-service="currentService"
      />
      <base-button custom-classes="w-full max-w-[400px] mt-5" :click-handler="confirmReschedule" v-if="!isHandleRescheduleBookingLoading">
        Change Schedule
      </base-button>
      <primary-loader :is-loading="isHandleRescheduleBookingLoading"/>
      <error-message :is-error="!!handleRescheduleBookingError" :message="handleRescheduleBookingError"/>
      <error-message :is-error="!!validationError" :message="validationError"/>

    </div>
  </edit-modal>
</template>

<script>
import AuthModal from "~/components/reservation/common/modal/auth-modal";
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BaseInput from "~/components/reservation/common/form/base-input";
import PrimaryLoader from "~/components/reservation/common/loaders/primary-loader";
import ErrorMessage from "~/components/reservation/common/messages/error-message";
import EditModal from "~/components/reservation/common/modal/edit-modal";
import SchedulingCalendar from "@/components/reservation/common/calendar/scheduling-calendar";
import {handleRescheduleBooking} from "@/mixins/apis/dashboard/handle-reschedule-booking";
import {toIsoString, userTimeZone} from "@/utils/helpers";

export default {
  name: "reschedule-booking-modal",
  components: {SchedulingCalendar, EditModal, ErrorMessage, PrimaryLoader, BaseInput, BaseButton, AuthModal},
  mixins:[handleRescheduleBooking],
  props:{
    showRescheduleBookingModal:{
      type:Boolean
    },
    bookingId:{
      type:String
    },
    currentService:{
      type:Object,
    },
    professionalsByService:{
      type:Array,
    },
    existingEvents: {
      type:Array
    },
    businessSchedule:{
      type:Array
    }
  },
  data() {
    return{
      newEvent:{},
      validationError:""
    }
  },
  methods:{
    handleNewEventPush(event){
      this.newEvent = event
    },
    confirmReschedule(){
      this.validationError = ""
      if(!this.newEvent?.serviceId){
        this.validationError = 'Please Select A Schedule'
        return
      }
      let submitData ={
        timezone:userTimeZone(),
        startDateTime: toIsoString(new Date(this.newEvent?.start))
      }

      this.handleRescheduleBookingMixinSubmit(submitData,this.bookingId)
    }
  }
}
</script>

<style>
.vuecal__event.lunch {
  background: repeating-linear-gradient(45deg, transparent, transparent 10px, #f2f2f2 10px, #f2f2f2 20px);/* IE 10+ */
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.vuecal__event.lunch .vuecal__event-time {display: none;align-items: center;}
.vuecal {height: 90vh;}
.vuecal .day-split-header {font-size: 11px;}

.newService{
  background: #FAF7F7;
  color: #00ADEE;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}

.panel-heading {
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;

  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.panel-body {
  padding: 15px;
}
</style>
