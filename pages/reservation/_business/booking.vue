<template>
  <div>
<!--    validate-on-back-->

    <client-only>
      <page-loader v-if="$fetchState.pending || isFetchBusinessServiceLoading || isFetchBookingsByServiceLoading"/>
      <div class="px-48 relative mt-10">
        <h1 class="text-blue__cl text-4xl font-bold absolute top-0 w-[24%]">Appointment Booking {{((isUserLoggedIn === roles.CUSTOMER) && activeTabIndex === 2) ? 'Completed Successfully' : ''}}</h1>
        <form-wizard ref="wizard"
                     :start-index.sync="activeTabIndex"
                     shape="square"
                     color="#20a0ff"
                     error-color="#ff4949"
                     title=""
                     subtitle=""
                     :hide-buttons="activeTabIndex === 2"
        >
          <tab-content :beforeChange="beforeServiceTabChange" title="Services" icon="">
            <h6 class="pt-5 text-2xl font-normal text-dark__blue__cl">Select Services</h6>
            <div class="pt-5 pb-12 grid grid-cols-3 gap-10"  v-if="(Array.isArray(businessServices.data) ? businessServices.data.length : 0) > 0">
              <div v-for="(service,index) in businessServices.data" :key="index">
                <service-card :service="service" @handle-services-selection="handleServicesSelection"/>
              </div>
            </div>
            <error-message :is-error="isServicesEmpty" message="Please Select One Or More Services"/>
          </tab-content>
          <tab-content title="Book Professional"  icon="" :beforeChange="beforeBookProfessionalTabChange">
            <div v-if="businessProfessionalsByService && businessProfessionalsByService.length <= 0" class="my-5">
              <div class="p-14 bg-peach__bg shadow border-0 rounded-[20px]">
                <h1 class="text-center text-dark__blue__cl font-bold text-4xl">No Professionals Available For {{currentServiceForProfessional.name }}.</h1>
              </div>
            </div>
            <div v-if="businessProfessionalsByService && businessProfessionalsByService.length > 0">
              <h6 class="pt-5 pb-5 text-2xl font-normal text-dark__blue__cl">Booking for <span>{{ currentServiceForProfessional.name || '' }}</span></h6>
              <scheduling-calendar
                ref="schedulingCalendar"
                :is-editable="!isLockBookingEditing"
                :business-schedule="businessSchedule && businessSchedule.schedule"
                :professionals-by-service="businessProfessionalsByService"
                :existing-events="businessBookingsByService"
                @handle-event-push="handleNewEventPush"
                :current-service="currentServiceForProfessional"
              />
            </div>

            <error-message :is-error="isBookingEmpty" :message="`Please Book A Slot For ${currentServiceForProfessional.name || ''} To Continue`"/>
          </tab-content>
          <tab-content title="Confirm Booking" icon="">
            <div class="pb-12 pt-10  flex gap-16" v-if="(isUserLoggedIn !== roles.CUSTOMER) && !isBookingCompleted">
              <div class="flex items-center flex-col gap-16 w-full">
                <h2 class="text-dark__blue__cl font-bold text-4xl ">Finish booking now by creating an account</h2>
                <div class="flex items-center flex-col gap-5 w-full">
                  <base-button :click-handler="()=>handleLogin(true)">Sign In</base-button>
                  <base-button :click-handler="()=>handleSignup(true)">Sign Up</base-button>
                </div>
              </div>
              <img src="@/assets/img/auth-image.png" class="max-w-[50%]" alt="Auth"/>
            </div>
            <div class="pb-12 pt-10  flex gap-16" v-if="(isUserLoggedIn === roles.CUSTOMER) && !isBookingCompleted">
              <div class="flex flex-col gap-16 w-full">
                <h2 class="text-dark__blue__cl font-bold text-4xl ">Confirm Your Booking</h2>
                <div class="flex items-center flex-col gap-5 w-full">
                  <base-button :click-handler="()=>handleConfirmBooking(true)">Confirm Booking</base-button>
                </div>
              </div>
              <img src="@/assets/img/auth-image.png" class="max-w-[50%]" alt="Auth"/>
            </div>
            <div class="pb-12 pt-10  flex gap-16" v-if="(isUserLoggedIn === roles.CUSTOMER) && isBookingCompleted">
              <div class="flex flex-col pt-10 border-t-2 border-dark__blue__cl">
                <h2 class="text-dark__blue__cl font-bold text-4xl pb-10"><span class="text-blue__cl">{{ addEvent && addEvent.length > 1 ? `${addEvent[0] && addEvent[0].professionalName} and others` : addEvent[0] && addEvent[0].professionalName}}</span> will be waiting for you on
                  <span class="text-blue__cl">{{ Date.parse(new Date(addEvent[0] && addEvent[0].start).toDateString()) ? new Date(addEvent[0] && addEvent[0].start).toDateString() : '' }}</span> </h2>
                <h3 class="text-dark__blue__cl text-xl pb-10">You will receive a confirmation SMS shortly.</h3>
                <base-button custom-classes="mb-5" :click-handler="()=>$router.push(`/reservation/${$route.params.business}${routes.BOOKING_HISTORY}`)">View Booking History</base-button>
                <base-button :click-handler="bookNewAppointment">Book New Appointment</base-button>
              </div>
              <img src="@/assets/img/booking-completed.png" class="max-w-[50%] object-contain" alt="Auth"/>
            </div>
          </tab-content>
        </form-wizard>

        <!--    Login Modal-->
        <login-modal
          :show-login-modal="showLoginModal"
          @handle-login="handleLogin"
          is-booking
          @handle-confirm-booking="handleConfirmBooking"
        />
        <!--    Signup Modal-->
        <signup-modal
          :show-signup-modal="showSignupModal"
          @handle-signup="handleSignup"
          is-booking
          @handle-confirm-booking="handleConfirmBooking"
        />
        <!--    Confirm Booking Modal-->
        <confirm-booking-modal
          :final-booking-data="addEvent"
          :user-id="loggedInUserId"
          :show-confirm-booking-modal="showConfirmBookingModal"
          @handle-confirm-booking="handleConfirmBooking"
          @handle-confirm-completed="handleBookingCompleted"
        />
      </div>
    </client-only>

  </div>
