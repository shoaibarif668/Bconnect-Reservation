import {businessIdFromURL, viewError} from "~/utils/helpers";

export const handleRescheduleBooking =  {
  data(){
    return{
      isHandleRescheduleBookingLoading : false,
      handleRescheduleBookingError: '',
    }
  },
  methods:{
    async handleRescheduleBookingMixinSubmit(data,bookingId) {
      this.isHandleRescheduleBookingLoading = true
      this.handleRescheduleBookingError = false
      this.$api.put(`/booking?bookingId=${bookingId}`, data)
        .then(()=>{
          this.$emit('handle-reschedule-booking',false,"",{})
          this.$emit('handle-confirm-reschedule')
        })
        .catch((e)=>{
          this.handleRescheduleBookingError = viewError(e)
        })
        .finally(()=>{
          this.isHandleRescheduleBookingLoading = false
        })
    },
  }
}
