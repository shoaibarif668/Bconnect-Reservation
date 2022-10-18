<template>
  <edit-modal title="Add A New Service" @close="$emit('handle-add-services',false)" :show-modal="showAddServicesModal">
    <form class="flex flex-col gap-5 items-center w-full text-center" slot="form" @submit.prevent="handleAddServicesSubmit">
      <select
        class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
        v-model="fieldsData.durationEnding"
        required
      >
        <option :value="0" disabled selected>Select Service Duration</option>
        <option
          v-for="option in [30,60]"
          :value="option"
          :key="option"
          :selected="option === fieldsData.durationEnding"
        >{{ `${option} min` }}</option>
      </select>
      <input
        class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
        v-model="fieldsData.name"
        placeholder="Service Name"
        type="text"
        required
      />
      <div class="w-full max-w-[400px]">
        <p class="text font-normal text-sm text-dark__blue__cl pb-2.5 text-left">Service Image:</p>
        <input
          type="file"
          accept="image/png, image/jpeg, 'image/jpg', 'image/*'"
          class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg max-w-[400px]"
          @change="handleFileUpload"
          required
        />
      </div>
      <base-button is-submit-type custom-classes="w-full max-w-[400px] mt-5" v-if="!isHandleAddServiceLoading">
        Add Service
      </base-button>
      <primary-loader :is-loading="isHandleAddServiceLoading"/>
      <error-message :is-error="!!handleAddServiceError" :message="handleAddServiceError"/>
    </form>
  </edit-modal>
</template>

<script>
import AuthModal from "~/components/reservation/common/modal/auth-modal";
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BaseInput from "~/components/reservation/common/form/base-input";
import PrimaryLoader from "~/components/reservation/common/loaders/primary-loader";
import ErrorMessage from "~/components/reservation/common/messages/error-message";
import EditModal from "~/components/reservation/common/modal/edit-modal";
import {handleAddService} from "~/mixins/apis/settings/handle-add-service";

export default {
  name: "add-services-modal",
  components: {EditModal, ErrorMessage, PrimaryLoader, BaseInput, BaseButton, AuthModal},
  mixins:[handleAddService],
  props:{
    showAddServicesModal:{
      type:Boolean
    }
  },
  data() {
    return{
      file: '',
      fieldsData:{
        name:'',
        durationStarting : 1,
        durationEnding : 0,
      }
    }
  },
  methods: {
    handleAddServicesSubmit(){
      let formData = new FormData()

      for ( let key in this.fieldsData ) {
        formData.delete(key);
      }
      formData.delete('media')

      //APPENDING DATA
      for ( let key in this.fieldsData ) {
        formData.append(key, this.fieldsData[key]);
      }
      formData.append('media',this.file)

      this.handleAddServiceMixinSubmit(formData)
    },
    handleFileUpload(event){
      this.file = event.target.files[0];
    }
  }
}
</script>

<style scoped>

</style>
