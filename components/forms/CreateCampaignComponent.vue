<template>
    <div class="flex flex-col rounded-lg shadow-lg overflow-hidden p-4">

        <button @click="closeForm" class="flex right-2">
            <svg class="h-12 w-12" xmlns="http://www.w3.org/2000/svg"><g fill="#999" fill-rule="evenodd"><rect transform="rotate(45 18.5 18.5)" x="-4" y="15" width="45" height="7" rx="2"/><rect transform="rotate(-45 18.5 18.5)" x="-4" y="15" width="45" height="7" rx="2"/></g></svg>
        </button>

        <h1 class="text-center mb-3">New Text Message Campaign</h1>
        <form @submit.prevent="createCampaign" id="campaignForm" class="flex flex-col flex-cols-1 space-y-8 divide-y divide-gray-200">
            <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div>
                    <div class="">
                        <label for="msgHeader" class="text-lg leading-6 font-medium text-gray-900">Message Header</label>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">What portion of the message do you want to stand out?</p>
                    </div>
                    <div class="mt-2 sm:col-span-2">
                        <div class="flex rounded-md shadow-sm">
                            <!-- <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"> workcation.com/ </span> -->
                            <textarea type="text" name="msgHeader" id="msgHeader" class="border-gray-100 border font-bold flex-1 focus:ring-indigo-500 focus:border-indigo-500 block py-2 px-1 w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300" />
                        </div>
                    </div>
                </div>
                
                <div class="">
                    <label for="msgBody">Message Body</label>
                    <!-- <p class="mt-1 max-w-2xl text-sm text-gray-500">Messa</p> -->
                    <div class="mt-2 sm:col-span-2">
                        <div class="flex rounded-md shadow-sm">
                            <!-- <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"> https:// </span> -->
                            <textarea type="text" name="msgUrl" id="msgUrl" class="border-gray-100 border flex-1 focus:ring-indigo-500 focus:border-indigo-500 block py-2 px-1 w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300" />
                        </div>
                    </div>
                </div>
                <div>
                    <label for="msgUrl" class="text-lg leading-6 font-medium text-gray-900">Message URL</label>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">Enter a URL your customers can visit to take action (This will generate a tinyURL)</p>
                    <div class="mt-2 sm:col-span-2">
                        <div class="max-w-lg flex rounded-md shadow-sm">
                            <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"> https:// </span>
                            <input type="text" name="msgUrl" id="msgUrl" class="flex-1 focus:ring-indigo-500 border-gray-300 border focus:border-indigo-500 block py-2 px-1 w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com/Home">
                        </div>
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
    props: ['close_campaign_form'],
    data() {
        return {
            'formData': {

            },
            submitting: false,
        }
    },
    methods: {
        closeForm() {
            this.$emit('close_current_form');
        },
        async createCampaign() {
            this.submitting = true;
            const formData = new FormData(document.getElementById("campaignForm"));

            await this.$axios.$post(`/createCampaign`, formData)
            .then( res => {
                this.succesfulUpload();
            })
            .catch( err => {
                console.log(err);
            });
        },
        succesfulUpload() {
            this.submitting = false;
            this.fileSupported = true;
        }
    }
}
</script>