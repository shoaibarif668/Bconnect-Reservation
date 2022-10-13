<template>
  <div class="px-72">
    <h1 class="text-dark__blue__cl text-3xl pt-2.5 font-bold">Appointment Booking</h1>
    <form-wizard @on-complete="onComplete"
                 validate-on-back
                 ref="wizard"
                 :start-index.sync="activeTabIndex"
                 shape="circle"
                 color="#20a0ff"
                 error-color="#ff4949"
                 title=""
                 subtitle=""
                 :hide-buttons="activeTabIndex === 2"
    >
      <tab-content title="Select Services" icon="">
        <div class="pt-20 pb-12 grid grid-cols-3 gap-2.5">
          <div v-for="(_,index) in [1,2,3]" :key="index">
            <service-card @handle-services-selection="handleServicesSelection"/>
          </div>
        </div>
      </tab-content>
      <tab-content title="Book Professional" icon="">
        <h2 class="pb-2.5 text-xl text-dark__blue__cl font-bold">Booking for <span>{{ 'Service' }}</span></h2>
        <vue-cal
          :disable-views="['years', 'year', 'month','week']"
          active-view="day"
          :min-date="tomorrowsDate"
          :events="events"
          :no-event-overlaps="true"
          @cell-click="onCellClick"
          :split-days="customDaySplitLabels"
          :selected-date="`${tomorrowsDate.getFullYear()}-${(tomorrowsDate.getMonth()+1)}-${tomorrowsDate.getDate()}`"
          hide-view-selector
          :disable-days="[]"
          sticky-split-labels>
          <template #split-label="{ split, view }">
<!--            <i class="icon material-icons">person</i>-->
           <div class="flex items-center gap-1">
             <font-awesome-icon :style="`color: #${split.color}`" class="text-[`#${split.color}`]" :icon="['fa','user']"/>
             <strong :style="`color: #${split.color}`">{{ split.label }}</strong>
           </div>
          </template>
        </vue-cal>
      </tab-content>
      <tab-content title="Confirm Booking" icon="">
        <div class="pb-12 pt-20  flex gap-24" v-if="!isUserLoggedIn">
          <div class="flex items-center flex-col gap-16 w-full">
            <h2 class="text-dark__blue__cl font-bold text-3xl ">Finish booking now by creating an account</h2>
            <div class="flex items-center flex-col gap-5 w-full">
              <base-button :click-handler="()=>handleLogin(true)">Login</base-button>
              <base-button :click-handler="()=>handleSignup(true)">Sign up</base-button>
            </div>
          </div>
          <img src="~/assets/img/auth-image.png" class="max-w-[50%]" alt="Auth"/>
        </div>
        <div class="pb-12 pt-20  flex gap-16" v-if="isUserLoggedIn">
          <div class="flex flex-col">
            <h2 class="text-dark__blue__cl font-bold text-4xl pb-10"><span class="text-blue__cl">Aly</span> will be waiting for you on
              <span class="text-blue__cl">Mon, Sept 5 12:00 - 13:00</span> </h2>
            <h3 class="text-dark__blue__cl text-xl pb-10">You will receive a confirmation SMS shortly.</h3>
            <base-button custom-classes="mb-5" :click-handler="()=>{}">View Booking History</base-button>
            <base-button :click-handler="()=>{}">Book New Appointment</base-button>
          </div>
          <img src="~/assets/img/booking-completed.png" class="max-w-[50%] object-contain" alt="Auth"/>
        </div>
      </tab-content>
    </form-wizard>

<!--    Login Modal-->
    <auth-modal title="Sign In" @close="handleLogin" :show-modal="showLoginModal">
      <img slot="image" src="~/assets/img/auth-woman.png" class="max-w-[220px] mt-16 object-contain" alt="Auth Woman"/>
      <form class="flex flex-col gap-5" slot="form" @submit.prevent="handleLoginSubmit">
        <base-input
          v-model="fieldsData.email"
          placeholder="Email"
          type="email"
          custom-classes="max-w-[400px]"
          required
        />
        <base-input
          v-model="fieldsData.password"
          placeholder="Password"
          type="password"
          custom-classes="max-w-[400px]"
          required
        />
        <base-button is-submit-type custom-classes="w-full max-w-[400px] mt-5">
          Sign In
        </base-button>
      </form>
    </auth-modal>
