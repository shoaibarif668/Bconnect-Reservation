import {businessIdFromURL, viewError} from "~/utils/helpers";

export const handleAddPromoCode =  {
  data(){
    return{
      isHandleAddPromoCodeLoading : false,
      handleAddPromoCodeError: ''
    }
  },
  methods:{
    async handleAddPromoCodeMixinSubmit(data) {
      this.isHandleAddPromoCodeLoading = true
      this.handleAddPromoCodeError = false
      this.$api.post(`/business-setting/promo-code?businessId=${businessIdFromURL(this)}`,data)
        .then(()=>{
          this.$emit('handle-add-promo-codes',false)
          this.$emit('confirm-promo-code-added')
        })
        .catch((e)=>{
          this.handleAddPromoCodeError = viewError(e)
        })
        .finally(()=>{
          this.isHandleAddPromoCodeLoading = false
        })
    },
  }
}
