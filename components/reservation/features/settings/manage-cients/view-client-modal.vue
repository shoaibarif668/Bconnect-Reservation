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
        <div class="mt-2.5">
          <base-table :headers="tableHeaders">
            <tbody class="bg-white divide-y divide-gray-300 p-5" slot="table__body">
            <tr v-for="(data,index) in bookings" :key="data._id" v-if="(bookings && bookings.length > 0)">
              <td
                class="p-5 font-normal text-dark__blue__cl text-center border-r border-color-[#ECECEC] whitespace-nowrap"
              >
                {{ index+1 }}
              </td>
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
                <div  v-if="loggedInUserRole === roles.BUSINESS">
                  <dropdown>
                    <template #toggler>
                      <button
                        class="relative flex items-center focus:outline-none text-primary__color font-normal text-lg"
                      >
                        <span></span>
                        <font-awesome-icon class="text-blue__cl font-bold text-2xl" :icon="['fa','ellipsis']" />
                      </button>
                    </template>
                    <dropdown-content>
                      <dropdown-item custom-class="border-b pb-1.5" is-button :click-handler="()=>$router.push(`/reservation/${businessIdUrl}${routes.MANAGE_CLIENTS}?q=${data.customer ? data.customer._id : ''}`)" :loader="false">View Client Details</dropdown-item>
                      <dropdown-item :custom-class="data.status !== 'Canceled' ? 'border-b pb-1.5' : ''" is-button :click-handler="()=>$router.push(`/reservation/${businessIdUrl}${routes.MANAGE_PROFESSIONALS}?q=${data.professional ? data.professional._id : ''}`)" :loader="false">View Professional</dropdown-item>
                      <dropdown-item v-if="data.status !== 'Canceled' && data.service" custom-class="border-b pb-1.5" is-button :click-handler="()=>handleRescheduleBooking(true,data._id,data.service)" :loader="false">Reschedule Booking</dropdown-item>
                      <dropdown-item v-if="data.status !== 'Canceled'" is-button :click-handler="()=>handleCancelBookingMixinSubmit(data._id)" :loader="isHandleCancelBookingLoading">Cancel Booking</dropdown-item>

                    </dropdown-content>
                  </dropdown>
                </div>
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

export default {
  name: "view-client-modal",
  components: {BaseTable, EditModal},
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
