<template>
  <div class="flex items-center gap-4" v-if="isLoggedIn">
    <p class="text-dark__blue__cl font-normal">{{ userName }}</p>
    <profile-picture :user-name="userName" :user-profile="profilePicture"/>
  </div>
</template>

<script>
import ProfilePicture from "~/components/reservation/common/profile-picture";
export default {
  name: "top-bar-user-info",
  components: {ProfilePicture},
  props:{
    profilePicture:String,
    userName:String,
    isLoggedIn:Boolean
  }
}
</script>

<style scoped>

</style>
