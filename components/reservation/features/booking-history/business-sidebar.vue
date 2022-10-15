<template>
  <div class="bg-peach__bg w-full px-6 pt-10 pb-2.5 rounded-3xl max-h-[750px] h-full overflow-y-auto">
    <div class="mb-5 pb-5 border-b border-dark__blue__cl flex flex-col gap-2.5">
      <base-button :click-handler="()=>$router.push(`/reservation/asd${routes.MANAGE_CLIENTS}`)" custom-classes="flex items-center gap-2 justify-center" :custom-classes="$route.fullPath === `/reservation/asd${routes.MANAGE_CLIENTS}` ? '!bg-white text-blue__cl' : ''">
        <font-awesome-icon :icon="['fa','user-plus']"/>
        <span>Add Client</span>
      </base-button>
      <base-button :click-handler="()=>$router.push(`/reservation/asd${routes.MANAGE_PROFESSIONALS}`)" custom-classes="flex items-center gap-2 justify-center" :custom-classes="$route.fullPath === `/reservation/asd${routes.MANAGE_PROFESSIONALS}` ? '!bg-white text-blue__cl' : ''">
        <font-awesome-icon :icon="['fa','user-plus']"/>
        <span>Add Professional</span>
      </base-button>
    </div>
    <h5 class="text-dark__blue__cl text-center pb-5 text-lg ">Upcoming Appointments</h5>
    <div class="flex flex-col items-center gap-5">
      <booking-card image="https://placebeard.it/640x360" :price="120" professional="Aly" timing="12:00-13:00" :services="['Nail Art','Styling']"/>
      <booking-card image="https://placebeard.it/640x360" :price="120" professional="Aly" timing="12:00-13:00" :services="['Nail Art','Styling']"/>
      <booking-card image="https://placebeard.it/640/360" :price="120" professional="Aly" timing="12:00-13:00" :services="['Nail Art','Styling']"/>
      <booking-card image="https://placebeard.it/640/360" :price="120" professional="Aly" timing="12:00-13:00" :services="['Nail Art','Styling']"/>
      <booking-card image="https://placebeard.it/640/360" :price="120" professional="Aly" timing="12:00-13:00" :services="['Nail Art','Styling']"/>
    </div>
  </div>
</template>

<script>
import BaseButton from "~/components/reservation/common/buttons/base-button";
import BookingCard from "~/components/reservation/common/cards/booking-card";
import {ROUTES} from "~/utils/constants/routes";

export default {
  name: "business-sidebar",
  components: {BookingCard, BaseButton},
  data() {
    return {
      routes: ROUTES,
    }
  }
}
</script>

