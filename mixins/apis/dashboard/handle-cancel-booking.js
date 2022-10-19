
export const handleCancelBooking = {
  data(){
    return{
      isHandleCancelBookingLoading : false,
    }
  },
  methods:{
    async handleCancelBookingMixinSubmit(bookingId) {
      this.isHandleCancelBookingLoading = true
      this.$api.put(`/booking/cancel?bookingId=${bookingId}`)
        .then(()=>{
          this.$fetch()
        })
        .catch((e)=>{
          console.log(e,"1")
        })
        .finally(()=>{
          this.isHandleCancelBookingLoading = false
        })
    },
  }
}
