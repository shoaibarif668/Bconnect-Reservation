<!--<template>-->
<!--  <form-wizard @on-complete="onComplete"-->
<!--               validate-on-back-->
<!--               ref="wizard"-->
<!--               :start-index.sync="activeTabIndex"-->
<!--               shape="circle"-->
<!--               color="#20a0ff"-->
<!--               error-color="#ff4949"-->
<!--               title=""-->
<!--               subtitle=""-->
<!--               :hide-buttons="activeTabIndex === 2"-->
<!--  >-->
<!--    <tab-content title="Select Services" icon="">-->
<!--      <div class="pt-20 pb-12 grid grid-cols-3 gap-2.5">-->
<!--        <div v-for="(_,index) in [1,2,3]" :key="index">-->
<!--          <service-card @handle-services-selection="handleServicesSelection"/>-->
<!--        </div>-->
<!--      </div>-->
<!--    </tab-content>-->
<!--    <tab-content title="Book Professional" icon="">-->
<!--      <h2 class="pb-2.5 text-xl text-dark__blue__cl font-bold">Booking for <span>{{ 'Service' }}</span></h2>-->
<!--      <vue-cal-->
<!--        :disable-views="['years', 'year', 'month','week']"-->
<!--        active-view="day"-->
<!--        :min-date="tomorrowsDate"-->
<!--        :events="events"-->
<!--        :no-event-overlaps="true"-->
<!--        @cell-click="onCellClick"-->
<!--        :split-days="customDaySplitLabels"-->
<!--        :selected-date="`${tomorrowsDate.getFullYear()}-${(tomorrowsDate.getMonth()+1)}-${tomorrowsDate.getDate()}`"-->
<!--        hide-view-selector-->
<!--        :disable-days="[]"-->
<!--        sticky-split-labels>-->
<!--        <template #split-label="{ split, view }">-->
<!--          &lt;!&ndash;            <i class="icon material-icons">person</i>&ndash;&gt;-->
<!--          <div class="flex items-center gap-1">-->
<!--            <font-awesome-icon :style="`color: #${split.color}`" class="text-[`#${split.color}`]" :icon="['fa','user']"/>-->
<!--            <strong :style="`color: #${split.color}`">{{ split.label }}</strong>-->
<!--          </div>-->
<!--        </template>-->
<!--      </vue-cal>-->
<!--    </tab-content>-->
<!--    <tab-content title="Confirm Booking" icon="">-->
<!--      <div class="pb-12 pt-20  flex gap-24" v-if="!isUserLoggedIn">-->
<!--        <div class="flex items-center flex-col gap-16 w-full">-->
<!--          <h2 class="text-dark__blue__cl font-bold text-3xl ">Finish booking now by creating an account</h2>-->
<!--          <div class="flex items-center flex-col gap-5 w-full">-->
<!--            <base-button :click-handler="()=>handleLogin(true)">Login</base-button>-->
<!--            <base-button :click-handler="()=>handleSignup(true)">Sign up</base-button>-->
<!--          </div>-->
<!--        </div>-->
<!--        <img src="@/assets/img/auth-image.png" class="max-w-[50%]" alt="Auth"/>-->
<!--      </div>-->
<!--      <div class="pb-12 pt-20  flex gap-16" v-if="isUserLoggedIn">-->
<!--        <div class="flex flex-col">-->
<!--          <h2 class="text-dark__blue__cl font-bold text-4xl pb-10"><span class="text-blue__cl">Aly</span> will be waiting for you on-->
<!--            <span class="text-blue__cl">Mon, Sept 5 12:00 - 13:00</span> </h2>-->
<!--          <h3 class="text-dark__blue__cl text-xl pb-10">You will receive a confirmation SMS shortly.</h3>-->
<!--          <base-button custom-classes="mb-5" :click-handler="()=>{}">View Booking History</base-button>-->
<!--          <base-button :click-handler="()=>{}">Book New Appointment</base-button>-->
<!--        </div>-->
<!--        <img src="@/assets/img/booking-completed.png" class="max-w-[50%] object-contain" alt="Auth"/>-->
<!--      </div>-->
<!--    </tab-content>-->
<!--  </form-wizard>-->
<!--</template>-->

<!--<script>-->
<!--import BaseButton from "~/components/reservation/common/buttons/base-button";-->
<!--import ServiceCard from "~/components/reservation/common/cards/service-card";-->
<!--export default {-->
<!--  name: "booking-stepper",-->
<!--  components: {ServiceCard, BaseButton},-->
<!--  props:{-->
<!--    isUserLoggedIn:{-->
<!--      type:Boolean,-->
<!--      default:false-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
