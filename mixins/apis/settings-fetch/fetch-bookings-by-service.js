import {businessIdFromURL, dateFromUsersTimezone} from "~/utils/helpers";

export const fetchBookingsByService =  {
  data(){
    return{
      businessBookingsByService:[],
      isFetchBookingsByServiceLoading:false
    }
  },
  methods:{
    async fetchBusinessBookingsByService(serviceId){
      try{
        this.isFetchBookingsByServiceLoading = true
        let response = await this.$api.get(`/booking/business/service?businessId=${businessIdFromURL(this)}&serviceId=${serviceId}&page=1&limit=99`)
        this.businessBookingsByService = response?.data?.data?.map(el=>{
          return {
            start:new Date(dateFromUsersTimezone(el?.startDateTime) ? dateFromUsersTimezone(el?.startDateTime) : new Date()).format('YYYY-MM-DD HH:mm'),
            end:new Date(dateFromUsersTimezone(el?.endDateTime) ? dateFromUsersTimezone(el?.endDateTime) : new Date()).format('YYYY-MM-DD HH:mm'),
            title:'Booked',
            class:'booked',
            background: true,
            deletable: false,
            resizable: false,
            split:+this.businessProfessionalsByService?.map((el,i)=>{
              return {
                label: el?.name,
                _id: el?._id,
                color: Math.floor(Math.random()*16777215)?.toString(16),
                class: `split${i+1}`
              }
            }).find(innerEl=>innerEl?._id===el?.professional?._id)?.class?.split('split')[1]
          }
        })
      }
      catch (e) {
        console.log(e, "1")
      }
      finally {
        this.isFetchBookingsByServiceLoading = false
      }
    }
  }
  // multiple components can return the same `fetchKey` and Nuxt will track them both separately
}
