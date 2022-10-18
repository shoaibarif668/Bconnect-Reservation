import {businessIdFromURL, viewError} from "~/utils/helpers";

export const handleCreateBooking =  {
  data(){
    return{
      isHandleCreateBookingLoading : false,
      handleCreateBookingError: '',
    }
  },
  methods:{
    async handleCreateBookingMixinSubmit(data,clientId) {
      this.isHandleCreateBookingLoading = true
      this.handleCreateBookingError = false
      this.$api.post(`/booking?businessId=${businessIdFromURL(this)}&customerId=${clientId}`, {bookings:data})
        .then(()=>{
          this.$emit('handle-confirm-booking',false)
          this.$emit('handle-confirm-completed')
        })
        .catch((e)=>{
          this.handleCreateBookingError = viewError(e)
        })
        .finally(()=>{
          this.isHandleCreateBookingLoading = false
        })
    },
  }
}
