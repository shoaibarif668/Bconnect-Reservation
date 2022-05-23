<template>
  <div class="">
    <NavbarComponent />
    <div class="w-full min-h-3/4 border-2 border-gray-200 bg-gray-100 rounded">
      <FormsTemplate />
    </div>
      <Footer/>
  </div>
</template>

<script>
export default {
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
}
</script>
