<template>
  <edit-modal title="Add Promo Code Or Discount" @close="$emit('handle-add-promo-codes',false)" :show-modal="showAddPromoCodesModal">
    <form class="flex flex-col gap-5 items-center w-full text-center" slot="form" @submit.prevent="handleAddPromoCodeSubmit">
      <input
        class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
        v-model="fieldsData.name"
        placeholder="Title"
        type="text"
        required
      />
      <textarea
        class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
        v-model="fieldsData.description"
        placeholder="Description"
        rows="3"
        required
      />
      <input
        class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
        v-model="fieldsData.discount"
        placeholder="Discount (%)"
        type="number"
        required
      />
      <div class="w-full text-left max-w-[400px]">
        <date-picker
          type="datetime"
          :time-picker-options="{start: '00:00',step: '01:00',end: '23:59',}"
          range
          v-model="fieldsData['startEndTime']"
          format="YYYY-MM-DD hh:mm a"
          valueType="format"
          placeholder="Select Date & Time Range For Expiry"
        ></date-picker>
      </div>

      <base-button is-submit-type custom-classes="w-full max-w-[400px] mt-5" v-if="!isHandleAddPromoCodeLoading">
        Add Promo Code
      </base-button>
      <primary-loader :is-loading="isHandleAddPromoCodeLoading"/>
      <error-message :is-error="!!handleAddPromoCodeError" :message="handleAddPromoCodeError"/>
      <error-message :is-error="!!validationError" :message="validationError"/>
    </form>
  </edit-modal>
</template>

<script>
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BaseInput from "~/components/reservation/common/form/base-input";
import PrimaryLoader from "~/components/reservation/common/loaders/primary-loader";
import ErrorMessage from "~/components/reservation/common/messages/error-message";
import EditModal from "~/components/reservation/common/modal/edit-modal";
import {handleAddPromoCode} from "~/mixins/apis/settings/handle-add-promo-code";

export default {
  name: "add-promo-code",
  components: {EditModal, ErrorMessage, PrimaryLoader, BaseInput, BaseButton},
  mixins:[handleAddPromoCode],
  props:{
    showAddPromoCodesModal:{
      type:Boolean
    }
  },
  data() {
    return{
      validationError:'',
      fieldsData:{
        name:'',
        description:'',
        discount:'',
        startEndTime:[]
      }
    }
  },
  methods: {
    handleAddPromoCodeSubmit(){
      this.validationError = ''
      if(this.fieldsData.discount <= 0 || this.fieldsData.discount > 100){
        this.validationError = 'Discount Percentage Should Be Under 100'
        return
      }
      if(!this.fieldsData.startEndTime?.[0] || !this.fieldsData.startEndTime?.[1]){
        this.validationError = 'Please Select An Expiry Date Range To Continue'
        return
      }
      console.log(this.fieldsData,"1 test");
      const submitData = {
        ...this.fieldsData,
        startDateTime:new Date(this.fieldsData.startEndTime?.[0]).toISOString() || null,
        endDateTime:new Date(this.fieldsData.startEndTime?.[1]).toISOString() || null
      }
      this.handleAddPromoCodeMixinSubmit(submitData)
    },
  }
}
</script>

<style scoped>

</style>
