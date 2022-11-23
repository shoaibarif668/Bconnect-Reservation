<template>
  <edit-modal base-modal-custom-class="overflow-hidden min-h-screen h-full overflow-y-auto" :title="`Your Working Schedule`" @close="$emit('handle-edit-working-schedule',false)" :show-modal="showWorkingScheduleModal">
    <form class="flex flex-col gap-5 items-center w-full text-center" slot="form" @submit.prevent="handleAddWorkingScheduleSubmit">
      <select
        class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
        v-model="selectedWeekDay"
        @change="onWeekDaysChange"
      >
        <option value="" disabled selected>Working Days</option>
        <option
          v-for="option in weekDays"
          :value="option"
          :key="option"
          :selected="option === selectedWeekDay"
        >{{ option }}</option>
      </select>

      <div class="w-full text-left max-w-[400px]"  v-if="workingSchedule.length > 0 || false">
        <div v-for="(schedule,index) in workingSchedule" :class="index < workingSchedule.length - 1 ? 'mb-5' : ''">
          <div class="flex items-center justify-between pb-2.5">
            <h1 class="text-dark__blue__cl text-2xl font-bold">{{schedule.day || ''}}</h1>
            <button type="button" @click="()=>onCloseWeekDays(schedule.day || '')">
              <font-awesome-icon class="font-bold text-dark__blue__cl" :icon="['fa','xmark']"/>
            </button>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-blue__cl text-sm ">Select Start Time ~ End Time</label>
            <date-picker
              type="time"
              :time-picker-options="{start: '00:00',step: '00:30',end: '23:59'}"
              range
              v-model="schedule['startEndTime']"
              valueType="format"
              placeholder="hh:mm a"
              format="hh:mm a"
            ></date-picker>
          </div>
<!--          <div class="flex flex-col gap-1">-->
<!--            <label>End Time</label>-->
<!--            <date-picker type="time" v-model="schedule['endTime']" valueType="format"></date-picker>-->
<!--          </div>-->
        </div>
      </div>

      <base-button is-submit-type custom-classes="w-full max-w-[400px] mt-5" v-if="!(isHandleAddBusinessScheduleLoading || isHandleEditBusinessScheduleLoading)">
        Add Working Schedule
      </base-button>
      <primary-loader :is-loading="isHandleAddBusinessScheduleLoading || isHandleEditBusinessScheduleLoading"/>
      <error-message :is-error="!!emptyWorkingSchedule" :message="emptyWorkingSchedule"/>
      <error-message :is-error="!!handleAddBusinessScheduleError" :message="handleAddBusinessScheduleError"/>
      <error-message :is-error="!!handleEditBusinessScheduleError" :message="handleEditBusinessScheduleError"/>
    </form>
  </edit-modal>
</template>

<script>
import AuthModal from "~/components/reservation/common/modal/auth-modal";
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BaseInput from "~/components/reservation/common/form/base-input";
import PrimaryLoader from "~/components/reservation/common/loaders/primary-loader";
import ErrorMessage from "~/components/reservation/common/messages/error-message";
import EditModal from "~/components/reservation/common/modal/edit-modal";
import {handleAddBusinessSchedule} from "~/mixins/apis/settings/handle-add-business-schedule";
import {handleEditBusinessSchedule} from "~/mixins/apis/settings/handle-edit-business-schedule";
import {convertTime12to24, convertTime24to12} from "@/utils/helpers";

export default {
  name: "edit-working-schedule-modal",
  components: {EditModal, ErrorMessage, PrimaryLoader, BaseInput, BaseButton, AuthModal},
  mixins:[handleAddBusinessSchedule,handleEditBusinessSchedule],
  props:{
    businessWorkingSchedule:{
      type:Array,
      default:[]
    },
    showWorkingScheduleModal:{
      type:Boolean
    },
    scheduleId:{
      type:String
    }
  },
  data() {
    return{
      weekDays:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      selectedWeekDay:'',
      time:new Date(),
      workingSchedule:[],
      emptyWorkingSchedule:"",
    }
  },
  computed:{
  //   weekDaysComputed:{
  //     // getter
  //     get: function () {
  //       if(!this.businessWorkingSchedule?.length > 0) return this.weekDays
  //       this.workingSchedule = this.businessWorkingSchedule.map((el)=>{
  //         return{
  //           day:el?.day,
  //           startEndTime:[el?.startTime,el?.endTime]
  //         }
  //       })
  //       return this.weekDays.filter((el)=>el!==this.businessWorkingSchedule.find(innerEl => innerEl?.day === el)?.day)
  //     },
  //     // setter
  //     set: function (newValue) {
  //       // this.weekDays = newValue
  //     }
  //
  //   }
  },
  created() {
    if(!this.businessWorkingSchedule?.length > 0){
      return
    }
    this.workingSchedule = this.businessWorkingSchedule.map((el)=>{
      //Converting 24-hour format to 12-hour, so it shows correctly on view
      return{
        day:el?.day,
        startEndTime:[
          parseInt(convertTime24to12(el?.startTime).split(":")[0]) < 10 ? `0${convertTime24to12(el?.startTime)}` : convertTime24to12(el?.startTime),
          parseInt(convertTime24to12(el?.endTime).split(":")[0]) < 10 ? `0${convertTime24to12(el?.endTime)}` : convertTime24to12(el?.endTime),
        ]
      }
    })
    this.weekDays = this.weekDays.filter((el)=>el!==this.businessWorkingSchedule.find(innerEl => innerEl?.day === el)?.day)
  },
  methods: {
    handleAddWorkingScheduleSubmit(){
      //Converting 12-hour format to 24-hour format, so it sends correctly to the api
      let businessWorkingSchedule = this.workingSchedule.map((el)=>{
        return{
          ...el,
          startTime:convertTime12to24(el?.startEndTime[0]),
          endTime:convertTime12to24(el?.startEndTime[1]),
        }
      })
      if(this.workingSchedule?.length <= 0){
        this.emptyWorkingSchedule = "Please Add Your Schedule To Continue"
        return
      }
      if(this.businessWorkingSchedule?.length > 0){
        //Edit Business Schedule
        this.handleEditBusinessScheduleMixinSubmit(businessWorkingSchedule,this.scheduleId)
      }else if(this.businessWorkingSchedule?.length <= 0){
        //Add New Business Schedule
        this.handleAddBusinessScheduleMixinSubmit(businessWorkingSchedule)
      }
    },
    onWeekDaysChange(){
      this.weekDays = this.weekDays.filter((el)=>el!==this.selectedWeekDay)
      this.workingSchedule.push({
        day:this.selectedWeekDay,
        startEndTime:[],
      })
      this.selectedWeekDay = ''
    },
    onCloseWeekDays(day){
      if(!this.weekDays.includes(day)){
        this.weekDays.push(day)
      }
      this.workingSchedule = this.workingSchedule.filter(el => el?.day !== day)

    }
  }
}
</script>

<style>
.mx-datepicker{
  width: 100%;
}
</style>
