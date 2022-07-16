<template>
    <div v-show="show_modal" @click="closeModal" class="fixed top-0 bottom-0 left-0 right-0 z-50 items-center justify-center p-6 overflow-auto bg-black bg-opacity-50">
        <div @click.stop class="p-6 bg-white rounded sm:mx-auto md:w-1/2 xl:w-1/4">
            
            <div class="mb-5">
                <!-- Modal head -->
                <h1 class="inline-flex text-center font-bold text-xl">Message Preview</h1>
                <button class="inline-flex float-right right-0" type="button" @click="closeModal">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 font-bold" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="200" y1="56" x2="56" y2="200" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="200" y1="200" x2="56" y2="56" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
                </button>
            </div>  

            <div class="mb-5 mx-auto text-center">
                <span class="font-bold block">{{msg_to_send.header}}</span>
                {{msg_to_send.body}} <br/>
                {{msg_to_send.promoCode}} <br />
                {{msg_to_send.url}} <br />
            </div>

            <div class="mb-5">
                <span class="font-bold">Recipients</span>
                <span class="text-center ml-5">{{ msg_to_send.sendToType }}</span>
            </div>
            
            <!-- <ul class="mx-auto divide-y divide-gray-200">
                <li class="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <span class="font-bold mr-4">Header </span>{{ msg_to_send.header }}
                </li>
                <li class="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <span class="font-bold mr-4">Body </span>{{ msg_to_send.body }}
                </li>

                <li class="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <span class="font-bold mr-4">URL </span>{{ msg_to_send.url }}
                </li>
                <li class="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <span class="font-bold mr-4">Send To Types </span>{{ msg_to_send.sendToType }}
                </li>
            </ul> -->

            <div class="flex justify-center mx-auto space-x-10">
                <button @click="confirmSend" class="py-2 px-8 hover:bg-green-400 bg-white border-2 border-green-400 focus:ring-2 focus:ring-green-500 text-green-500 hover:text-white rounded-lg">
                    Send
                </button>
                <button @click="closeModal" class="rounded-lg p-2 border-2 border-red-500 focus:ring-2 focus:ring-red-600 hover:bg-red-600 hover:text-white text-red-500">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'show_modal',
        'msg_to_send'
    ],
    data() {
        return {

        }
    },
    methods: {
        closeModal() {
            this.$emit('close_modal');
        },
        confirmSend() {
            this.$emit('confirm_send');
        }
    }
}
</script>