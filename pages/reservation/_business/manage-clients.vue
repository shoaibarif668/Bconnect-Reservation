<template>
  <section>
    <page-loader v-if="$fetchState.pending || isSearchedClientsLoading"/>
    <div class="mx-10 mb-5">
      <div class="grid grid-cols-dashboard__column gap-5 ">
        <div class="bg-peach__bg w-full py-8 px-10 rounded-3xl">
          <div class="flex items-center justify-between w-full">
            <h3 class="text-dark__blue__cl text-2xl font-normal">Manage Clients</h3>
            <div class="w-full max-w-[250px]">
              <input
                class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg w-full"
                v-model="searchQuery"
                placeholder="Search Clients"
                type="text"
                required
              />
            </div>
          </div>
          <div class="bg-white my-6 py-8 rounded-[24px]">
            <div class="flex items-center justify-between w-full border-b border-gray__cl mb-7 pb-7 px-8">
              <h4 class="text-dark__blue__cl text-xl font-normal">{{ currentSelectedClient && currentSelectedClient.userName }}'s Settings</h4>
              <button @click="()=>{}" class="font-bold text-blue__cl hover:opacity-90">
                <font-awesome-icon :icon="['fa','trash']"/>
              </button>
            </div>

            <div class="flex items-center justify-between border-b border-gray__cl mb-7 pb-7 px-8">
              <div class="flex items-center gap-10">
                <bullet-point-button :click-handler="()=>handleViewClient(true)"/>
                <h5 class="text-dark__blue__cl text-xl font-normal">Client's Details</h5>
              </div>
              <button @click="()=>handleViewClient(true)" class="font-normal text-blue__cl text-xl hover:opacity-90">View</button>
            </div>
            <div class="flex items-center justify-between border-b border-gray__cl mb-7 pb-7 px-8">
              <div class="flex items-center gap-10">
                <bullet-point-button :click-handler="()=>handleResetPasswordMixinSubmit(currentSelectedClient && currentSelectedClient._id)"/>
                <h5 class="text-dark__blue__cl text-xl font-normal">Reset Password</h5>
              </div>
              <button v-if="!isPasswordReset" @click="()=>handleResetPasswordMixinSubmit(currentSelectedClient && currentSelectedClient._id)" class="font-normal text-blue__cl text-xl hover:opacity-90">
                <span v-if="!isHandleResetPasswordLoading">Reset</span>
                <secondary-loader :is-loading="isHandleResetPasswordLoading"/>
              </button>
              <span v-if="isPasswordReset" class="font-normal text-blue__cl text-xl">Password Successfully Reset</span>
            </div>
            <div class="flex items-center justify-between border-b border-gray__cl mb-7 pb-7 px-8">
              <div class="flex items-center gap-10">
                <bullet-point-button :click-handler="()=>handleIssuePromoCode(true)"/>
                <h5 class="text-dark__blue__cl text-xl font-normal">Issue Promo Code</h5>
              </div>
              <button @click="()=>handleIssuePromoCode(true)" class="font-normal text-blue__cl text-xl hover:opacity-90">Issue</button>
            </div>
          </div>
        </div>
        <business-manage-sidebar
          :key="$route.query.q ? $route.query.q : randomId"
          title="Clients"
          @handle-card-selection="handleCardSelection"
          :card-details="cardDetails"/>
      </div>

      <!--   View Client Details Modal-->
      <view-client-modal
        :key="currentSelectedClient ? currentSelectedClient._id : randomId2"
        :show-view-client-modal="showViewClientModal"
        :client-detail="currentSelectedClient || {}"
        @handle-view-client="handleViewClient"
      />

      <!--   Issue Promo Code Modal-->
      <issue-promo-code-modal
        :promo-codes="promoCodes || []"
        :current-selected-client="currentSelectedClient || {}"
        :show-issue-promo-code-modal="showIssuePromoCodeModal"
        @handle-issue-promo-code="handleIssuePromoCode"
        @confirm-issue="confirmIssuePromoCode"
      />
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
import BusinessManageSidebar from "~/components/reservation/features/booking-history/business-manage-sidebar";
import ViewClientModal from "~/components/reservation/features/settings/manage-cients/view-client-modal";
import {
  batchingBusinessClientsAndPromoCodes
} from "~/mixins/apis/settings-fetch/batching-business-clients-and-promo-codes";
import IssuePromoCodeModal from "~/components/reservation/features/settings/manage-cients/issue-promo-code-modal";
import PageLoader from "@/components/reservation/common/loaders/page-loader";
import {handleResetPassword} from "@/mixins/apis/settings/handle-reset-password";
import PrimaryLoader from "@/components/reservation/common/loaders/primary-loader";
import SecondaryLoader from "@/components/reservation/common/loaders/secondary-loader";
import BulletPointButton from "@/components/reservation/common/buttons/bullet-point-button";
import {fetchSearchClients} from "@/mixins/apis/settings-fetch/fetch-search-clients";

