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
    }
  },
  data() {
    return{
      tomorrowsDate:new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      events:this.existingEvents
    }
  },
  methods:{
    onCellClick(e){
      if(!this.isEditable){
        return
      }
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
      this.$emit('handle-event-push',{})
    },
  }
}
</script>

<style scoped>


</style>
