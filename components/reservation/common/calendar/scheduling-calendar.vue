<template>
  <vue-cal
    :disable-views="['years', 'year', 'month','week']"
    active-view="day"
    class="!h-fit"
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
</template>
<!--editable-events-->
<script>
import VueCal from 'vue-cal'

export default {
  name: "scheduling-calendar",
  components:{VueCal},
  props:{
    customDaySplitLabels:{
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
      required:true,
      default:()=>{}
    },
  },
  data() {
    return{
      tomorrowsDate:new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      events:this.existingEvents,
      newEvent:{},
    }
  },
  methods:{
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
      if(this.events?.length > 0){
        for(let i=0;i<this.events.length;i++){
          //Don't Check If It is the same booking
          if(this.events[i]?.serviceId === this.currentService?._id){
            continue
          }
          //(StartA <= EndB) and (EndA >= StartB)
          if((new Date(startingDate).getTime() < new Date(this.events[i]?.end).getTime()) && (new Date(endingDate).getTime() > new Date(this.events[i]?.start).getTime()) && e.split === this.events[i].split){
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
        this.events.pop()
      }



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
        serviceId: this.currentService?._id
      }

      this.events.push(this.newEvent)
      this.$emit('handle-event-push',this.newEvent,'add')
    },
  }
}
</script>

<style scoped>


</style>
