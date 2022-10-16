
export const fetchBusinessById =  {
  data(){
    return{
      isLoading:false,
      apiData:{},
      id:1,
    }
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (!this.apiData || this.$route.params.business !== this.id) { //This.id is the id stored in cookies
      this.$fetch()
    }
  },
  async fetch() {
    this.isLoading = true
    try{
      let response = await this.$axios.get(`https://jsonplaceholder.typicode.com/todos/${this.id}`)
      this.apiData = response?.data
    }
    catch (e){
      console.log(e,"1")
    }
    finally {
      this.isLoading = false
    }
  },
}
