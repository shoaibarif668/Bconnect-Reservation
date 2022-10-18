import {businessIdFromURL, viewError} from "~/utils/helpers";

export const fetchBusinessSchedule =  {
  data(){
    return{
      businessSchedule:{},
      handleBusinessScheduleError:''
    }
  },
  methods:{
    async fetchBusinessSchedule(){
      this.handleBusinessScheduleError = ''
      try{
        let response = await this.$api.get(`/business-setting/schedule/business?businessId=${businessIdFromURL(this)}`)
        this.businessSchedule = response?.data?.data?.workingSchedule?.[0]
      }
      catch (e) {
        this.handleBusinessScheduleError = viewError(e)
      }
    }
  }
  // multiple components can return the same `fetchKey` and Nuxt will track them both separately
}
