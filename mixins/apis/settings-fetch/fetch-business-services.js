import {businessIdFromURL} from "~/utils/helpers";

export const fetchBusinessServices =  {
  data(){
    return{
      businessServices:{},
    }
  },
  methods:{
    async fetchBusinessServiceService(){
      try{
        let response = await this.$api.get(`/service/all?businessId=${businessIdFromURL(this)}&page=1&limit=99`)
        this.businessServices = response?.data
      }
      catch (e) {
        console.log(e, "1")
      }
    }
  }
}
