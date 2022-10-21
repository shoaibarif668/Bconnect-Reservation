<template>
  <section class="mx-10 mb-5" >
    <page-loader v-if="$fetchState.pending"/>
    <div class="grid grid-cols-dashboard__column gap-5 ">
      <div class="bg-peach__bg w-full py-8 px-10 rounded-3xl">
        <div class="flex items-center justify-between">
          <h3 class="text-dark__blue__cl text-2xl mb-5">Overview</h3>

        </div>
<!--        <div class="grid grid-cols-3 gap-5 mb-7">-->
<!--          <dashboard-card :count="31" name="Total Clients" :icon="['fa','users']"/>-->
<!--          <dashboard-card :count="4" name="Total Appointments" :icon="['fa','calendar']"/>-->
<!--          <dashboard-card count="**" name="Total Revenue" :icon="['fa','dollar-sign']"/>-->
<!--        </div>-->
<!--        <div class="flex items-center justify-between mb-5">-->
<!--          <h3 class="text-dark__blue__cl text-2xl">Appointments</h3>-->
<!--        </div>-->

        <scheduling-calendar
          ref="schedulingCalendar"
          :existing-events="businessAllBookingsByService"
          :business-schedule="businessSchedule && businessSchedule.schedule"
          :professionals-by-service="businessProfessionals"
        />
      </div>
      <business-sidebar :appointment="'Upcoming'" :booking-data="bookings"/>
    </div>
  </section>
</template>

<script>
import DropdownContent from "~/components/reservation/common/dropdown/dropdown-content";
import Dropdown from "~/components/reservation/common/dropdown/dropdown";
import DropdownItem from "~/components/reservation/common/dropdown/dropdown-item";
import DashboardCard from "~/components/reservation/common/cards/dashboard-card";
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BookingCard from "~/components/reservation/common/cards/booking-card";
import BusinessSidebar from "~/components/reservation/features/booking-history/business-sidebar";
import SchedulingCalendar from "~/components/reservation/common/calendar/scheduling-calendar";
import {fetchBusinessSchedule} from "~/mixins/apis/settings-fetch/fetch-business-schedule";
import {fetchBusinessProfessionals} from "~/mixins/apis/settings-fetch/fetch-business-professionals";
import {fetchBusinessAllBookings} from "~/mixins/apis/dashboard-fetch/fetch-business-all-bookings";
import {fetchBusinessBookings} from "~/mixins/apis/dashboard-fetch/fetch-business-bookings";
import PageLoader from "~/components/reservation/common/loaders/page-loader";

export default {
  name: "business",
  components: {
    PageLoader,
    SchedulingCalendar,
    BusinessSidebar,
    BookingCard, BaseButton, DashboardCard, DropdownItem, Dropdown, DropdownContent},
  auth:false,
  layout:"business-layout",
  middleware:"reservation-protected",
  mixins:[fetchBusinessSchedule,fetchBusinessProfessionals,fetchBusinessAllBookings,fetchBusinessBookings],
  data(){
    return{
      bookings:[],
    }
  },
  activated() {
    if (this.$fetchState.timestamp <=  Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch() {
    await this.fetchBusinessSchedule()
    await this.fetchBusinessProfessionals()
    await this.fetchBusinessAllBookingsService()
    if(process.client){
      this.$refs.schedulingCalendar.unavailableSlots()
    }
    await this.fetchBusinessBookingsService(false)
  },
  mounted() {
    this.$refs.schedulingCalendar.unavailableSlots()
  },
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
