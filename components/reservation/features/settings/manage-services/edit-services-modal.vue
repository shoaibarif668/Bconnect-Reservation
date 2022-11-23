<template>
  <edit-modal :title="`Edit ${service.name || 'Service'}`" @close="$emit('handle-edit-services',false)" :show-modal="showEditServicesModal">
    <form class="flex flex-col gap-5 items-center w-full text-center" slot="form" @submit.prevent="handleEditServiceSubmit">
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
        />
        <div class="p-2.5 bg-gray-50" v-if="!!service.media || !!base64File">
          <img :src="`${!!base64File ? base64File : `${mediaBaseUrl}${service.media}`}`" :alt="fieldsData.name"/>
        </div>
      </div>
      <base-button is-submit-type custom-classes="w-full max-w-[400px] mt-5" v-if="!isHandleEditServiceLoading">
        Edit Service
      </base-button>
      <primary-loader :is-loading="isHandleEditServiceLoading"/>
      <error-message :is-error="!!handleEditServiceError" :message="handleEditServiceError"/>
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
import {handleEditService} from "~/mixins/apis/settings/handle-edit-service";
import {MEDIA_BASEURL} from "@/utils/constants";


export default {
  name: "edit-services-modal",
  components: {EditModal, ErrorMessage, PrimaryLoader, BaseInput, BaseButton, AuthModal},
  mixins:[handleEditService],
  props:{
    service:{
      type:Object,
      default:{}
    },
    showEditServicesModal:{
      type:Boolean
    }
  },
  data() {
    return{
      file: this.service?.media,
      base64File:"",
      fieldsData:{
        name:this.service?.name,
        durationStarting : 1,
        durationEnding : this.service?.durationEnding,
      },
      mediaBaseUrl:MEDIA_BASEURL
    }
  },
  methods: {
    handleEditServiceSubmit(){
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

      this.handleEditServiceMixinSubmit(formData,this.service?._id)
    },
    handleFileUpload(event){
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = () => {
        this.base64File = reader.result
      };
      this.file = event.target.files[0];
    }
  }
}
</script>

<style scoped>

</style>
