
export const fetchBusinessServices =  {
  data(){
    return{
      businessServices:{},
    }
  },
  activated() {
    if (this.$fetchState.timestamp <=  Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch() {
    try{
      let response = await this.$resAxios.get(`/service/all?businessId=1&page=1&limit=99`)
      this.businessServices = response?.data
    }
    catch (e) {
      console.log(e, "1")
    }
  }
  // multiple components can return the same `fetchKey` and Nuxt will track them both separately
}
