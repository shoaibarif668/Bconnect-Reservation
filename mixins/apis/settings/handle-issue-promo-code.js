import {businessIdFromURL, viewError} from "~/utils/helpers";

export const handleIssuePromoCode =  {
  data(){
    return{
      isHandleIssuePromoCodeLoading : false,
      handleIssuePromoCodeError: ''
    }
  },
  methods:{
    async handleAddPromoCodeMixinSubmit(customerId,promoCodeId) {
      this.isHandleIssuePromoCodeLoading = true
      this.handleIssuePromoCodeError = false
      this.$api.post(`/customer/issue-promo-code?businessId=${businessIdFromURL(this)}&customerId=${customerId}&promoCodeId=${promoCodeId}`)
        .then(()=>{
          this.$emit('handle-issue-promo-code',false)
          this.$emit('confirm-issue')
        })
        .catch((e)=>{
          this.handleIssuePromoCodeError = viewError(e)
        })
        .finally(()=>{
          this.isHandleIssuePromoCodeLoading = false
        })
    },
  }
}
