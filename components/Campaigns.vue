<template>

    <div>
        <div class="bg-white">

            <div class="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
                <div class="space-y-8 sm:space-y-12">
                    <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Message Campaigns</h2>
                        <div>
                            <button @click="showNewCampaign = true" class="p-2 border border-indigo-500 rounded-lg text-indigo-600 hover:bg-indigo-600 hover:text-white" type="button">
                                + New Campaign
                            </button>
                        </div>
                        <div v-if="showNewCampaign" class="flex w-full sm:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto w-auto p-3">
                            <FormsCreateCampaignComponent
                                @close_current_form="closeNewCampaignForm"
                            />
                        </div>
                    </div>

                    <div v-if="sending" class="mx-auto">
                        <UiLoadingSpinner
                            borderWidth="2px"
                            borderTopColor="#022b56"
                            borderBg="transparent"
                            size="20px"
                        />
                    </div>

                    <div v-if="notifySent" class="p-2 mt-2 inline-flex text-center text-green-900 bg-green-200 rounded-lg shadow-md mx-auto">
                        {{ notifySent }}
                    </div>
                    <div v-if="notifyEdited" class="p-2 mt-2 inline-flex text-center text-green-900 bg-green-200 rounded-lg shadow-md mx-auto">
                        {{ notifyEdited }}
                    </div>
                    <div v-if="notifyDeleted" class="p-2 mt-2 inline-flex text-center text-green-900 bg-green-200 rounded-lg shadow-md mx-auto">
                        {{ notifyDeleted }}
                    </div>
                    <div v-if="notifyCreated" class="p-2 mt-2 inline-flex text-center text-green-900 bg-green-200 rounded-lg shadow-md mx-auto">
                        {{ notifyCreated }}
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
                                    <button @click="showDelete(cmp.id)" type="button" class=" mt-1 mr-auto ml-2 items-center p-1 border border-transparent rounded-full shadow-sm hover:shadow-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>

                                    <button @click="showConfirmSend(cmp.id)" type="button" class="float-right mr-2 mt-2 right-0 p-1 border border-transparent rounded-full shadow-sm hover:shadow-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
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
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="140" r="40" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><path d="M196,116a59.8,59.8,0,0,1,48,24" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M12,140a59.8,59.8,0,0,1,48-24" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M70.4,216a64.1,64.1,0,0,1,115.2,0" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M60,116A32,32,0,1,1,91.4,78" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M164.6,78A32,32,0,1,1,196,116" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
                                        </svg>
                                        <!-- Will have multiple values -->
                                        <a class="font-semibold">{{cmp.sendToType}}</a>
                                    </li>
                                    <li v-if="cmp.url" class="flex space-x-3">
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

            <ModalsDeleteCampaign v-if="msgToDelete" :show_modal="showDeleteModal" :modal_id="activeModalId" @close_modal="closeModals" />
            <ModalsEditCampaign v-if="msgToEdit" :msg_to_edit="msgToEdit" :business_id="businessId" :show_modal="showEditModal" :modal_id="activeModalId" @update_campaign="updateCampaign" @close_modal="closeModals" />
            <ModalsSendCampaign v-if="msgToSend" :show_modal="showSendModal" :modal_id="activeModalId" :msg_to_send="msgToSend" @confirm_send="sendCampaign" @close_modal="closeModals" />
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            businessId: null,
            campaigns: null,
            fetching: false,
            showEditModal: false,
            showDeleteModal: false,
            showSendModal: false,
            activeModalId: null,
            showNewCampaign: false,

            msgToSend: null,
            msgToEdit: null,
            msgToDelete: null,

            sending: false,
            updating: false,
            deleting: false,
            notifyCreated: "",
            notifySent: "",
            notifyDeleted: "",
            notifyEdited: ""
        }
    },
    methods: {
        campaignCreated() {
            this.notifyCreated = "Successfully added new campaign";
            setTimeout(function() {
                _this.notifyCreated = "";
            }, 4000);
        },
        closeNewCampaignForm() {
            this.showNewCampaign = false;
        },
        retrieveUserData() {
            this.$axios.get(`/get-user`)
            .then(res => {
                // console.log(res.data);
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
                // console.log(res);
                this.campaigns = res.data.campaigns;
                console.log(this.campaigns[0]);
                this.loading = false;
                this.fetching = false;
            })
        },
        showEdit(id) {
            this.showEditModal = true;
            let cmp = this.campaigns.find(cmp => cmp.id === id);
            this.msgToEdit = cmp;
            this.activeModalId = id;
        },
        showDelete(id) {
            this.showDeleteModal = true;
            let cmp = this.campaigns.find(cmp => cmp.id === id);
            this.msgToDelete = cmp;
            this.activeModalId = id;
        },
        showConfirmSend(id) {
            this.showSendModal = true;
            let cmp = this.campaigns.find(cmp => cmp.id === id);
            // console.log(cmp);
            this.msgToSend = cmp;
            this.activeModalId = id;
        },
        sendCampaign() {
            // console.log(this.msgToSend);
            this.sending = true;
            console.log(this.msgToSend);
            this.$axios.put(`/send-campaign`, {
                campaignId: this.msgToSend.id
            })
            .then(res => {
                const _this = this;
                this.sending = false;
                console.log(res);
                this.notifySent = res.data.message;
                setTimeout(function() {
                    _this.notifySent = "";
                }, 4000);
                this.closeModals();
            })
            .catch( err => {
                this.sending = false;
                this.closeModals();
                console.log(err.error);
            });
        },
        updateCampaign(campaign) {
            // console.log(campaign);
            this.updating = true;
            // updatedCampaign = campaign; // Doesn't update
            // Need to 
            this.$axios.post('/update-campaign', campaign)
            .then( res => {
                this.updating = false;
                let newCampaign = res.data.updated_campaign;
                let campaignIndex = this.campaigns.findIndex(cmp => cmp.id === newCampaign.id);

                this.$set(this.campaigns, campaignIndex, res.data.updated_campaign);
                // console.log(res);
                this.closeModals();
            })
            .catch( err => {
                this.updating = false;
                console.log(err);
            });
        },
        closeModals() {
            this.activeModalId = null;
            this.showEditModal = false;
            this.showDeleteModal = false;
            this.showSendModal = false;

            this.msgToSend = null;
            this.msgToEdit = null;
            this.msgToDelete = null;
        }
    },
    created() {
        this.retrieveUserData();
        
    },
    mounted() {
        
    }
}
</script>