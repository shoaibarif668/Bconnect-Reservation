<template>
  <div v-if="tomorrowsDate" class="w-full">
    <vue-cal
      :disable-views="['years', 'year', 'month','week']"
      :hideWeekdays="unAvailableWorkingDays"
      active-view="day"
      :time-step="30"
      :twelveHour="true"
      :time-to="time.endTime * 60"
      :time-from="time.startTime * 60"
      class="!h-fit"
      :min-date="tomorrowsDate"
      :events="computedEvents"
      :no-event-overlaps="true"
      @cell-click="onCellClick"
      @view-change="onViewChange"
      :split-days="customDataSplitLabels"
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
  </div>
</template>
<!--editable-events-->
<script>
import VueCal from 'vue-cal'
import {PROFESSIONAL_SCHEDULE} from "~/utils/constants";

export default {
  name: "scheduling-calendar",
  components:{VueCal},
  props:{
    professionalsByService:{
      type:Array,
      required:true,
      default:[]
    },
    existingEvents:{
      type:Array,
      required:true,
      default:[]
    },
    isEditable:{
      type:Boolean,
      default:false
    },
    currentService:{
      type:Object,
      default:()=>{}
    },
    businessSchedule:{
      type:Array,
    },
  },
  data() {
    return{
      currentCalDate:new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      events:this.existingEvents,
      newEvent:{},
      weekDaysByNumber:{
        0:'Sunday',
        1:'Monday',
        2:'Tuesday',
        3:'Wednesday',
        4:'Thursday',
        5:'Friday',
        6:'Saturday'
      },
      weekDaysByName:{
        'Monday':1,
        'Tuesday':2,
        'Wednesday':3,
        'Thursday':4,
        'Friday':5,
        'Saturday':6,
        'Sunday':7,
      },
      weekDaysByNameArray:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    }
  },
  computed:{
    tomorrowsDate(){
      let localUnAvailableWorkingDays = this.unAvailableWorkingDays.map(el=>el === 7 ? 0 : el)
      let completeWeekDaysKeys = Object.keys(this.weekDaysByNumber)
      let tomorrow = ''
      for(let i=0;i<completeWeekDaysKeys.length;i++){
        if(!localUnAvailableWorkingDays.includes(new Date(new Date().getTime() + (24 * 60 * 60 * 1000)*(i+1)).getDay())){
          tomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)*(i+1))
          break
        }
      }
      this.currentCalDate = tomorrow
      return tomorrow
    },
    customDataSplitLabels(){
      return this.professionalsByService?.map((el,i)=>{
        return {
          label: el?.name,
          _id: el?._id,
          color: Math.floor(Math.random()*16777215)?.toString(16),
          schedule:el?.schedule,
          class: `split${i+1}`
        }
      })
    },
    computedEvents(){
      this.events = this.existingEvents

      return this.events
    },
    currentCalDay(){
      return this.weekDaysByNumber?.[this.currentCalDate?.getDay()]
    },
    time(){
      let startTime = this.businessSchedule?.find(el=>el?.day===this.currentCalDay)?.startTime
      let endTime = this.businessSchedule?.find(el=>el?.day===this.currentCalDay)?.endTime
      let startTimeEnd = (+startTime?.split(":")[1])/60
      let endTimeEnd = (+endTime?.split(":")[1])/60

      return {
        startTime:(+startTime?.split(":")[0])+startTimeEnd,
        endTime:(+endTime?.split(":")[0])+endTimeEnd
      }
    },
    unAvailableWorkingDays(){
      let currentDays = this.businessSchedule?.map(el=>el?.day)
      return this.weekDaysByNameArray?.filter(el=>!currentDays?.includes(el))?.map(el=>this.weekDaysByName[el])
    }
  },
  methods:{
    unavailableSlots(){
      let dataSplits = this.professionalsByService?.map((el,i)=>{
        return {
          label: el?.name,
          _id: el?._id,
          color: Math.floor(Math.random()*16777215)?.toString(16),
          schedule:el?.schedule,
          class: `split${i+1}`
        }
      })


      for(let i=0;i<dataSplits?.length;i++){
        for(let j=0;j<dataSplits[i]?.schedule?.length;j++){
          let professionalSchedule = dataSplits[i]?.schedule[j]
          let businessSchedule = this.businessSchedule?.find(el=>el?.day === this.currentCalDay) //=dataSplits[i]?.schedule[j]?.day
          let professionalWorkScheduleToday = dataSplits[i]?.schedule.find(el=>(el?.day===this.currentCalDay && el?.type === PROFESSIONAL_SCHEDULE.WORK))
          let professionalBreakScheduleToday = dataSplits[i]?.schedule.filter(el=>(el?.day===this.currentCalDay && el?.type === PROFESSIONAL_SCHEDULE.BREAK))

          //If Professional Is Available Today

          if(!!dataSplits[i]?.schedule.find(el=>el?.day===this.currentCalDay)){
            if(professionalSchedule?.type === PROFESSIONAL_SCHEDULE.WORK){

              //If the professional start their shift after the business's start time unavailable every slot before that
              if(professionalWorkScheduleToday?.startTime>businessSchedule?.startTime){

                let unAvailableSlot = {
                  start: `${this.currentCalDate.getFullYear()}-${(this.currentCalDate.getMonth()+1)}-${this.currentCalDate.getDate()} ${businessSchedule?.startTime}`, //Business's Start Time
                  end: `${this.currentCalDate.getFullYear()}-${(this.currentCalDate.getMonth()+1)}-${this.currentCalDate.getDate()} ${professionalWorkScheduleToday?.startTime}`, //Professional's Start Time
                  title: 'Unavailable',
                  class:'lunch',
                  background: true,
                  deletable: false,
                  resizable: false,
                  split: +dataSplits[i]?.class?.split("split")[1],
                }
                this.events.push(unAvailableSlot)

              }
              //If the professional end their shift before the business's end time unavailable every slot after that
              if(professionalWorkScheduleToday?.endTime<businessSchedule?.endTime){
                let unAvailableSlot = {
                  start: `${this.currentCalDate.getFullYear()}-${(this.currentCalDate.getMonth()+1)}-${this.currentCalDate.getDate()} ${professionalWorkScheduleToday?.endTime}`, //Professional's End Time
                  end: `${this.currentCalDate.getFullYear()}-${(this.currentCalDate.getMonth()+1)}-${this.currentCalDate.getDate()} ${businessSchedule?.endTime}`, //Business's End Time
                  title: 'Unavailable',
                  class:'lunch',
                  background: true,
                  deletable: false,
                  resizable: false,
                  split:+dataSplits[i]?.class?.split("split")[1],
                }
                this.events.push(unAvailableSlot)
              }
            }else if(professionalSchedule?.type === PROFESSIONAL_SCHEDULE.BREAK){
              //If Break is in between work hours
              if(professionalBreakScheduleToday?.startTime > professionalWorkScheduleToday?.startTime && professionalBreakScheduleToday?.endTime < professionalWorkScheduleToday?.endTime){
                if(professionalBreakScheduleToday?.length <= 0){
                  continue
                }
                professionalBreakScheduleToday?.forEach((el)=>{
                  let unAvailableSlot = {
                    start: `${this.currentCalDate.getFullYear()}-${(this.currentCalDate.getMonth()+1)}-${this.currentCalDate.getDate()} ${el?.startTime}`, //Professional's Break Start Time
                    end: `${this.currentCalDate.getFullYear()}-${(this.currentCalDate.getMonth()+1)}-${this.currentCalDate.getDate()} ${el?.endTime}`, //Professional's Break End Time
                    title: 'Break',
                    class:'lunch',
                    background: true,
                    deletable: false,
                    resizable: false,
                    split:+dataSplits[i]?.class?.split("split")[1],
                  }
                  this.events.push(unAvailableSlot)
                })
              }


              // console.log(professionalSchedule,"professionalSchedule")
              // console.log(businessSchedule,"businessSchedule")
            }
          }
          else{
            let unAvailableSlot = {
              start: `${this.currentCalDate.getFullYear()}-${(this.currentCalDate.getMonth()+1)}-${this.currentCalDate.getDate()} ${businessSchedule?.startTime}`, //Business's Start Time
              end: `${this.currentCalDate.getFullYear()}-${(this.currentCalDate.getMonth()+1)}-${this.currentCalDate.getDate()} ${businessSchedule?.endTime}`, //Business's End Time
              title: 'Unavailable',
              class:'lunch',
              background: true,
              deletable: false,
              resizable: false,
              split: +dataSplits[i]?.class?.split("split")[1],
            }
            this.events.push(unAvailableSlot)
          }
        }
      }
      return true
    },
    onViewChange(e){
      this.currentCalDate = new Date(e?.endDate)
      this.unavailableSlots()
    },
    onCellClick(e){
      if(!this.isEditable){
        return
      }
      const date = new Date(e.date)
      //If the user's date is greater than the selected date, then event is in the past.
      let startingDate = ''
      let endingDate =  ''

      if(this.currentService?.durationEnding === 30){
        if(date.getMinutes() <= 30){
          startingDate =  `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()} ${date.getHours()}:00`
          endingDate =  `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()} ${date.getHours()}:30`
        }else if(date.getMinutes() > 30){
          startingDate =  `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()} ${date.getHours()}:30`
          endingDate =  `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()} ${date.getHours()+1}:00`
        }
      }else if(this.currentService?.durationEnding === 60){
        if(date.getMinutes() < 30){
          startingDate =  `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()} ${date.getHours()}:00`
          endingDate =  `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()} ${date.getHours()+1}:00`
        }else if(date.getMinutes() >= 30){
          startingDate =  `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()} ${date.getHours()}:30`
          endingDate =  `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()} ${date.getHours()+1}:30`
        }
      }

      //Please refer to: https://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
      if(this.computedEvents?.length > 0){
        for(let i=0;i<this.computedEvents.length;i++){
          //Don't Check If It is the same booking
          if(this.computedEvents[i]?.serviceId === this.currentService?._id){
            continue
          }
          //(StartA <= EndB) and (EndA >= StartB)
          if((new Date(startingDate).getTime() < new Date(this.computedEvents[i]?.end).getTime()) && (new Date(endingDate).getTime() > new Date(this.computedEvents[i]?.start).getTime()) && e.split === this.computedEvents[i].split){
            alert('Your Booking Is Overlapping With Another Booking')
            return false
          }
        }
      }

      //If service id is not equals to id inside newEvent, this means service has changed and booking can be continued.
      if(this.newEvent?.serviceId && this.newEvent?.serviceId !== this.currentService?._id){
        this.newEvent = {}
      }

      if(this.newEvent?.serviceId && this.newEvent?.serviceId === this.currentService?._id){
        //Remove If An Event Was Already Booked Before In Current Session
        this.$emit('handle-event-push',{},'remove')
        // this.events = this.events.filter((element, index) => index < this.events.length - 1);
        this.events.pop()
      }

      let bookedProfessional = this.customDataSplitLabels.find(el=>+(el?.class?.split("split")[1]) === e.split)

      //Book A New Event
      this.newEvent = {
        start: startingDate,
        end: endingDate,
        title: this.currentService?.name,
        class: 'newService',
        background: true,
        deletable: false,
        resizable: false,
        split: e.split,
        professionalId:bookedProfessional?._id,
        professionalName:bookedProfessional?.label,
        serviceId: this.currentService?._id
      }
      this.events.push(this.newEvent)
      // this.events = [...this.events,this.newEvent]
      this.$emit('handle-event-push',this.newEvent,'add')
    },
  }
}
</script>

