import {businessIdFromURL} from "@/utils/helpers";
import TokenService from "@/services/token.service";

export const fetchBusinessById =  {
  data(){
    return{
      businessData:{},
    }
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (!this.businessData?.id || this.$route.params.business !== TokenService.getBusiness(this.$cookies).id) { //This.id is the id stored in cookies
      this.$fetch()
    }
  },
  async fetch() {
    try{
      let response = await this.$axios.get(`https://api.bconnect-staging.com/api/fetch-business/${businessIdFromURL(this)}`)
      this.businessData = response?.data?.business
      console.log(this,"this")
      if(!this.businessData?.id){
        TokenService.clearStorage(this.$cookies)
        return this.$nuxt.error({ statusCode: 404, message: 'The Business You Are Trying To Access Does Not Exists' })
      }
      TokenService.setBusiness(this.businessData,this.$cookies)
    }
    catch (e){
      console.log(e,"1")
    }
  },
}
