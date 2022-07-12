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
                            <div v-for="cmp in campaigns" :key="cmp.id" class="border border-gray-200 rounded-lg shadow-sm ">
                                <div class="flex mt-1">
                                    <button @click="showEdit(cmp.id)" type="button" class="ml-2 mt-1 items-center p-1 border border-transparent rounded-full shadow-sm hover:shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <!-- Heroicon name: solid/plus-sm -->
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button @click="showDelete(cmp.id)" type="button" class=" mt-1 ml-3 items-center p-1 border border-transparent rounded-full shadow-sm hover:shadow-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>

                                    <button @click="sendCampaign(cmp.id)" type="button" class="float-right mt-2 right-0 p-1 border border-transparent rounded-full shadow-sm hover:shadow-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </button>

                                </div>
                                <div class="p-6">
                                    <h2 class="text-lg leading-6 font-medium text-gray-900">{{ cmp.header }}</h2>
                                
                                </div>
                                <div class="pb-8 px-6">
                                <h3 class="text-xs font-medium text-gray-900 tracking-wide">{{ cmp.body }}</h3>
                                <ul role="list" class="mt-6 space-y-4">
                                    <li class="flex space-x-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                        </svg>
                                        <!-- Will have multiple values -->
                                        <a class="font-semibold">{{cmp.sendToType}}</a>
                                    </li>
                                    <li class="flex space-x-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                        <a :href="cmp.url">{{cmp.url}}</a>
                                    </li>
                                </ul>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <UiLoadingSpinner 
                                borderWidth="2px"
                                borderTopColor="#022b56"
                                borderBg="transparent"
                                size="20px"
                            />
                        </div>

                    </div>
                
                </div>
            </div>

            <ModalsEditCampaign :show_modal="showEditModal" :modal_id="activeModalId" @close_modal="closeModals" />
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            businessId: null,
            campaigns: [],
            fetching: false,
            showEditModal: false,
            showDeleteModal: false,
            activeModalId: null,
        }
    },
    methods: {
        retrieveUserData() {
            this.$axios.get(`/get-user`)
            .then(res => {
                console.log(res.data);
                this.businessId = res.data.businessId;
                this.fetchCampaigns();
            });
        },
        async fetchCampaigns() {
            this.fetching = true;
            this.loading = true;
            await this.$axios.post('/fetch-campaigns', {
                businessId: this.businessId,
            })
            .then( res => {
                console.log(res);
                this.campaigns = res.data.campaigns;
                this.loading = false;
                this.fetching = false;
            })
        },
        showEdit(id) {
            this.showEditModal = true;
            this.activeModalId = id;
        },
        showDelete(id) {
            this.showDeleteModal = true;
            this.activeModalId = id;
        },
        sendCampaign(id) {

        },
        closeModals() {
            this.showEditModal = false;
            this.showDeleteModal = false;
        }
    },
    created() {
        this.retrieveUserData();
    }
}
</script>