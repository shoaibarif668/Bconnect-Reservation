<template>
    <div class="w-full">
        <form @submit.prevent="uploadRecords" method="POST" id="recordsUpload" class="flex flex-col flex-cols-1">
            <div class="mx-auto space-y-6">
                <div class="mx-auto flex">
                    <label for="businessName" class="pr-5">Business Name</label>
                    <input type="text" class="border-2 border-black rounded" name="businessName" />
                </div>
                <div class="mx-auto flex">
                    <label for="uploadFile" class="pr-5">Choose File to Upload</label>
                    <input type="file"  name="filename" placeholder="Upload Records"/>
                </div>
            </div>
            

            <div class="mx-auto flex mt-4">
                <button type="submit" class="rounded w-32 text-white bg-blue-400 p-2">
                    Submit
                </button>
            </div>
        </form>
    </div>
</template>

<script>

export default {
    data() {
        return {
            formData: {
                businessName: "",
                filename: "",
            },
            submitting: false,
            fileSupported: false,
        }
    },
    methods: {
        async uploadRecords() {
            this.submitting = true;
            const formData = document.getElementById("recordsUpload");
            await this.$axios.$post(`/uploadRecords`, formData)
            .then( res => {
                this.succesfulUpload();
            });
        },
        succesfulUpload() {
            this.submitting = false;
            this.fileSupported = true;
        }
    }
}
</script>
