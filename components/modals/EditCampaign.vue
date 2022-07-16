<template>
    <div v-show="show_modal" @click="closeModal" class="fixed top-0 bottom-0 left-0 right-0 z-50 items-center justify-center p-6 overflow-auto bg-black bg-opacity-50">
        <div @click.stop class="p-6 bg-white rounded sm:mx-auto md:w-1/2 xl:w-1/4">
            
            <div class="mb-5">
                <!-- Modal head -->
                <h1 class="inline-flex text-center font-bold text-xl">Edit Text Message Campaign</h1>
                <button class="inline-flex float-right right-0" type="button" @click="closeModal">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 font-bold" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="200" y1="56" x2="56" y2="200" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="200" y1="200" x2="56" y2="56" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
                </button>
            </div>
            
            <form @submit.prevent="submitChanges" method="POST" enctype="multipart/form-data" id="campaignForm" class="flex flex-col flex-cols-1 space-y-8 divide-y divide-gray-200">
                <div>
                    <!-- <input type="text"> -->
                    <input class="hidden" name="businessId" v-model="business_id">
                    <input class="hidden" name="id" v-model="modal_id">


                    <div class="">
                        <label for="msgHeader" class="text-lg leading-6 font-medium text-gray-900">Message Header</label>
                        <!-- <p class="mt-1 max-w-2xl text-sm text-gray-500">What portion of the message do you want to stand out?</p> -->
                    </div>
                    <div class="mt-2 sm:col-span-2">
                        <div class="flex rounded-md shadow-sm">
                            <!-- <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"> workcation.com/ </span> -->
                            <textarea type="text" :value="msgToEdit.header" name="msgHeader" id="msgHeader" class="border-gray-100 border font-bold flex-1 focus:ring-indigo-500 focus:border-indigo-500 block py-2 px-1 w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300" />
                        </div>
                    </div>
                </div>
                
                <div class="">
                    <label class="text-lg leading-6 font-medium text-gray-900" for="msgBody">Message Body</label>
                    <!-- <p class="mt-1 max-w-2xl text-sm text-gray-500">Messa</p> -->
                    <div class="mt-2 sm:col-span-2">
                        <div class="flex rounded-md shadow-sm">
                            <!-- <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"> https:// </span> -->
                            <textarea type="text" :value="msgToEdit.body" name="msgBody" id="msgBody" class="border-gray-100 border flex-1 focus:ring-indigo-500 focus:border-indigo-500 block py-2 px-1 w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300" />
                        </div>
                    </div>
                </div>

                <div>
                    <label for="msgUrl" class="text-lg leading-6 font-medium text-gray-900">Message URL</label>
                    <!-- <p class="mt-1 max-w-2xl text-sm text-gray-500">Enter a URL your customers can visit to take action (This will generate a tinyURL)</p> -->
                    <div class="mt-2 sm:col-span-2">
                        <div class="flex rounded-md shadow-sm">
                            <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"> https:// </span>
                            <input type="text" :value="msgToEdit.url" name="msgUrl" id="msgUrl" class="flex-1 focus:ring-indigo-500 border-gray-300 border focus:border-indigo-500 block py-2 px-1 w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com/Home">
                        </div>
                    </div>
                </div>

                <div>
                    <label for="promoCode" class="text-lg leading-6 font-medium text-gray-900">Promotion Code</label>
                    <!-- <p class="mt-1 max-w-2xl text-sm text-gray-500">A redemption code associated with a deal in your Point of Sale platform that your clients can use at checkout</p> -->
                    <div class="mt-2 sm:col-span-2">
                        <div class="flex rounded-md shadow-sm">
                            <!-- <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span> -->
                            <input type="text" :value="msgToEdit.promoCode" name="promoCode" id="promoCode" class="flex-1 focus:ring-indigo-500 border-gray-300 border focus:border-indigo-500 block py-2 px-1 w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300" placeholder="FALL2022">
                        </div>
                    </div>
                </div>

                <div class="">
                    <div>
                        <label for="sendToType" class="text-lg leading-6 font-medium text-gray-900">Message Recipients</label>
                        <select id="sendToType" name="sendToType" autocomplete="country-name" class="flex-1 focus:ring-indigo-500 border-gray-300 border focus:border-indigo-500 block py-2 px-1 w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300">
                            <option key="newCustomers">New Customers</option>
                            <option key="haveRedeemed">Have Redeemed</option>
                            <option key="reviewInvite">Review Invite</option>
                            <option key="multipleRedemptions">Have Redeemed Multiple</option>
                        </select>
                    </div>
                </div>

                <button type="submit" class="mx-auto rounded w-32 text-white hover:bg-blue-600 bg-blue-400 p-2">
                    Update
                </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'show_modal',
        'modal_id',
        'msg_to_edit',
        'business_id'
    ],
    data() {
        return {
            msgToEdit: {
                header: this.msg_to_edit.header,
                body: this.msg_to_edit.body,
                url: this.msg_to_edit.url,
                sendToType: this.msg_to_edit.sendToType,
                promoCode: this.msg_to_edit.promoCode ? this.msg_to_edit.promoCode : ""
            },
        }
    },
    methods: {
        submitChanges: function() {
            const formData = new FormData(document.getElementById("campaignForm"));
            this.$emit('update_campaign', formData);
        },
        closeModal() {
            this.$emit('close_modal');
        }
    }
}
</script>