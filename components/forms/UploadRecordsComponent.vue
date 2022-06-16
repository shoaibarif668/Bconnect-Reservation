<template>
    <div class="flex flex-col rounded-lg shadow-lg overflow-hidden p-4">

        <button @click="closeForm" class="flex right-2">
            <svg class="h-12 w-12" xmlns="http://www.w3.org/2000/svg"><g fill="#999" fill-rule="evenodd"><rect transform="rotate(45 18.5 18.5)" x="-4" y="15" width="45" height="7" rx="2"/><rect transform="rotate(-45 18.5 18.5)" x="-4" y="15" width="45" height="7" rx="2"/></g></svg>
        </button>

        <h1 class="text-center mb-3">
            Upload Customer Records
        </h1>
        <form @submit.prevent="uploadRecords" enctype="multipart/form-data" method="POST" id="recordsUpload" class="flex flex-col flex-cols-1">
            <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <!-- <div class="">
                    <label for="businessName" class="pr-5">Business Name</label>
                    <input type="text" class="flex-1 mt-2 focus:ring-indigo-500 border border-gray-700 focus:border-indigo-500 block py-2 px-1 w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300" name="businessName" />
                </div> -->
                <div class="">
                    <label for="uploadFile" class="pr-5">Choose CSV File to Upload</label>
                    <div class="mt-2 sm:col-span-2">
                        <div class="flex rounded-md shadow-sm">
                            <input type="file"  name="filename" placeholder="Upload Records" class="mb-3" />
                        </div>
                    </div>
                </div>
            </div>
            

            <div class="mx-auto flex mt-4">
                <button type="submit" class="rounded w-32 hover:bg-blue-600 text-white bg-blue-400 p-2">
                    Submit
                </button>
            </div>
        </form>
    </div>
</template>

<script>

export default {
    name: 'UploadRecordsComponent',
    props: ['close_current_form'],
    data() {
        return {
            formData: {
                // businessName: "",
                filename: "",
            },
            submitting: false,
            fileSupported: false,
        }
    },
    methods: {
        async uploadRecords() {
            this.submitting = true;
            const formData = new FormData(document.getElementById("recordsUpload"));
            // document.getElementById("recordsUpload");
            await this.$axios.$post(`/uploadRecords`, formData)
            .then( res => {
                this.succesfulUpload();
                console.log(res);
            });
        },
        succesfulUpload() {
            this.submitting = false;
            this.fileSupported = true;
        },
        closeForm: function() {
            this.$emit('close_current_form');
        }
    }
}
</script>