</template>

<script>

import ServiceCard from "@/components/reservation/common/cards/service-card";
import BaseButton from "@/components/reservation/common/buttons/base-button";
import BaseModal from "@/components/reservation/common/modal/base-modal";
import BaseInput from "@/components/reservation/common/form/base-input";
import AuthModal from "@/components/reservation/common/modal/auth-modal";
import LoginModal from "~/components/reservation/features/auth/login-modal";
import SignupModal from "~/components/reservation/features/auth/signup-modal";
import SchedulingCalendar from "~/components/reservation/common/calendar/scheduling-calendar";
import PageLoader from "~/components/reservation/common/loaders/page-loader";
import {fetchBusinessServices} from "~/mixins";
import ErrorMessage from "~/components/reservation/common/messages/error-message";
import ConfirmBookingModal from "~/components/reservation/features/booking/confirm-booking-modal";
import {ROLES} from "~/utils/constants";
import {fetchBusinessSchedule} from "~/mixins/apis/settings-fetch/fetch-business-schedule";
import {fetchProfessionalsByService} from "~/mixins/apis/settings-fetch/fetch-professionals-by-service";
import {fetchBookingsByService} from "~/mixins/apis/settings-fetch/fetch-bookings-by-service";
import {businessIdFromURL} from "~/utils/helpers";
import {ROUTES} from "~/utils/constants/routes";

