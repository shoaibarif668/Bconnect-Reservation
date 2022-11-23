<template>
  <section class="mx-10 mb-5" >
    <page-loader v-if="$fetchState.pending"/>
    <div class="grid grid-cols-dashboard__column gap-5" v-if="!$fetchState.pending">
      <div class="bg-peach__bg w-full py-8 px-10 rounded-3xl">
        <div class="flex items-center justify-between w-full">
          <h3 class="text-dark__blue__cl text-2xl font-normal">Manage Professionals</h3>
          <div>
            <base-button :click-handler="()=>handleAddProfessional(true)" custom-classes="flex items-center gap-2 justify-center float-right">
              <font-awesome-icon :icon="['fa','user-plus']"/>
              <span>Add Professional</span>
            </base-button>
          </div>
        </div>
        <div class="bg-white my-6 py-8 rounded-[24px]">
          <div class="flex items-center justify-between w-full border-b border-gray__cl mb-7 pb-7 px-8">
            <h4 class="text-dark__blue__cl text-xl font-normal">{{ currentSelectedProfessional && currentSelectedProfessional.name }}'s Settings</h4>
            <button @click="()=>handleDeleteProfessionalMixinSubmit(currentSelectedProfessional && currentSelectedProfessional._id)" class="font-bold text-blue__cl hover:opacity-90">
              <font-awesome-icon :icon="['fa','trash']" v-if="!isHandleDeleteProfessionalLoading"/>
              <primary-loader :is-loading="isHandleDeleteProfessionalLoading"/>
            </button>
          </div>

          <div class="flex items-center justify-between border-b border-gray__cl mb-7 pb-7 px-8">
            <div class="flex items-center gap-10">
              <bullet-point-button :click-handler="()=>handleEditProfessional(true)"/>
              <h5 class="text-dark__blue__cl text-xl font-normal">Professional's Details</h5>
            </div>
            <button @click="()=>handleEditProfessional(true)" class="font-normal text-blue__cl text-xl hover:opacity-90">Edit</button>
          </div>
        </div>
      </div>
      <business-manage-sidebar :key="$route.query.q ? $route.query.q : ''" title="Professionals" @handle-card-selection="handleCardSelection" :card-details="cardDetails"/>
    </div>

    <!--    Add Professional Modal-->
    <add-professional-modal
      :show-add-professional-modal="showAddProfessionalModal"
      :all-services="businessServices.data || []"
      :business-schedule="businessSchedule.schedule || []"
      :professional-working-schedule="[]"
      @handle-add-professional="handleAddProfessional"
      @confirm-professional-added="confirmServiceAdded"
    />

    <!--    Edit Professional Modal-->
    <add-professional-modal
      :key="currentSelectedProfessional && currentSelectedProfessional._id"
      :show-add-professional-modal="showEditProfessionalModal"
      :all-services="businessServices.data || []"
      :pre-selected-services="currentSelectedProfessional && currentSelectedProfessional.services"
      :business-schedule="businessSchedule && businessSchedule.schedule"
      :professional-working-schedule="currentSelectedProfessional && currentSelectedProfessional.schedule"
      :professional-id="currentSelectedProfessional && currentSelectedProfessional._id"
      :professional-name="currentSelectedProfessional && currentSelectedProfessional.name"
      @handle-add-professional="handleEditProfessional"
      @confirm-professional-added="confirmServiceAdded"
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
import BusinessSidebar from "~/components/reservation/features/booking-history/business-sidebar";
import SchedulingCalendar from "~/components/reservation/common/calendar/scheduling-calendar";
import BusinessManageSidebar from "~/components/reservation/features/booking-history/business-manage-sidebar";
import {
  batchingBusinessServicesAndProfessionals
} from "~/mixins/apis/settings-fetch/batching-business-services-and-professionals";
import PageLoader from "~/components/reservation/common/loaders/page-loader";
import AddProfessionalModal
  from "~/components/reservation/features/settings/manage-professionals/add-professional-modal";
import {handleDeleteProfessional} from "~/mixins/apis/settings/handle-delete-professional";
import PrimaryLoader from "~/components/reservation/common/loaders/primary-loader";
import BulletPointButton from "@/components/reservation/common/buttons/bullet-point-button";

export default {
  name: "manage-professionals",
  components: {
    BulletPointButton,
    PrimaryLoader,
    AddProfessionalModal,
    PageLoader,
    BusinessManageSidebar,
    SchedulingCalendar,
    BusinessSidebar,
    BookingCard, BaseButton, DashboardCard, DropdownItem, Dropdown, DropdownContent},
  auth:false,
  layout:"business-layout",
  middleware:"reservation-protected",
  mixins:[batchingBusinessServicesAndProfessionals,handleDeleteProfessional],
  data(){
    return{
      currentSelectedProfessional:{name:''},
      showAddProfessionalModal:false,
      showEditProfessionalModal:false
    }
  },
  computed:{
    cardDetails(){
      this.mutateCurrentSelected(this.$route.query?.q)

      return this.businessProfessionals?.map((el)=>{
        return {
          image:el?.media,
          name:el?.name,
          cardType: "Professional",
          _id:el?._id,
        }
      }) || []
    }
  },
  watch:{
    cardDetails(){
      this.mutateCurrentSelected(this.$route.query?.q)
      return this.businessProfessionals?.map((el)=>{
        return {
          image:el?.media,
          name:el?.name,
          cardType: "Professional",
          _id:el?._id,
        }
      }) || []
    },
    '$route.query.q'(){
      this.mutateCurrentSelected(this.$route.query?.q)
    }
  },
  methods:{
    mutateCurrentSelected(query) {
      if(query){
        this.currentSelectedProfessional = this.businessProfessionals.find(el=>el?._id === query)
        if(!this.businessProfessionals.find(el=>el?._id === query)){
          this.currentSelectedProfessional = this.businessProfessionals?.[0]
        }
      }else{
        this.currentSelectedProfessional = this.businessProfessionals?.[0]
      }
    },
    handleCardSelection({id}){
      this.currentSelectedProfessional = this.businessProfessionals.find(el => el?._id === id)
    },
    handleAddProfessional(isActive){
      this.showAddProfessionalModal = isActive
    },
    handleEditProfessional(isActive){
      this.showEditProfessionalModal = isActive
    },
    confirmServiceAdded(){
      this.$fetch()
    },
  }
}
</script>


