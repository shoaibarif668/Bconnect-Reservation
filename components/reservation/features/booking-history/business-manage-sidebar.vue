<template>
  <div class="bg-peach__bg w-full px-6 pt-10 pb-2.5 rounded-3xl max-h-[750px] h-full overflow-y-auto">
    <div class="mb-5 pb-5 border-b border-dark__blue__cl flex flex-col gap-2.5">
      <base-button :click-handler="()=>$router.push(`/reservation/${businessId()}${routes.MANAGE_CLIENTS}`)" custom-classes="flex items-center gap-2 justify-center" :custom-classes="$route.fullPath === `/reservation/${businessId()}${routes.MANAGE_CLIENTS}` ? '!bg-white text-blue__cl' : ''">
        <font-awesome-icon :icon="['fa','user-plus']"/>
        <span>Manage Client</span>
      </base-button>
      <base-button :click-handler="()=>$router.push(`/reservation/${businessId()}${routes.MANAGE_PROFESSIONALS}`)" custom-classes="flex items-center gap-2 justify-center" :custom-classes="$route.fullPath === `/reservation/${businessId()}${routes.MANAGE_PROFESSIONALS}` ? '!bg-white text-blue__cl' : ''">
        <font-awesome-icon :icon="['fa','user-plus']"/>
        <span>Manage Professional</span>
      </base-button>
    </div>
    <h5 class="text-dark__blue__cl text-center pb-5 text-lg ">{{title}}</h5>
    <div class="flex flex-col items-center gap-5">
      <div v-for="(card) in cardDetails" :key="card._id ? card._id : card.name" class="w-full">
        <user-card
          :image="card.image || ''"
          :name="card.name || ''"
          :days="card.days || ''"
          :timing="card.timing || ''"
          :_id="card._id || ''"
          :email="card.email || ''"
          :duration="card.duration || ''"
          :joined="card.joined || ''"
          :card-type="card.cardType || ''"
          :selected-card="currentSelectedCard === (card._id || '')"
          @handle-card-selection="handleCardSelection"
        />
      </div>

    </div>
  </div>
</template>

<script>
import BaseButton from "~/components/reservation/common/buttons/base-button";
import {ROUTES} from "~/utils/constants/routes";
import UserCard from "~/components/reservation/common/cards/user-card";
import {businessIdFromURL} from "~/utils/helpers";

export default {
  name: "business-manage-sidebar",
  components: {UserCard, BaseButton},
  props:{
    title:String,
    cardDetails:Array,

  },
  data() {
    return {
      routes: ROUTES,
      currentSelectedCard: this.$route.query?.q ?
        this.cardDetails.find(el=>el?._id === this.$route.query?.q)?._id ?
          this.cardDetails.find(el=>el?._id === this.$route.query?.q)?._id : this.cardDetails[0]?._id
        : this.cardDetails[0]?._id,
      businessId : ()=>businessIdFromURL(this)
    }
  },
  methods:{
    handleCardSelection({name, id,media,duration}){
      this.currentSelectedCard = id
      console.log('here')
      this.$emit('handle-card-selection', {name, id, media, duration})
    }
  }
}
</script>

