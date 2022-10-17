<template>
  <section class="grid grid-cols-dashboard__column gap-5 mx-10 mb-5" >
    <div class="bg-peach__bg w-full py-8 px-10 rounded-3xl">
      <div class="flex items-center justify-between">
        <h3 class="text-dark__blue__cl text-2xl mb-5">Overview</h3>

      </div>
      <div class="grid grid-cols-3 gap-5 mb-7">
        <dashboard-card :count="31" name="Total Clients" :icon="['fa','users']"/>
        <dashboard-card :count="4" name="Total Appointments" :icon="['fa','calendar']"/>
        <dashboard-card count="**" name="Total Revenue" :icon="['fa','dollar-sign']"/>
      </div>
      <div class="flex items-center justify-between mb-5">
        <h3 class="text-dark__blue__cl text-2xl">Appointments</h3>
      </div>

      <scheduling-calendar :custom-day-split-labels="customDaySplitLabels" :existing-events="events" @handle-event-push="(event)=>{}"/>

    </div>
    <business-sidebar/>
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

export default {
  name: "business",
  components: {
    SchedulingCalendar,
    BusinessSidebar,
    BookingCard, BaseButton, DashboardCard, DropdownItem, Dropdown, DropdownContent},
  auth:false,
  layout:"business-layout",
  middleware:"reservation-protected",
  data(){
    return{
      customDaySplitLabels: [
        { label: 'John', color: Math.floor(Math.random()*16777215).toString(16), class: 'split1'},
        { label: 'Tom', color: Math.floor(Math.random()*16777215).toString(16), class: 'split2' },
        { label: 'Kate', color: Math.floor(Math.random()*16777215).toString(16), class: 'split3' },
        { label: 'Jess', color: Math.floor(Math.random()*16777215).toString(16), class: 'split4' }
      ],
      events: [
        {
          start: `2022-10-14 12:00`,
          end: `2022-10-14 13:00`,
          title: 'Booked',
          class: 'lunch',
          background: true,
          deletable: false,
          resizable: false,
          split: 1
        },
        {
          start: `2022-10-14 14:00`,
          end: `2022-10-14 15:00`,
          title: 'Booked',
          class: 'lunch',
          background: true,
          deletable: false,
          resizable: false,
          split: 2
        }
      ],
    }
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
