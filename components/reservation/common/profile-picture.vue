<template>
  <div>
    <img :class="customClasses" class="rounded-full object-cover max-w-[40px] max-h-[40px] h-full w-full" referrerpolicy="no-referrer" src="@/assets/img/placeholder.png" :alt="userName"/>
  </div>
</template>

<script>
  import {MEDIA_BASEURL} from "@/utils/constants";

  export default {
    components:{MEDIA_BASEURL},
    props:{
      userProfile:String,
      userName:String,
      customClasses:String
    }
  }
</script>
