<template>
  <div class="bg-peach__bg my-5 mx-10 p-5 border rounded-3xl flex items-center justify-between">
    <div class="flex gap-5 items-center">
      <menu-hamburger/>
      <website-logo/>
    </div>
    <h1 class="text-4xl text-dark__blue__cl font-bold">The Saloon Shop</h1>
    <div class="flex items-center gap-4">
      <p class="text-dark__blue__cl font-normal">Username</p>
      <profile-picture/>
    </div>
  </div>
</template>

<script>
import MenuHamburger from "~/components/reservation/widgets/menu-hamburger";
import WebsiteLogo from "~/components/reservation/common/website-logo";
import ProfilePicture from "~/components/reservation/common/profile-picture";
export default {
  name: "reservation-header",
  components: {ProfilePicture, WebsiteLogo, MenuHamburger},
}
</script>
