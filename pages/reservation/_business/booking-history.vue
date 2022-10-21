<template>
  <client-only>
    <section class="mx-10 mb-5" >
      <page-loader v-if="$fetchState.pending || isFetchLoading"/>
      <div class="grid grid-cols-dashboard__column gap-5" v-if="!$fetchState.pending && !isFetchLoading">
        <div class="bg-peach__bg w-full py-8 px-10 rounded-3xl">
          <div class="flex items-center justify-between">
            <h3 class="text-dark__blue__cl text-2xl mb-5">Booking Statistics</h3>
          </div>
          <div class="grid grid-cols-3 gap-5 mb-7">
            <dashboard-card :count="stats.find(el=>el._id === 'Confirmed') && stats.find(el=>el._id === 'Confirmed').count" name="Confirmed" :icon="['fa','check']"/>
            <!--          <dashboard-card :count="0" name="Reserved" :icon="['fa','award']"/>-->
            <dashboard-card v-if="loggedInUserRole === roles.BUSINESS" :count="stats.find(el=>el._id === 'Canceled') ?  (stats.find(el=>el._id === 'Canceled').count) : 0" name="Cancelled" :icon="['fa','xmark']"/>
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
            <tr v-for="(data,index) in bookings" :key="data._id" v-if="(bookings && bookings.length > 0)">
              <td
                class="p-5 font-normal text-dark__blue__cl text-center border-r border-color-[#ECECEC] whitespace-nowrap"
              >
                {{ index+1 }}
              </td>
              <td
                class="p-5 font-normal text-dark__blue__cl text-center border-r border-color-[#ECECEC] whitespace-nowrap"
              >
                {{ `${data.startDate && data.startDate}` }}
              </td>
              <td
                class="p-5 font-normal text-dark__blue__cl text-center border-r border-color-[#ECECEC] whitespace-nowrap"
              >
                {{ `${!!(data.startTime && data.endTime) && data.startTime} - ${data.endTime }` }}
              </td>
              <td
                class="p-5 font-normal text-dark__blue__cl text-center border-r border-color-[#ECECEC] whitespace-nowrap"
              >
                {{ data.service ? data.service.name : ' - ' }}
              </td>
              <td
                class="p-5 font-normal text-center border-r border-color-[#ECECEC] whitespace-nowrap"
                :style="`color: #${Math.floor(Math.random()*16777215).toString(16)}`"
              >
                {{ data.professional ? data.professional.name : ' - ' }}
              </td>
              <td
                class="p-5 font-normal text-center border-r border-color-[#ECECEC] whitespace-nowrap"
                :style="`color: #${Math.floor(Math.random()*16777215).toString(16)}`"
              >
                {{ data.customer ? data.customer.userName : ' - ' }}
              </td>
              <td
                class="p-5 font-normal text-dark__blue__cl text-center border-r border-color-[#ECECEC] whitespace-nowrap flex items-center justify-between gap-2.5"
              >
                {{ data.status}}
                <div  v-if="loggedInUserRole === roles.BUSINESS">
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
                      <dropdown-item custom-class="border-b pb-1.5" is-button :click-handler="()=>$router.push(`/reservation/${businessIdUrl}${routes.MANAGE_CLIENTS}?q=${data.customer ? data.customer._id : ''}`)" :loader="false">View Client Details</dropdown-item>
                      <dropdown-item :custom-class="data.status !== 'Canceled' ? 'border-b pb-1.5' : ''" is-button :click-handler="()=>$router.push(`/reservation/${businessIdUrl}${routes.MANAGE_PROFESSIONALS}?q=${data.professional ? data.professional._id : ''}`)" :loader="false">View Professional</dropdown-item>
                      <dropdown-item v-if="data.status !== 'Canceled' && data.service" custom-class="border-b pb-1.5" is-button :click-handler="()=>handleRescheduleBooking(true,data._id,data.service)" :loader="false">Reschedule Booking</dropdown-item>
                      <dropdown-item v-if="data.status !== 'Canceled'" is-button :click-handler="()=>handleCancelBookingMixinSubmit(data._id)" :loader="isHandleCancelBookingLoading">Cancel Booking</dropdown-item>

                    </dropdown-content>
                  </dropdown>
                </div>
              </td>
            </tr>
            </tbody>
          </base-table>
        </div>
        <div v-if="loggedInUserRole === roles.CUSTOMER">
          <customer-sidebar :appointment="selectedFilter" :booking-data="bookings"/>
        </div>
        <div v-if="loggedInUserRole === roles.BUSINESS">
          <business-sidebar :appointment="selectedFilter" :booking-data="bookings"/>
        </div>
      </div>
      <!--    Confirm Booking Modal-->
      <reschedule-booking-modal
        :booking-id="bookingId"
        :show-reschedule-booking-modal="showRescheduleBooking"

        :current-service="selectedService"
        :professionals-by-service="businessProfessionalsByService"
        :existing-events="businessBookingsByService"
        :business-schedule="businessSchedule && businessSchedule.schedule"

        @handle-confirm-reschedule="handleConfirmReschedule"
        @handle-reschedule-booking="handleRescheduleBooking"
      />
    </section>
  </client-only>

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
import {ROLES} from "~/utils/constants";
import {businessIdFromURL, currentLoggedInUserRole} from "~/utils/helpers";
import {batchingBookingsAndStats} from "~/mixins/apis/dashboard-fetch/batching-bookings-and-stats";
import PageLoader from "~/components/reservation/common/loaders/page-loader";
import {ROUTES} from "~/utils/constants/routes";
import {handleCancelBooking} from "~/mixins/apis/dashboard/handle-cancel-booking";
import RescheduleBookingModal from "@/components/reservation/features/booking-history/reschedule-booking-modal";
import {fetchBusinessSchedule} from "@/mixins/apis/settings-fetch/fetch-business-schedule";
import {fetchProfessionalsByService} from "@/mixins/apis/settings-fetch/fetch-professionals-by-service";
import {fetchBookingsByService} from "@/mixins/apis/settings-fetch/fetch-bookings-by-service";

