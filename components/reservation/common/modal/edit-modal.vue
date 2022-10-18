<template>
  <base-modal :base-modal-custom-class="baseModalCustomClass" v-if="showModal" :modal-active="showModal" @close="$emit('close',false)">
    <div slot="body">
      <div class="w-full flex flex-col items-center">
        <h1 class="text-blue__cl pb-10 text-center text-3xl font-bold pt-10">{{title}}</h1>
        <slot name="form"/>
      </div>
    </div>
  </base-modal>
</template>

<script>
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BaseModal from "~/components/reservation/common/modal/base-modal";
export default {
  name: "edit-modal",
  components: {BaseModal, BaseButton},
  props:{
    title:{
      type:String,
      required:true
    },
    showModal:{
      type:Boolean,
      required:true
    },
    baseModalCustomClass: {
      type:String
    }
  }
}
</script>

