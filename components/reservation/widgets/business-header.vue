<template>
  <div class="bg-peach__bg my-5 mx-10 p-5 border rounded-3xl flex items-center justify-between">
    <div class="flex gap-5 items-center">
      <menu-hamburger/>
      <h1 class="text-2xl text-dark__blue__cl font-bold">The Saloon Shop</h1>
      <div class="flex items-center gap-2.5">
        <div class="bg-white flex items-center px-3">
          <font-awesome-icon class="text-dark__blue__cl" :icon="['fa','user']"/>
          <base-select v-model="professional" :options="['Select Professional']" custom-classes="bg-transparent"/>
        </div>
        <div class="bg-white flex gap-2 items-center px-3">
          <font-awesome-icon class="text-dark__blue__cl" :icon="['fa','user']"/>
          <base-select :options="['Select Client']" v-model="client"/>
        </div>

      </div>
    </div>
    <div class="flex items-center gap-4">
      <p class="text-dark__blue__cl font-normal">Username</p>
      <profile-picture/>
    </div>
  </div>
</template>

<script>
import MenuHamburger from "~/components/reservation/widgets/menu-hamburger";
import WebsiteLogo from "~/components/reservation/common/website-logo";
import BaseSelect from "~/components/reservation/common/form/base-select";
import ProfilePicture from "~/components/reservation/common/profile-picture";
export default {
  name: "business-header",
  components: {ProfilePicture, BaseSelect, WebsiteLogo, MenuHamburger},
  data(){
    return{
      professional:"Select Professional",
      client:"Select Client"
    }
  }
}
</script>
