<template>

    <div>
        <div class="bg-white">

            <div class="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
                <div class="space-y-8 sm:space-y-12">

                    <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Message Campaigns</h2>
                    </div>

                    <!-- <TablesMessageCampaignsTable /> -->
                    <div>
                        <div v-if="!fetching" class="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
                            <div v-for="cmp in campaigns" :key="cmp.id" class="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
                                <div class="p-6">
                                <h2 class="text-lg leading-6 font-medium text-gray-900">{{ cmp.header }}</h2>
                                <!-- <p class="mt-4 text-sm text-gray-500"></p> -->
                                
                                </div>
                                <div class="pt-6 pb-8 px-6">
                                <h3 class="text-xs font-medium text-gray-900 tracking-wide">{{ cmp.body }}</h3>
                                <ul role="list" class="mt-6 space-y-4">

                                    <li class="flex space-x-3">
                                    <!-- Heroicon name: solid/check -->
                                        <a :href="cmp.url">{{cmp.url}}</a>
                                    </li>
                                </ul>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            
                        </div>
                    </div>
                
                </div>
            </div>

        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            businessId: null,
            campaigns: [],
            fetching: true,
        }
    },
    methods: {
        retrieveUserData: function() {
            this.$axios.get(`/get-user`)
            .then(res => {
                console.log(res.data);
                this.businessId = res.data.businessId;
                this.fetchCampaigns();
            });
        },
        async fetchCampaigns() {
            this.loading = true;
            await this.$axios.post('/fetch-campaigns', {
                businessId: this.businessId,
            })
            .then( res => {
                console.log(res);
                this.campaigns = res.data.campaigns;
            })
        }
    },
    created() {
        this.retrieveUserData();
    }
}
</script>