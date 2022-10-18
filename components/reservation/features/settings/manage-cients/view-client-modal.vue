<template>
  <edit-modal :title="clientDetail && clientDetail.userName" @close="$emit('handle-view-client',false)" :show-modal="showViewClientModal">
    <div class="flex flex-col gap-5 items-center w-full text-center" slot="form">
        <div class="flex justify-center mb-2.5">
          <img class="max-w-[120px] w-full object-contain" :src="`${mediaBaseUrl}${clientDetail && clientDetail.profilePicture}`" :alt="clientDetail && clientDetail.userName"/>
        </div>
        <div class="flex items-center flex-col w-full max-w-[400px] gap-2.5">
          <h2 class="text-dark__blue__cl text-lg">Email: <span class="font-bold">{{clientDetail && clientDetail.email}}</span></h2>
          <h2 class="text-dark__blue__cl text-lg">Joined: <span class="font-bold">{{new Date(clientDetail ? clientDetail.createdAt : new Date()).toDateString()}}</span></h2>
          <h2 class="text-dark__blue__cl text-lg"> Phone Number: <span class="font-bold">{{clientDetail && clientDetail.phoneNumber}}</span></h2>
        </div>
    </div>
  </edit-modal>
</template>

<script>
import EditModal from "~/components/reservation/common/modal/edit-modal";
import {handleDeletePromoCode} from "~/mixins/apis/settings/handle-delete-promo-code";
import {MEDIA_BASEURL} from "~/utils/constants";

export default {
  name: "view-client-modal",
  components: {EditModal},
  mixins:[handleDeletePromoCode],
  props:{
    showViewClientModal:{
      type:Boolean
    },
    clientDetail:{
      type:Object
    }
  },
  data(){
    return{
      mediaBaseUrl:MEDIA_BASEURL
    }
  }
}
</script>
