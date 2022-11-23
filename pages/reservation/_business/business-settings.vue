<template>
  <section class="mx-10 mb-5" >
    <page-loader v-if="$fetch.pending"/>
    <div class="grid grid-cols-dashboard__column gap-5" v-if="!$fetch.pending">
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
              <bullet-point-button :click-handler="()=>handleEditWorkingSchedule(true)"/>
              <h5 class="text-dark__blue__cl text-xl font-normal">Business Working Schedule</h5>
            </div>
            <button @click="()=>handleEditWorkingSchedule(true)" class="font-normal text-blue__cl text-xl hover:opacity-90">
              Manage </button>
          </div>
          <div class="flex items-center justify-between border-b border-gray__cl mb-7 pb-7 px-8">
            <div class="flex items-center gap-10">
              <bullet-point-button :click-handler="()=>handleManagePromoCodes(true)"/>
              <h5 class="text-dark__blue__cl text-xl font-normal">Promo Code & Discounts</h5>
            </div>
            <div class="flex items-center gap-2.5">
              <button @click="()=>handleManagePromoCodes(true)" class="font-normal text-blue__cl text-xl hover:opacity-90">View</button>
              <span class="text-blue__cl text-xl">|</span>
              <button @click="()=>handleAddPromoCodesModal(true)" class="font-normal text-blue__cl text-xl hover:opacity-90">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--   Edit Working Schedule Modal-->
    <edit-working-schedule-modal
      :show-working-schedule-modal="showEditWorkingScheduleModal"
      @handle-edit-working-schedule="handleEditWorkingSchedule"
      :business-working-schedule="businessSchedule.schedule || []"
      :schedule-id="businessSchedule._id || ''"
      :key="businessSchedule._id"
      @confirm-business-schedule="confirmBusinessSchedule"
    />

    <!--   Manage Promo Codes Modal-->
    <manage-promo-codes
      :show-manage-promo-codes-modal="showManagePromoCodesModal"
      @handle-manage-promo-codes="handleManagePromoCodes"
      :promo-codes="promoCodes || []"
      @confirm-promo-code-deleted="confirmBusinessSchedule"
    />

    <!--   Add Promo Codes Modal-->
    <add-promo-code
      :show-add-promo-codes-modal="showAddPromoCodesModal"
      @handle-add-promo-codes="handleAddPromoCodesModal"
      @confirm-promo-code-added="confirmBusinessSchedule"
    />
  </section>
</template>

<script>
import DropdownContent from "~/components/reservation/common/dropdown/dropdown-content";
import Dropdown from "~/components/reservation/common/dropdown/dropdown";
import DropdownItem from "~/components/reservation/common/dropdown/dropdown-item";
import DashboardCard from "~/components/reservation/common/cards/dashboard-card";
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BookingCard from "~/components/reservation/common/cards/booking-card";
import SchedulingCalendar from "~/components/reservation/common/calendar/scheduling-calendar";
import EditWorkingScheduleModal
  from "~/components/reservation/features/settings/business-settings/edit-working-schedule-modal";
import PageLoader from "~/components/reservation/common/loaders/page-loader";
import ManagePromoCodes from "~/components/reservation/features/settings/business-settings/manage-promo-codes";
import AddPromoCode from "~/components/reservation/features/settings/business-settings/add-promo-code";
import {
  batchingBusinessScheduleAndPromoCodes
} from "~/mixins/apis/settings-fetch/batching-business-schedule-and-promo-codes";
import BulletPointButton from "@/components/reservation/common/buttons/bullet-point-button";

export default {
  name: "business-settings",
  components: {
    BulletPointButton,
    AddPromoCode,
    ManagePromoCodes,
    PageLoader,
    EditWorkingScheduleModal,
    SchedulingCalendar,
    BookingCard, BaseButton, DashboardCard, DropdownItem, Dropdown, DropdownContent},
  auth:false,
  layout:"business-layout",
  middleware:"reservation-protected",
  mixins:[batchingBusinessScheduleAndPromoCodes],
  data(){
    return{
      showEditWorkingScheduleModal : false,
      showManagePromoCodesModal:false,
      showAddPromoCodesModal:false,
    }
  },
  methods:{
    handleEditWorkingSchedule(isActive){
      this.showEditWorkingScheduleModal = isActive
    },
    handleManagePromoCodes(isActive){
      this.showManagePromoCodesModal = isActive
    },
    handleAddPromoCodesModal(isActive){
      this.showAddPromoCodesModal = isActive
    },
    confirmBusinessSchedule(){
      this.$fetch()
    }
  }
}
</script>