export default {
  components: {
    ConfirmBookingModal,
    ErrorMessage,
    PageLoader,
    SchedulingCalendar, SignupModal, LoginModal, AuthModal, BaseInput, BaseModal, BaseButton, ServiceCard},
  mixins:[fetchBusinessServices,fetchBusinessSchedule,fetchProfessionalsByService,fetchBookingsByService],
  auth:false,
  name: "booking",
  layout:"reservation-layout", //auto picks up from layout directory
  data() {
    return{
      roles:ROLES,
      activeTabIndex: 0,
      selectedServices:[],
      isServicesEmpty:false,
      currentServiceForProfessional:{},
      addEvent:[],
      isBookingEmpty:false,
      isLockBookingEditing:false,
      showLoginModal:false,
      showSignupModal:false,
      showConfirmBookingModal:false,
      isBookingCompleted:false,
      loggedInUserId:'',
      routes:ROUTES
    }
  },
  computed:{
    isUserLoggedIn(){
      return (this.$store.state.loggedInUserRole)
    },
  },
  activated() {
    if (this.$fetchState.timestamp <=  Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch() {
    await this.fetchBusinessServiceService()
    await this.fetchBusinessSchedule()
  },
  methods: {
    async beforeServiceTabChange(){
      this.isServicesEmpty = !!this.selectedServices?.length <= 0
      if(!this.isServicesEmpty){
        this.isLockBookingEditing = false
        this.addEvent = [] //Empty Added Bookings Before Going To Calendar

        this.currentServiceForProfessional = this.selectedServices[0]
        // await Promise.all([this.fetchBusinessProfessionalsByService(this.currentServiceForProfessional?._id),this.fetchBusinessBookingsByService(this.currentServiceForProfessional?._id)])
        await this.fetchBusinessProfessionalsByService(this.currentServiceForProfessional?._id)
        await this.fetchBusinessBookingsByService(this.currentServiceForProfessional?._id)

        if(this.businessProfessionalsByService?.length > 0){
          this.$refs.schedulingCalendar.unavailableSlots()
        }
      }
      return !this.isServicesEmpty
    },
    handleServicesSelection(service,action){
      if(action === 'add'){
        this.selectedServices.push(service)
      }else if(action === 'remove'){
        if(this.selectedServices?.length > 0){
          this.selectedServices = this.selectedServices.filter((el)=>el?._id !== service?._id)
        }
      }
      this.isServicesEmpty = !!this.selectedServices?.length <= 0
    },
    async beforeBookProfessionalTabChange(){
      const currentIndex = this.selectedServices?.findIndex(el => el?._id ===this.currentServiceForProfessional?._id)
      //If Booking's length is not the same as the current index that means booking is not added in this session
      if(this.addEvent?.length !== currentIndex+1){
        this.isBookingEmpty = true
        return false
      }
      if (process?.client) {
        window.scrollTo(0, 100)
      }
      //if selected services length is more than current service
      if(this.selectedServices?.length > currentIndex+1){
        this.currentServiceForProfessional = this.selectedServices[currentIndex+1]

        // await Promise.all([this.fetchBusinessProfessionalsByService(this.currentServiceForProfessional?._id),this.fetchBusinessBookingsByService(this.currentServiceForProfessional?._id)])
        await this.fetchBusinessProfessionalsByService(this.currentServiceForProfessional?._id)
        await this.fetchBusinessBookingsByService(this.currentServiceForProfessional?._id)
        return false
      }else {
        this.isLockBookingEditing = true
        return true
      }
    },
    handleNewEventPush(booking,action){
      this.isBookingEmpty = false
      if(action === 'remove'){
        this.addEvent.pop()
      }else if(action === 'add'){
        this.addEvent.push(booking)
      }
    },
    handleLogin(isActive){
      this.showLoginModal = isActive
    },
    handleSignup(isActive){
      this.showSignupModal = isActive
    },
    handleConfirmBooking(isActive,userId){
      this.showConfirmBookingModal = isActive
      this.loggedInUserId = userId
    },
    handleBookingCompleted(){
      this.isBookingCompleted = true
    },
    bookNewAppointment(){
      this.addEvent = []
      this.isLockBookingEditing = false
      this.isBookingCompleted = false
      this.$refs.wizard.reset()
      this.$fetch()
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

.wizard-header{
  display: none;
}
.wizard-progress-with-circle,.wizard-nav{
  margin-left: auto;
  width: 60%;
}
.wizard-tab-content{
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.booking__confirmed .wizard-btn{
  display: none;
}

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
