import {businessIdFromURL} from "~/utils/helpers";

export const fetchSearchClients =  {
  data(){
    return{
      isSearchedClientsLoading:false,
      searchedClientsList:[],
    }
  },
  methods:{
    async fetchSearchClientsService(searchQuery){
      this.isSearchedClientsLoading = true
      try{
        let response = await this.$api.get(`/customer/search?searchQuery=${searchQuery}&page=1&limit=99`)
        this.searchedClientsList = response?.data?.data
      }
      catch (e) {
        console.log(e, "1")
      }
      finally {
        this.isSearchedClientsLoading = false
      }
    }
  }
  // multiple components can return the same `fetchKey` and Nuxt will track them both separately
}
