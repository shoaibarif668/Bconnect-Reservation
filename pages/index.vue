<template>
  <div class="mx-auto flex">
    <div class="w-full my-10">
      <h1 class="text-green-400 text-xl font-bold mb-3 text-center w-full">Beauty Connect</h1>
      <div class="flex mx-auto w-full">
        <UploadRecordsComponent>
        </UploadRecordsComponent>
      </div>
    </div>
      
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    async apiCall() {
      const response = await this.$axios.$get('/campaign');
      console.log(response);
    }
  },
  mounted() {
    this.apiCall();
  }
}
</script>