export default {
  name: "booking-history",
  components: {
    RescheduleBookingModal,
    PageLoader,
    BusinessSidebar,
    CustomerSidebar,
    BookingCard, BaseButton, BaseTable, DashboardCard, DropdownItem, Dropdown, DropdownContent},
  auth:false,
  middleware:"reservation-protected",
  layout(self){
    // console.log(self.store.state,"self")
    const loggedInUserRole = currentLoggedInUserRole(self.$cookies)
    if(loggedInUserRole === ROLES.CUSTOMER){
      return 'reservation-layout'//this.$nuxt.setLayout('reservation-layout')
    }else{
      return 'business-layout' // this.$nuxt.setLayout('business-layout')
    }
  },
  mixins:[batchingBookingsAndStats,handleCancelBooking,fetchBusinessSchedule,fetchProfessionalsByService,fetchBookingsByService],
  data(){
    return{
      selectedFilter:'Upcoming',
      tableHeaders:['S No.','Date','Time','Services','Provider','Name','Status'],
      loggedInUserRole : currentLoggedInUserRole(this.$cookies),
      roles : ROLES,
      bookings:[],
      businessIdUrl : businessIdFromURL(this),
      routes:ROUTES,
      showRescheduleBooking:false,
      bookingId:'',
      selectedService:{},
      isFetchLoading:false,
    }
  },
  computed:{
    isPrev(){
      return this.selectedFilter !== 'Upcoming'
    }
  },
  async mounted() {
    await this.fetchBusinessSchedule()
  },
  watch:{
    isPrev(){
      this.$fetch()
    }
  },
  methods:{
    onBookingFilterChange(filter){
      this.selectedFilter = filter
    },
    async handleRescheduleBooking(isActive,bookingId,service){
      console.log(isActive,bookingId,service,"isActive,userId,service")
      if(service?._id){
        this.isFetchLoading = true
        await this.fetchBusinessProfessionalsByService(service?._id)
        await this.fetchBusinessBookingsByService(service?._id)
        this.isFetchLoading = false
      }
      this.showRescheduleBooking = isActive
      this.bookingId = bookingId
      this.selectedService = service
    },
    handleConfirmReschedule(){
      this.$fetch()
    }
  }
}
</script>

<style scoped>

</style>
