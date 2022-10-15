<template>
  <div class="reservation__main__wrapper">
    <business-header/>
    <Nuxt/>
  </div>
</template>

<script>
import BusinessHeader from "~/components/reservation/widgets/business-header";
export default {
  name: "business-layout",
  components: {BusinessHeader},
}
</script>

