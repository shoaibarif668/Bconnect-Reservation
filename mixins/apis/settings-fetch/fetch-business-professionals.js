import {businessIdFromURL} from "~/utils/helpers";

export const fetchBusinessProfessionals =  {
  data(){
    return{
      businessProfessionals:[],
    }
  },
  methods:{
    async fetchBusinessProfessionals(){
      try{
        let response = await this.$api.get(`/professional/business?businessId=${businessIdFromURL(this)}&page=1&limit=99`)
        this.businessProfessionals = response?.data?.data
      }
      catch (e) {
        console.log(e, "1")
      }
    }
  }
  // multiple components can return the same `fetchKey` and Nuxt will track them both separately
}
