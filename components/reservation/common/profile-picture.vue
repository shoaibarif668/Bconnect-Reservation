<template>
  <div>
<!--    <img :class="customClasses" class="rounded-full object-cover" referrerpolicy="no-referrer" :src="userProfile?.isCompleteUrl ? userProfile.url : `${MEDIA_BASEURL}${userProfile.url}`" :alt="userName"/>-->
  </div>
</template>

<script>
  import {MEDIA_BASEURL} from "@/utils/constants";

  export default {
    components:{MEDIA_BASEURL},
    props:{
      userProfile:Object,
      userName:String,
      customClasses:String
    }
  }
</script>
