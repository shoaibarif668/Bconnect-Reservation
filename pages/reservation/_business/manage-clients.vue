<template>
  <section class="grid grid-cols-dashboard__column gap-5 mx-10 mb-5" >
    <div class="bg-peach__bg w-full py-8 px-10 rounded-3xl">
      <div class="flex items-center justify-between w-full">
        <h3 class="text-dark__blue__cl text-2xl font-normal">Manage Clients</h3>
        <div>
          <base-button :click-handler="()=>{}" custom-classes="flex items-center gap-2 justify-center float-right">
            <font-awesome-icon :icon="['fa','user-plus']"/>
            <span>Add Client</span>
          </base-button>
        </div>
      </div>
      <div class="bg-white my-6 py-8 rounded-[24px]">
        <div class="flex items-center justify-between w-full border-b border-gray__cl mb-7 pb-7 px-8">
          <h4 class="text-dark__blue__cl text-xl font-normal">Robert's Settings</h4>
          <button @click="()=>{}" class="font-bold text-blue__cl hover:opacity-90">
            <font-awesome-icon :icon="['fa','trash']"/>
          </button>
        </div>

        <div class="flex items-center justify-between border-b border-gray__cl mb-7 pb-7 px-8">
          <div class="flex items-center gap-10">
           <span class="bg-blue__bg p-2 rounded-full h-[32px] w-[32px] flex items-center justify-center">
              <font-awesome-icon class="text-white text-lg" :icon="['fa','angle-right']"/>
            </span>
            <h5 class="text-dark__blue__cl text-xl font-normal">Client's Details</h5>
          </div>
          <button @click="()=>{}" class="font-normal text-blue__cl text-xl hover:opacity-90">Edit</button>
        </div>
        <div class="flex items-center justify-between border-b border-gray__cl mb-7 pb-7 px-8">
          <div class="flex items-center gap-10">
           <span class="bg-blue__bg p-2 rounded-full h-[32px] w-[32px] flex items-center justify-center">
              <font-awesome-icon class="text-white text-lg" :icon="['fa','angle-right']"/>
            </span>
            <h5 class="text-dark__blue__cl text-xl font-normal">Reset Password</h5>
          </div>
          <button @click="()=>{}" class="font-normal text-blue__cl text-xl hover:opacity-90">Reset</button>
        </div>
        <div class="flex items-center justify-between border-b border-gray__cl mb-7 pb-7 px-8">
          <div class="flex items-center gap-10">
            <span class="bg-blue__bg p-2 rounded-full h-[32px] w-[32px] flex items-center justify-center">
              <font-awesome-icon class="text-white text-lg" :icon="['fa','angle-right']"/>
            </span>
            <h5 class="text-dark__blue__cl text-xl font-normal">Issue Promo Code</h5>
          </div>
          <button @click="()=>{}" class="font-normal text-blue__cl text-xl hover:opacity-90">Issue</button>
        </div>
      </div>
    </div>
    <business-manage-sidebar title="Clients" @handle-card-selection="handleCardSelection" :card-details="cardDetails"/>
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
  name: "manage-clients",
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


