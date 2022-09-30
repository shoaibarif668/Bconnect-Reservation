<template>
  <div>
    <div class="h-screen" v-if="$auth.loggedIn">
    <!-- <Login /> -->
      <div class="">
          <UiNavbarComponent />
      </div>
      <div class="w-full flex">

        <UiSideMenu />

        <div class="w-full min-h-3/4 bg-gray-100 rounded">
          <FormsTemplate />
        </div>

      </div>
      
        <UiFooter />

    </div>

    <div v-else>
      <!-- Programmatically push login if not logged in -->
      {{ this.$router.push('/login') }}
    </div>
  </div>
  
</template>

<script>
export default {
  auth: true,
  name: 'IndexPage',
  data() {
    return {
      showUploadForm: false,
      showCampaignForm: false,
    }
  },
  methods: {
    showUploadRecords: function() {
      this.showUploadForm = true;
      this.showCampaignForm = false;
    },
    showCreateCampaign: function() {
      this.showUploadForm = false;
      this.showCampaignForm = true;
    },
    closeCurrentForm: function() {
      this.showUploadForm = false;
      this.showCampaignForm = false;
    }
  },
  mounted() {
    // console.log(this.$auth.fetchUser());
  }
}
</script>
