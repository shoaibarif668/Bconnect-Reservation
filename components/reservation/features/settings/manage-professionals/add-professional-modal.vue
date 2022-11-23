<template>
  <edit-modal base-modal-custom-class="overflow-hidden min-h-screen h-full overflow-y-auto" :title="`${professionalId ? 'Edit' : 'Add'} A Professional`" @close="$emit('handle-add-professional',false)" :show-modal="showAddProfessionalModal">
    <form class="flex flex-col gap-5 items-center w-full text-center" slot="form" @submit.prevent="handleAddProfessionalSubmit">

      <input
        class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
        v-model="name"
        placeholder="Professional's Name"
        type="text"
        required
      />
      <div class="w-full max-w-[400px]">
        <p class="text font-normal text-sm text-dark__blue__cl pb-2.5 text-left">Professional's Image:</p>
        <input
          type="file"
          accept="image/png, image/jpeg, 'image/jpg', 'image/*'"
          class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
          @change="handleFileUpload"
          required
        />
      </div>
      <div class="w-full max-w-[400px]">
        <multiselect
          v-model="selectedServices"
          :options="allServices"
          :multiple="true"
          :clear-on-select="false"
          :preserve-search="true"
          :placeholder="`Select The Services ${name ? name : 'This Professional'} Offers`"
          label="name"
          track-by="name"
        />
      </div>
      <select
        class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
        v-model="selectedWeekDay"
        @change="onWeekDaysChange"
      >
        <option value="" disabled selected>Working Days</option>
        <option
          v-for="option in computedWeekDays"
          :value="option"
          :key="option"
          :selected="option === selectedWeekDay"
        >{{ option }}</option>
      </select>
      <div class="w-full max-w-[400px] flex flex-col gap-1 items-start">
        <small>*A single <i>work</i> schedule should be setup for a selected day.</small>
        <small>*Multiple <i>breaks</i> can be set in a single day.</small>
      </div>

      <div class="w-full text-left max-w-[400px]"  v-if="workingSchedule.length > 0 || false">
        <div v-for="(schedule,index) in workingSchedule" :class="index < workingSchedule.length - 1 ? 'mb-5' : ''">
          <div class="flex items-center justify-between pb-2.5">
            <h1 class="text-dark__blue__cl text-2xl font-bold">{{schedule.day || ''}}</h1>
            <button type="button" @click="()=>onCloseWeekDays(index || 0)">
              <font-awesome-icon class="font-bold text-dark__blue__cl" :icon="['fa','xmark']"/>
            </button>
          </div>
          <div class="flex flex-col gap-1">
            <div class="flex flex-col gap-1">
              <label class="text-blue__cl text-sm ">Select Start Time ~ End Time</label>
              <date-picker
                type="time"
                :time-picker-options="{
                            start: businessSchedule.find(el=>el.day === schedule.day) ? businessSchedule.find(el=>el.day === schedule.day).startTime : '00:00',
                            step: '00:30',
                            end: businessSchedule.find(el=>el.day === schedule.day) ? businessSchedule.find(el=>el.day === schedule.day).endTime : '23:59',
                          }"
                range
                v-model="schedule['startEndTime']"
                valueType="format"
                placeholder="hh:mm a"
                format="hh:mm a"
              ></date-picker>
            </div>
            <select
              class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
              v-model="schedule['type']"
              required
            >
              <option value="" disabled selected>Select Schedule Type</option>
              <option
                v-for="option in professionalScheduleTypeArray"
                :value="option"
                :key="option"
                :selected="option === schedule['type']"
              >{{ option }}</option>
            </select>
            <div class="w-full flex items-center justify-center border h-[1px] border-blue__cl mx-auto my-2 w-[50%]"/>
          </div>
        </div>
      </div>


      <base-button is-submit-type custom-classes="w-full max-w-[400px] mt-5" v-if="!(isHandleAddProfessionalLoading || isHandleEditProfessionalLoading)">
        {{ `${professionalId ? 'Edit' : 'Add'} Professional` }}
      </base-button>
      <primary-loader :is-loading="isHandleAddProfessionalLoading || isHandleEditProfessionalLoading"/>

      <error-message :is-error="!!handleEditProfessionalError" :message="handleEditProfessionalError"/>
      <error-message :is-error="!!handleAddProfessionalError" :message="handleAddProfessionalError"/>
      <error-message :is-error="!!validationError" :message="validationError"/>
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
import {handleAddProfessional} from "~/mixins/apis/settings/handle-add-professional";
import {handleEditProfessional} from "~/mixins/apis/settings/handle-edit-professional";
import {PROFESSIONAL_SCHEDULE} from "~/utils/constants";
import {convertTime12to24, convertTime24to12} from "@/utils/helpers";

