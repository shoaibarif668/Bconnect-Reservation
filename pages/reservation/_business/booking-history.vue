<template>
  <section class="grid grid-cols-dashboard__column gap-5 mx-10 mb-5" >
    <div class="bg-peach__bg w-full py-8 px-10 rounded-3xl">
      <div class="flex items-center justify-between">
        <h3 class="text-dark__blue__cl text-2xl mb-5">Booking Statistics</h3>

      </div>
      <div class="grid grid-cols-3 gap-5 mb-7">
        <dashboard-card :count="1" name="Confirmed" :icon="['fa','check']"/>
        <dashboard-card :count="0" name="Reserved" :icon="['fa','award']"/>
        <dashboard-card :count="0" name="Cancelled" :icon="['fa','xmark']"/>
      </div>
      <div class="flex items-center justify-between mb-5">
        <h3 class="text-dark__blue__cl text-2xl">Booking History - {{ selectedFilter }}</h3>
        <dropdown>
          <template #toggler>
            <button
              class="relative flex items-center focus:outline-none text-primary__color font-normal text-lg"
            >
              <span></span>
              <font-awesome-icon class="text-blue__cl font-bold text-2xl" :icon="['fa','ellipsis']" />
            </button>
          </template>
          <dropdown-content>
            <dropdown-item custom-class="border-b pb-1.5" is-button :click-handler="()=>onBookingFilterChange('Upcoming')" :loader="false">Upcoming Bookings</dropdown-item>
            <dropdown-item is-button :click-handler="()=>onBookingFilterChange('Previous')" :loader="false">Previous Bookings</dropdown-item>
          </dropdown-content>
        </dropdown>
      </div>

      <base-table :headers="tableHeaders">
        <tbody class="bg-white divide-y divide-gray-300 p-5" slot="table__body">
          <tr v-for="(data,index) in history" :key="index">
            <td
              class="p-5 font-normal text-dark__blue__cl text-center border-r border-color-[#ECECEC] whitespace-nowrap"
            >
              {{ index+1 }}
            </td>
            <td
              class="p-5 font-normal text-dark__blue__cl text-center border-r border-color-[#ECECEC] whitespace-nowrap"
            >
              {{ data.date }}
            </td>
            <td
              class="p-5 font-normal text-dark__blue__cl text-center border-r border-color-[#ECECEC] whitespace-nowrap"
            >
              {{ data.time }}
            </td>
            <td
              class="p-5 font-normal text-dark__blue__cl text-center border-r border-color-[#ECECEC] whitespace-nowrap"
            >
              {{ data.services.join(', ') }}
            </td>
            <td
              class="p-5 font-normal text-center border-r border-color-[#ECECEC] whitespace-nowrap"
              :style="`color: #${Math.floor(Math.random()*16777215).toString(16)}`"
            >
              {{ data.providers.join(', ') }}
            </td>
            <td
              class="p-5 font-normal text-dark__blue__cl text-center border-r border-color-[#ECECEC] whitespace-nowrap"
            >
              {{ data.isConfirmed ? 'Confirmed' : "Pending" }}
            </td>
          </tr>
        </tbody>
      </base-table>
    </div>
<!--    <customer-sidebar/>-->
        <business-sidebar/>
  </section>
</template>

<script>
import DropdownContent from "~/components/reservation/common/dropdown/dropdown-content";
import Dropdown from "~/components/reservation/common/dropdown/dropdown";
import DropdownItem from "~/components/reservation/common/dropdown/dropdown-item";
import DashboardCard from "~/components/reservation/common/cards/dashboard-card";
import BaseTable from "~/components/reservation/common/tables/base-table";
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BookingCard from "~/components/reservation/common/cards/booking-card";
import CustomerSidebar from "~/components/reservation/features/booking-history/customer-sidebar";
import BusinessSidebar from "~/components/reservation/features/booking-history/business-sidebar";

export default {
  name: "booking-history",
  components: {
    BusinessSidebar,
    CustomerSidebar,
    BookingCard, BaseButton, BaseTable, DashboardCard, DropdownItem, Dropdown, DropdownContent},
  auth:false,
  // layout:"reservation-layout",
  layout(){
    const loggedInUserRole = 'Customer2' //From Cookies

    if(loggedInUserRole === "Customer"){
      return 'reservation-layout'//this.$nuxt.setLayout('reservation-layout')
    }else{
      return 'business-layout' // this.$nuxt.setLayout('business-layout')
    }
  },
  data(){
    return{
      selectedFilter:'Upcoming',
      tableHeaders:['S No.','Date','Time','Services','Provider','Status'],
      history:[
        {
          date:'09-05-2022',
          time:'12:00-13:00',
          services:['Nail Art','Hair Cut'],
          providers:['Aly'],
          isConfirmed:false
        },
        {
          date:'11-05-2022',
          time:'12:00-13:00',
          services:['Nail Art','Hair Cut'],
          providers:['John','Jason'],
          isConfirmed:false
        }
      ],
    }
  },
  // created() {
  //   const loggedInUserRole = 'Customer' //From Cookies
  //   console.log(this,"$nuxt")
  //   if(loggedInUserRole === "Customer"){
  //     this.$nuxt.setLayout('reservation-layout')
  //   }else{
  //     this.$nuxt.setLayout('business-layout')
  //   }
  // },
  methods:{
    onBookingFilterChange(filter){
      this.selectedFilter = filter
    }
  }
}
</script>

<style scoped>

</style>