export default {
  name: "manage-clients",
  components: {
    BulletPointButton,
    SecondaryLoader,
    PrimaryLoader,
    PageLoader,
    IssuePromoCodeModal,
    ViewClientModal,
    BusinessManageSidebar,
    SchedulingCalendar,
    BusinessSidebar,
    BookingCard, BaseButton, DashboardCard, DropdownItem, Dropdown, DropdownContent},
  auth:false,
  layout:"business-layout",
  middleware:"reservation-protected",
  mixins:[fetchSearchClients,batchingBusinessClientsAndPromoCodes,handleResetPassword],
  data(){
    return{
      currentSelectedClient:{},
      showViewClientModal:false,
      showIssuePromoCodeModal:false,
      isPasswordReset:false,
      searchQuery:""
    }
  },
  computed:{
    cardDetails(){
      console.log(this.$route.query,"this.$route.query")
      this.mutateCurrentSelected(this.$route.query?.q)
      return this.searchedClientsList?.map((el)=>{
        return {
          image:el?.profilePicture,
          name:el?.userName,
          email:el?.email,
          joined:new Date(el?.createdAt).toDateString(),
          cardType: "Client",
          _id:el?._id,
        }
      }) || []
    },
    randomId(){
      return Math.floor(Math.random() * 1000)
    },
    randomId2(){
      return Math.floor(Math.random() * 1000)
    }
  },
  watch:{
    cardDetails(){
      this.mutateCurrentSelected(this.$route.query?.q)
      return this.searchedClientsList?.map((el)=>{
        return {
          image:el?.profilePicture,
          name:el?.userName,
          email:el?.email,
          joined:new Date(el?.createdAt).toDateString(),
          cardType: "Client",
          _id:el?._id,
        }
      }) || []
    },
    '$route.query.q'(){
      this.mutateCurrentSelected(this.$route.query?.q)
    },
    async 'searchQuery'(){
      console.log(this.searchQuery,"searchQuery")
      await this.fetchSearchClientsService(this.searchQuery)
    }
  },
  async mounted() {
    await this.fetchSearchClientsService("")
  },
  methods:{
    mutateCurrentSelected(query){
      if(query){
        this.currentSelectedClient = this.searchedClientsList.find(el=>el?._id === query)
        if(!this.searchedClientsList.find(el=>el?._id === query)){
          this.currentSelectedClient = this.searchedClientsList?.[0]
        }
      }else{
        this.currentSelectedClient = this.searchedClientsList?.[0]
      }
    },
    handleCardSelection({id}){
      this.isPasswordReset = false
      this.currentSelectedClient = this.searchedClientsList.find(el => el?._id === id)
    },
    handleIssuePromoCode(isActive){
      this.showIssuePromoCodeModal = isActive
    },
    handleViewClient(isActive){
      this.showViewClientModal = isActive
    },
    confirmIssuePromoCode(){
      this.$fetch()
    }
  }
}
</script>