export default {
  name: "add-professional-modal",
  components: {EditModal, ErrorMessage, PrimaryLoader, BaseInput, BaseButton, AuthModal},
  mixins:[handleAddProfessional,handleEditProfessional],
  props:{
    showAddProfessionalModal:{
      type:Boolean
    },
    allServices:{
      type:Array
    },
    professionalWorkingSchedule:{
      type:Array,
      default:[]
    },
    businessSchedule:{
      type:Array,
      default:[]
    },
    professionalId:{
      type:String,
      default: ''
    },
    professionalName:{
      type:String,
      default:''
    },
    preSelectedServices:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return{
      file: '',
      name:this.professionalName,
      selectedServices:this.preSelectedServices?.length > 0 ? this.preSelectedServices.map(el=>this.allServices.find((innerEl)=>innerEl?._id===el)) : [],
      weekDays:this.businessSchedule.map((el)=>el?.day),
      // weekDays:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      selectedWeekDay:'',
      workingSchedule:[],
      professionalScheduleTypeArray:[PROFESSIONAL_SCHEDULE.WORK,PROFESSIONAL_SCHEDULE.BREAK],
      validationError:"",
    }
  },
  computed:{
    computedWeekDays(){
      return this.businessSchedule.map((el)=>el?.day)
    }
  },
  created() {
    if(!this.professionalWorkingSchedule?.length > 0){
      return
    }
    this.workingSchedule = this.professionalWorkingSchedule.map((el)=>{
      return{
        day:el?.day,
        type:el?.type,
        startEndTime:[
          parseInt(convertTime24to12(el?.startTime).split(":")[0]) < 10 ? `0${convertTime24to12(el?.startTime)}` : convertTime24to12(el?.startTime),
          parseInt(convertTime24to12(el?.endTime).split(":")[0]) < 10 ? `0${convertTime24to12(el?.endTime)}` : convertTime24to12(el?.endTime),
        ]
      }
    })
    this.weekDays = this.computedWeekDays.filter((el)=>el!==this.professionalWorkingSchedule.find(innerEl => innerEl?.day === el)?.day)
  },
  methods: {
    handleAddProfessionalSubmit(){
      let formData = new FormData()

      if(this.workingSchedule?.length <= 0){
        this.validationError = "Please Add Schedule To Continue"
        return
      }

      let businessWorkingSchedule = this.workingSchedule.map((el)=>{
        return{
          ...el,
          startTime:convertTime12to24(el?.startEndTime[0]),
          endTime:convertTime12to24(el?.startEndTime[1]),
        }
      })
      let mutatedSelectedServices = this.selectedServices.map(el=>el?._id)

      //APPENDING DATA
      formData.append('name', this.name);
      formData.append('media', this.file);
      for ( let key in mutatedSelectedServices ) {
        formData.append('services[]', mutatedSelectedServices[key]);
      }
      Array.from(businessWorkingSchedule).forEach((schedule,index) => {
        for ( let key in schedule ) {
          formData.append(`schedule[${index}][${key}]`, schedule[key]);
        }
      })


      if(!!this.professionalId){
        //Edit Professional
        this.handleEditProfessionalMixinSubmit(formData,this.professionalId)
      }else if(!this.professionalId){
        //Add Professional
        this.handleAddProfessionalMixinSubmit(formData)
      }
    },
    handleFileUpload(event){
      this.file = event.target.files[0];
    },
    onWeekDaysChange(){
      this.workingSchedule.push({
        day:this.selectedWeekDay,
        startEndTime:[],
        type:'',
        professionalSchedule:this.professionalScheduleTypeArray
      })
      this.selectedWeekDay = ''
    },
    onCloseWeekDays(index){
      this.workingSchedule = this.workingSchedule.filter((_,i) => i !== index)
    }
  }
}
</script>

<style scoped>

</style>
