<template>
  <base-modal v-if="showModal" :modal-active="showModal" @close="$emit('close',false)">
    <div slot="body" class="flex gap-32">
      <div class="w-full">
        <h1 class="text-blue__cl pb-10 text-3xl font-bold pt-10">{{title}}</h1>
        <slot name="form"/>
      </div>
      <slot name="image"/>
    </div>
  </base-modal>
</template>

<script>
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BaseModal from "~/components/reservation/common/modal/base-modal";
export default {
  name: "auth-modal",
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
  }
}
</script>

