<template>
    <div class="flex flex-col rounded-lg shadow-lg overflow-hidden p-4">

        <button @click="closeForm" class="flex right-2">
            <svg class="h-10 w-10" xmlns="http://www.w3.org/2000/svg"><g fill="#999" fill-rule="evenodd"><rect transform="rotate(45 18.5 18.5)" x="-4" y="15" width="45" height="7" rx="2"/><rect transform="rotate(-45 18.5 18.5)" x="-4" y="15" width="45" height="7" rx="2"/></g></svg>
        </button>

        <h1 class="text-center mb-3">New Text Message Campaign</h1>
        <form @submit.prevent="createCampaign" method="POST" enctype="multipart/form-data" id="campaignForm" class="flex flex-col flex-cols-1 space-y-8 divide-y divide-gray-200">
            <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div>

                    <input class="hidden" name="businessId" v-model="businessId">

                    <div class="">
                        <label for="msgHeader" class="text-lg leading-6 font-medium text-gray-900">Message Header</label>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">What portion of the message do you want to stand out?</p>
                    </div>
                    <div class="mt-2 sm:col-span-2">
                        <div class="flex rounded-md shadow-sm">
                            <!-- <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"> workcation.com/ </span> -->
                            <input type="text" name="msgHeader" id="msgHeader" class="border-gray-100 border font-bold flex-1 focus:ring-indigo-500 focus:border-indigo-500 block py-2 px-1 w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300" />
                        </div>
                    </div>
                </div>
                
                <div class="">
                    <label for="msgBody">Message Body</label>
                    <!-- <p class="mt-1 max-w-2xl text-sm text-gray-500">Messa</p> -->
                    <div class="mt-2 sm:col-span-2">
                        <div class="flex rounded-md shadow-sm">
                            <!-- <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"> https:// </span> -->
                            <textarea type="text" name="msgBody" id="msgBody" class="border-gray-100 border flex-1 focus:ring-indigo-500 focus:border-indigo-500 block py-2 px-1 w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300" />
                        </div>
                    </div>
                </div>
                <div>
                    <label for="msgUrl" class="text-lg leading-6 font-medium text-gray-900">Message URL</label>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">Enter a URL your customers can visit to take action (This will generate a tinyURL)</p>
                    <div class="mt-2 sm:col-span-2">
                        <div class="flex rounded-md shadow-sm">
                            <input type="text" name="msgUrl" id="msgUrl" class="flex-1 focus:ring-indigo-500 border-gray-300 border focus:border-indigo-500 block py-2 px-1 w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300" placeholder="www.example.com/Home">
                        </div>
                    </div>
                </div>

                <div>
                    <label for="promoCode" class="text-lg leading-6 font-medium text-gray-900">Promotion Code</label>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">A redemption code associated with a deal in your Point of Sale platform that your clients can use at checkout</p>
                    <div class="mt-2 sm:col-span-2">
                        <div class="flex rounded-md shadow-sm">
                            <!-- <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span> -->
                            <input type="text" name="promoCode" id="promoCode" class="flex-1 focus:ring-indigo-500 border-gray-300 border focus:border-indigo-500 block py-2 px-1 w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300" placeholder="FALL2022">
                        </div>
                    </div>
                </div>

                <div class="">
                    <div>
                        <label for="sendToType" class="text-lg leading-6 font-medium text-gray-900">Message Recipients</label>
                        <select id="sendToType" name="sendToType" autocomplete="country-name" class="flex-1 focus:ring-indigo-500 border-gray-300 border focus:border-indigo-500 block py-2 px-1 w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300">
                            <option v-for="sendType in sendToTypes" :key="sendType.type">{{ sendType.type }}</option>
                            <!-- <option key="newCustomers">New Customers</option>
                            <option key="haveRedeemed">Have Redeemed</option>
                            <option key="reviewInvite">Review Invite</option>
                            <option key="multipleRedemptions">Have Redeemed Multiple</option> -->
                        </select>
                    </div>
                </div>
            </div>
             <div class="mx-auto flex mt-4">
                <button type="submit" class="rounded w-32 text-white hover:bg-blue-600 bg-blue-400 p-2">
                    Submit
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'CreateCampaignComponent',
    props: ['close_campaign_form', 'campaign_created'],
    data() {
        return {
            // We must be able to select multiple sendToTypes (using checkbox)
            // We will submit an array where selected keys have value 1, non-selected
            // have value 0
            formData: {

            },
            businessId: null,
            submitting: false,
            sendToTypes: [],

        }
    },
    created() {
        this.retrieveUser();
    },
    methods: {
        closeForm() {
            this.$emit('close_current_form');
        },
        async createCampaign() {
            this.submitting = true;
            console.log(this.businessId);
            const formData = new FormData(document.getElementById("campaignForm"));
            console.log(formData);
            await this.$axios.$post(`/createCampaign`, formData)
            .then( res => {
                this.succesfulUpload();
            })
            .catch( err => {
                console.log(err);
            });
        },
        async fetchTypes() {
            await this.$axios.get(`/fetch-sendToTypes/${this.businessId}`)
            .then( res => {
                console.log(res.data.types);
                this.sendToTypes = res.data.types;
            })
            .catch(err => {
                console.log(err);
            });
        },
        async retrieveUser() {
            await this.$axios.get('/get-user')
            .then(res => {
                this.businessId = res.data.businessId;
            });
            this.fetchTypes();
        },
        succesfulUpload() {
            this.submitting = false;
            this.fileSupported = true;
            if (this.campaign_created) this.$emit('campaign_created');
        }
    }
}
</script>