<!--    Signup Modal-->
    <auth-modal title="Sign Up" @close="handleSignup" :show-modal="showSignupModal">
      <img slot="image" src="~/assets/img/auth-woman-2.png" class="max-w-[220px] mt-16 object-contain" alt="Auth Woman"/>
      <form class="flex flex-col gap-5" slot="form" @submit.prevent="handleSignupSubmit">
        <base-input
          v-model="signupFieldsData.userName"
          placeholder="Username"
          type="text"
          custom-classes="max-w-[400px]"
          required
        />
        <base-input
          v-model="signupFieldsData.email"
          placeholder="Email"
          type="email"
          custom-classes="max-w-[400px]"
          required
        />
        <base-input
          v-model="signupFieldsData.password"
          placeholder="Password"
          type="password"
          custom-classes="max-w-[400px]"
          required
        />
        <base-input
          v-model="signupFieldsData.phoneNumber"
          placeholder="Phone Number"
          type="number"
          custom-classes="max-w-[400px]"
          required
        />
        <base-button is-submit-type custom-classes="w-full max-w-[400px] mt-5">
          Sign Up
        </base-button>
      </form>
    </auth-modal>
  </div>
</template>

<script>

import ServiceCard from "~/components/reservation/common/cards/service-card";
import VueCal from 'vue-cal'
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BaseModal from "~/components/reservation/common/modal/base-modal";
import BaseInput from "~/components/reservation/common/form/base-input";
import AuthModal from "~/components/reservation/common/modal/auth-modal";

export default {
  components: {AuthModal, BaseInput, BaseModal, BaseButton, ServiceCard,VueCal},
  auth:false,
  name: "booking",
  layout:"reservation-layout", //auto picks up from layout directory
  data() {
    return{
      activeTabIndex: 0,
      selectedServices:[],
      tomorrowsDate:new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
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
      showLoginModal:false,
      showSignupModal:false,
      isUserLoggedIn:false,
      fieldsData:{
        email:"",
        password:""
      },
      signupFieldsData:{
        userName:"",
        phoneNumber:"",
        email:"",
        password:"",

      }
    }
  },
  methods: {
    onComplete() {
      alert("Yay. Done!");
    },
    handleServicesSelection(serviceName,action){
      if(action === 'add'){
        this.selectedServices.push(serviceName)
      }else if(action === 'remove'){
        if(this.selectedServices.length > 0){
          this.selectedServices = this.selectedServices.filter((el)=>el !== serviceName)
        }
      }
    },
    onCellClick(e){
      const date = new Date(e.date)

      //If the user's date is greater than the selected date, then event is in the past.
      const startingDate =  `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()} ${date.getHours()}:00`
      const endingDate =  `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()} ${date.getHours()+1}:00`

      this.events.push({
        start: startingDate,
        end: endingDate,
        title: '',
        class: 'newService',
        background: true,
        deletable: false,
        resizable: false,
        split: e.split
      })
    },
    handleLogin(isActive){
      this.showLoginModal = isActive
    },
    handleSignup(isActive){
      this.showSignupModal = isActive
    },
    handleLoginSubmit(){
      this.isUserLoggedIn = true
      this.showLoginModal = false
    },
    handleSignupSubmit(){
      this.isUserLoggedIn = true
      this.showSignupModal = false
    }
    // forceClearError() {
    //   this.$refs.wizard.tabs[this.activeTabIndex].validationError = null;
    // },
    // validate(ref) {
    //   return this.$refs[ref].validate();
    // },
    // onStepValidate(validated, model) {
    //   if (validated) {
    //     this.finalModel = { ...this.finalModel, ...model };
    //   }
    // }

  },
  mounted() {
    // return this.$nuxt.error({ statusCode: 404, message: "This Business Does Not Exist" })

  },
  async fetch() {
   try{
     let data = await this.$resAxios.get(`asd`)
     console.log(data,"data")
   }
   catch (e){
     console.log(e,"1")
   }
  },
}
</script>

<style>

.booking__confirmed .wizard-btn{
  display: none;
}

.vuecal {height: 90vh;}
.vuecal .day-split-header {font-size: 11px;}

.newService{
  background: #FAF7F7;
  color: #00ADEE;
  display: flex;
  align-items: center;
  justify-content: center;
}
.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}

.panel-heading {
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;

  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.panel-body {
  padding: 15px;
}
</style>
