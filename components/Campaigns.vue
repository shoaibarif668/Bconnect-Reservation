<template>
    
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        async fetchCampaigns() {
            this.loading = true;
            await this.$axios.get('/fetchCampaigns')
        }
    }
}
</script>