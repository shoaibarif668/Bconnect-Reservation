<template>
  <edit-modal base-modal-custom-class="overflow-hidden min-h-screen h-full overflow-y-auto" title="Your Promo Codes" @close="$emit('handle-manage-promo-codes',false)" :show-modal="showManagePromoCodesModal">
    <div class="flex flex-col gap-5 items-center w-full text-center" slot="form">
      <div v-for="(code) in promoCodes" :key="code._id || ''" class="w-full">
        <promo-code-card
          :code="code"
          @handle-delete-promo-code="handleDeletePromoCode"
        />
      </div>

    </div>
  </edit-modal>
</template>

<script>
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BaseInput from "~/components/reservation/common/form/base-input";
import ErrorMessage from "~/components/reservation/common/messages/error-message";
import EditModal from "~/components/reservation/common/modal/edit-modal";
import {handleDeletePromoCode} from "~/mixins/apis/settings/handle-delete-promo-code";
import PromoCodeCard from "~/components/reservation/common/cards/promo-code-card";

export default {
  name: "manage-promo-codes",
  components: {PromoCodeCard, EditModal, ErrorMessage, BaseInput, BaseButton},
  mixins:[handleDeletePromoCode],
  props:{
    showManagePromoCodesModal:{
      type:Boolean
    },
    promoCodes:{
      type:Array
    }
  },
  methods: {
    handleDeletePromoCode(id){
      this.handleAddPromoCodeMixinSubmit(id)
    },
  }
}
</script>

<style scoped>

</style>
