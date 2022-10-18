import {businessIdFromURL} from "~/utils/helpers";

export const fetchBusinessSchedule =  {
  data(){
    return{
      businessSchedule:{},
    }
  },
  methods:{
    async fetchBusinessSchedule(){
      try{
        let response = await this.$api.get(`/business-setting/schedule/business?businessId=${businessIdFromURL(this)}`)
        this.businessSchedule = response?.data?.data?.workingSchedule?.[0]
      }
      catch (e) {
        console.log(e, "1")
      }
    }
  }
  // multiple components can return the same `fetchKey` and Nuxt will track them both separately
}
