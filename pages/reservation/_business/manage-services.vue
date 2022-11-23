<template>
  <section class="mx-10 mb-5" >
    <page-loader v-if="$fetchState.pending"/>
    <div class="grid grid-cols-dashboard__column gap-5" v-if="!$fetchState.pending">
      <div class="bg-peach__bg w-full py-8 px-10 rounded-3xl">
        <div class="flex items-center justify-between w-full">
          <h3 class="text-dark__blue__cl text-2xl font-normal">Manage Services</h3>
          <div>
            <base-button :click-handler="()=>handleAddService(true)" custom-classes="flex items-center gap-2 justify-center float-right">
              <font-awesome-icon :icon="['fa','user-plus']"/>
              <span>Add Service</span>
            </base-button>
          </div>
        </div>
        <div class="bg-white my-6 py-8 rounded-[24px]">
          <div class="flex items-center justify-between w-full border-b border-gray__cl mb-7 pb-7 px-8">
            <h4 class="text-dark__blue__cl text-xl font-normal">{{ currentSelectedService.name || '' }}'s Settings</h4>
            <button @click="()=>handleDeleteServiceMixinSubmit(currentSelectedService._id || '')" class="font-bold text-blue__cl hover:opacity-90">
              <font-awesome-icon :icon="['fa','trash']" v-if="!isHandleDeleteServiceLoading"/>
              <primary-loader :is-loading="isHandleDeleteServiceLoading"/>
            </button>
          </div>

          <div class="flex items-center justify-between border-b border-gray__cl mb-7 pb-7 px-8">
            <div class="flex items-center gap-10">
              <bullet-point-button :click-handler="()=>handleEditService(true)"/>
              <h5 class="text-dark__blue__cl text-xl font-normal">Service's Details</h5>
            </div>
            <button type="button" @click="()=>handleEditService(true)" class="font-normal text-blue__cl text-xl hover:opacity-90">Edit</button>
          </div>
        </div>
      </div>
      <business-manage-sidebar title="Services" @handle-card-selection="handleCardSelection" :card-details="cardDetails"/>
    </div>

    <!--    Add Service Modal-->
    <add-services-modal
      :show-add-services-modal="showAddServicesModal"
      @handle-add-services="handleAddService"
      @confirm-service-added="confirmServiceAdded"
    />
    <!--   Edit Service Modal-->
    <edit-services-modal
      :key="currentSelectedService && currentSelectedService._id"
      :service="currentSelectedService"
      :show-edit-services-modal="showEditServicesModal"
      @handle-edit-services="handleEditService"
      @confirm-service-added="confirmServiceAdded"
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
import {fetchBusinessServices} from "~/mixins";
import PageLoader from "~/components/reservation/common/loaders/page-loader";
import AddServicesModal from "~/components/reservation/features/settings/manage-services/add-services-modal";
import {handleDeleteService} from "~/mixins/apis/settings/handle-delete-service";
import PrimaryLoader from "~/components/reservation/common/loaders/primary-loader";
import EditServicesModal from "~/components/reservation/features/settings/manage-services/edit-services-modal";
import BulletPointButton from "@/components/reservation/common/buttons/bullet-point-button";

export default {
  name: "manage-services",
  components: {
    BulletPointButton,
    EditServicesModal,
    PrimaryLoader,
    AddServicesModal,
    PageLoader,
    BusinessManageSidebar,
    SchedulingCalendar,
    BusinessSidebar,
    BookingCard, BaseButton, DashboardCard, DropdownItem, Dropdown, DropdownContent},
  auth:false,
  layout:"business-layout",
  middleware:"reservation-protected",
  mixins:[fetchBusinessServices,handleDeleteService],
  data(){
    return{
      currentSelectedService:{},
      showAddServicesModal:false,
      showEditServicesModal:false,
    }
  },
  computed:{
    cardDetails(){
      this.currentSelectedService = {
        name:this.businessServices?.data?.[0]?.name,
        _id:this.businessServices?.data?.[0]?._id,
        media:this.businessServices?.data?.[0]?.media,
        durationEnding:this.businessServices?.data?.[0]?.durationEnding
      }
      return this.businessServices?.data?.map((el)=>{
        return {image:el?.media,name:el?.name,duration:`${el?.durationEnding} mins`,cardType: "Service",_id:el?._id}
      }) || []
    }
  },
  watch:{
    cardDetails(){
      this.currentSelectedService = {
        name:this.businessServices?.data?.[0]?.name,
        _id:this.businessServices?.data?.[0]?._id,
        media:this.businessServices?.data?.[0]?.media,
        durationEnding:this.businessServices?.data?.[0]?.durationEnding
      }
      return this.businessServices?.data?.map((el)=>{
        return {image:el?.media,name:el?.name,duration:el?.durationEnding,cardType: "Service",_id:el?._id}
      }) || []
    }
  },
  activated() {
    if (this.$fetchState.timestamp <=  Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch() {
    await this.fetchBusinessServiceService()
  },
  methods:{
    handleCardSelection({name, id, media, duration}){
      console.log({name, id, media, duration},'{name, id, media, duration}')
      this.currentSelectedService = {name,_id:id,media,durationEnding:duration}
    },
    handleAddService(isActive){
      this.showAddServicesModal = isActive
    },
    handleEditService(isActive){
      this.showEditServicesModal = isActive
    },
    confirmServiceAdded(){
      this.$fetch()
    },
  }
}
</script>


