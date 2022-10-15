<template>
  <section class="grid grid-cols-dashboard__column gap-5 mx-10 mb-5" >
    <div class="bg-peach__bg w-full py-8 px-10 rounded-3xl">
      <div class="flex items-center justify-between w-full">
        <h3 class="text-dark__blue__cl text-2xl font-normal">Manage Business Settings</h3>
      </div>
      <div class="bg-white my-6 py-8 rounded-[24px]">
        <div class="flex items-center justify-between w-full border-b border-gray__cl mb-7 pb-7 px-8">
          <h4 class="text-dark__blue__cl text-xl font-normal">Business Settings</h4>
        </div>

        <div class="flex items-center justify-between border-b border-gray__cl mb-7 pb-7 px-8">
          <div class="flex items-center gap-10">
           <span class="bg-blue__bg p-2 rounded-full h-[32px] w-[32px] flex items-center justify-center">
              <font-awesome-icon class="text-white text-lg" :icon="['fa','angle-right']"/>
            </span>
            <h5 class="text-dark__blue__cl text-xl font-normal">Business Details</h5>
          </div>
          <button @click="()=>{}" class="font-normal text-blue__cl text-xl hover:opacity-90">View</button>
        </div>
        <div class="flex items-center justify-between border-b border-gray__cl mb-7 pb-7 px-8">
          <div class="flex items-center gap-10">
           <span class="bg-blue__bg p-2 rounded-full h-[32px] w-[32px] flex items-center justify-center">
              <font-awesome-icon class="text-white text-lg" :icon="['fa','angle-right']"/>
            </span>
            <h5 class="text-dark__blue__cl text-xl font-normal">Business Working Schedule</h5>
          </div>
          <button @click="()=>{}" class="font-normal text-blue__cl text-xl hover:opacity-90">View</button>
        </div>
        <div class="flex items-center justify-between border-b border-gray__cl mb-7 pb-7 px-8">
          <div class="flex items-center gap-10">
            <span class="bg-blue__bg p-2 rounded-full h-[32px] w-[32px] flex items-center justify-center">
              <font-awesome-icon class="text-white text-lg" :icon="['fa','angle-right']"/>
            </span>
            <h5 class="text-dark__blue__cl text-xl font-normal">Promo Code & Discounts</h5>
          </div>
          <button @click="()=>{}" class="font-normal text-blue__cl text-xl hover:opacity-90">View</button>
        </div>
      </div>
    </div>
<!--    <business-manage-sidebar title="Professionals" @handle-card-selection="handleCardSelection" :card-details="cardDetails"/>-->
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
import BusinessManageSidebar from "~/components/reservation/features/booking-history/business-manage-sidebar";

export default {
  name: "business-settings",
  components: {
    BusinessManageSidebar,
    SchedulingCalendar,
    BusinessSidebar,
    BookingCard, BaseButton, DashboardCard, DropdownItem, Dropdown, DropdownContent},
  auth:false,
  layout:"business-layout",
  data(){
    return{
      selectedProfessional:"",
      cardDetails:[
        {
          image:"https://placebeard.it/640x360",
          name:"Robert",
          email:"test@gmail.com",
          totalBookings: 4,
          cardType:"Client",
        }
      ]
    }
  },
  methods:{
    handleCardSelection(name){
      console.log(name,"name")
    }
  }
}
</script>


