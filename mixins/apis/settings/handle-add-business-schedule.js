import {businessIdFromURL, viewError} from "~/utils/helpers";

export const handleAddBusinessSchedule =  {
  data(){
    return{
      isHandleAddBusinessScheduleLoading : false,
      handleAddBusinessScheduleError: ''
    }
  },
  methods:{
    async handleAddBusinessScheduleMixinSubmit(data) {
      this.isHandleAddBusinessScheduleLoading = true
      this.handleAddBusinessScheduleError = false
      this.$api.post(`/business-setting/schedule?businessId=${businessIdFromURL(this)}`,{schedule:data})
        .then(()=>{
          this.$emit('handle-edit-working-schedule',false)
          this.$emit('confirm-business-schedule')
        })
        .catch((e)=>{
          this.handleAddBusinessScheduleError = viewError(e)
        })
        .finally(()=>{
          this.isHandleAddBusinessScheduleLoading = false
        })
    },
  }
}
