<template>
  <edit-modal :title="`Issue A Promo Code For ${currentSelectedClient && currentSelectedClient.userName}`" @close="$emit('handle-issue-promo-code',false)" :show-modal="showIssuePromoCodeModal">
    <form class="flex flex-col gap-5 items-center w-full text-center" slot="form" @submit.prevent="handleIssuePromoCodeToClientSubmit">
      <select
        class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
        v-model="promoCodeId"
        required
      >
        <option value="" disabled selected>Select A Promo Code</option>
        <option
          v-for="option in promoCodes"
          :value="option._id"
          :key="option._id"
          :selected="option._id === promoCodeId"
        >{{ `${option.name} | ${option.discount}% Discount` }}</option>
      </select>

      <base-button is-submit-type custom-classes="w-full max-w-[400px] mt-5" v-if="!isHandleIssuePromoCodeLoading">
        Issue Discount
      </base-button>
      <primary-loader :is-loading="isHandleIssuePromoCodeLoading"/>
      <error-message :is-error="!!handleIssuePromoCodeError" :message="handleIssuePromoCodeError"/>
    </form>
  </edit-modal>
</template>

<script>
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BaseInput from "~/components/reservation/common/form/base-input";
import ErrorMessage from "~/components/reservation/common/messages/error-message";
import EditModal from "~/components/reservation/common/modal/edit-modal";
import PromoCodeCard from "~/components/reservation/common/cards/promo-code-card";
import PrimaryLoader from "~/components/reservation/common/loaders/primary-loader";
import {handleIssuePromoCode} from "~/mixins/apis/settings/handle-issue-promo-code";

export default {
  name: "issue-promo-code-modal",
  components: {PrimaryLoader, PromoCodeCard, EditModal, ErrorMessage, BaseInput, BaseButton},
  mixins:[handleIssuePromoCode],
  props:{
    showIssuePromoCodeModal:{
      type:Boolean
    },
    promoCodes:{
      type:Array
    },
    currentSelectedClient:{
      type:Object
    }
  },
  data(){
    return{
      promoCodeId:""
    }
  },
  methods: {
    handleIssuePromoCodeToClientSubmit(){
        this.handleAddPromoCodeMixinSubmit(this.currentSelectedClient?._id,this.promoCodeId)
    },
  }
}
</script>

<style scoped>

</style>
