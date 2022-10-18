import {businessIdFromURL} from "~/utils/helpers";

export const fetchPromoCodes =  {
  data(){
    return{
      promoCodes:[],
    }
  },
  methods:{
    async fetchPromoCodes(){
      try{
        let response = await this.$api.get(`/business-setting/promo-code/business?businessId=${businessIdFromURL(this)}&page=1&limit=99`)
        this.promoCodes = response?.data?.data
      }
      catch (e) {
        console.log(e, "1")
      }
    }
  }
  // multiple components can return the same `fetchKey` and Nuxt will track them both separately
}
