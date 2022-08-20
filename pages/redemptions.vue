<template>
    <div>
        <div class="h-screen">
            <div class="">
                <UiNavbarComponent />
            </div>

            <div class="w-full flex">
                <UiSideMenu />

                <div class="w-full rounded">

                    <div class="bg-white">

                        <div class="mx-auto py-12 text-center">
                            <div class="space-y-8 sm:space-y-12">

                                <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                                    <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Redemption Analytics</h2>
                                </div>

                                <RedemptionsStats v-if="redemptionStats" /> 
                            </div>
                        </div>

                    </div>

                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    auth: true,
    name: 'RedemptionsAnalytics',
    data() {
        return {
            redemptionStats: null,
        }
    },
    created() {

    },
    methods: {
        async fetchPageData() {
            await this.$axios.get('/get-user')
            .then( res => {
                console.log(this.businessId);
                this.businessId = res.data.businessId;
                // this.getBusinessGoogleReviewUrl
                this.fetchRedemptionData();
                // this.fetchReviewData();
            })
            .catch()
        },
        async fetchRedemptionData() {
            await this.$axios.get('/')
        }
    }
}
</script>