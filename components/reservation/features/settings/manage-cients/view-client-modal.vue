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
        <primary-loader :is-loading="$fetchState.pending"/>
        <div class="mt-2.5" v-if="!($fetchState.pending) || (previousBookings && previousBookings.length > 0)">
          <h2 class="text-dark__blue__cl text-2xl font-bold text-center pb-2.5">Recent Bookings</h2>
          <base-table :headers="tableHeaders">
            <tbody class="bg-white divide-y divide-gray-300 p-5" slot="table__body">
            <tr v-for="(data,index) in previousBookings" :key="data._id">
              <td
                class="p-5 font-normal text-dark__blue__cl text-center border-r border-color-[#ECECEC] whitespace-nowrap"
              >
                {{ `${data.startDate && data.startDate}` }}
              </td>
              <td
                class="p-5 font-normal text-dark__blue__cl text-center border-r border-color-[#ECECEC] whitespace-nowrap"
              >
                {{ `${!!(data.startTime && data.endTime) && data.startTime} - ${data.endTime }` }}
              </td>
              <td
                class="p-5 font-normal text-dark__blue__cl text-center border-r border-color-[#ECECEC] whitespace-nowrap"
              >
                {{ data.service ? data.service.name : ' - ' }}
              </td>
              <td
                class="p-5 font-normal text-center border-r border-color-[#ECECEC] whitespace-nowrap"
                :style="`color: #${Math.floor(Math.random()*16777215).toString(16)}`"
              >
                {{ data.professional ? data.professional.name : ' - ' }}
              </td>
              <td
                class="p-5 font-normal text-center border-r border-color-[#ECECEC] whitespace-nowrap"
                :style="`color: #${Math.floor(Math.random()*16777215).toString(16)}`"
              >
                {{ data.customer ? data.customer.userName : ' - ' }}
              </td>
              <td
                class="p-5 font-normal text-dark__blue__cl text-center border-r border-color-[#ECECEC] whitespace-nowrap flex items-center justify-between gap-2.5"
              >
                {{ data.status}}
              </td>
            </tr>
            </tbody>
          </base-table>
        </div>
    </div>
  </edit-modal>
</template>

<script>
import EditModal from "~/components/reservation/common/modal/edit-modal";
import {handleDeletePromoCode} from "~/mixins/apis/settings/handle-delete-promo-code";
import {MEDIA_BASEURL} from "~/utils/constants";
import BaseTable from "@/components/reservation/common/tables/base-table";
import {fetchClientPreviousBookings} from "@/mixins/apis/settings-fetch/fetching-client-previous-bookings";
import PrimaryLoader from "@/components/reservation/common/loaders/primary-loader";

export default {
  name: "view-client-modal",
  components: {PrimaryLoader, BaseTable, EditModal},
  mixins:[handleDeletePromoCode,fetchClientPreviousBookings],
  props:{
    showViewClientModal:{
      type:Boolean
    },
    clientDetail:{
      type:Object
    }
  },
  activated() {
    if (this.$fetchState.timestamp <=  Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch() {
    await this.fetchClientPreviousBookingsService(this.clientDetail?._id)
  },
  data(){
    return{
      mediaBaseUrl:MEDIA_BASEURL,
      tableHeaders:['Date','Time','Services','Provider','Name','Status'],
      previousBookings:[]
    }
  }
}
</script>
