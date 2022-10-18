import {businessIdFromURL, viewError} from "~/utils/helpers";

export const handleDeletePromoCode =  {
  data(){
    return{
      isHandleDeletePromoCodeLoading : false,
    }
  },
  methods:{
    async handleAddPromoCodeMixinSubmit(promoCodeId) {
      this.isHandleDeletePromoCodeLoading = true

      this.$api.delete(`/business-setting/promo-code?businessId=${businessIdFromURL(this)}&promoCodeId=${promoCodeId}`)
        .then(()=>{
          this.$emit('confirm-promo-code-deleted')
        })
        .catch((e)=>{
          console.log(e,'1')
        })
        .finally(()=>{
          this.isHandleDeletePromoCodeLoading = false
        })
    },
  }
}
