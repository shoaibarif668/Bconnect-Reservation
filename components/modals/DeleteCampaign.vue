<template>
    <div v-show="show_modal" @click="closeModal" class="fixed top-0 bottom-0 left-0 right-0 z-50 items-center justify-center p-6 overflow-auto bg-black bg-opacity-50">
        <div @click.stop class="p-6 bg-white rounded sm:mx-auto md:w-1/2 xl:w-1/4">
            Delete {{}} text campaign ? 
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'show_modal',
        'campaign_id',
    ],
    data() {
        return {

        }
    },
    methods: {
        closeModal() {
            this.$emit('close_modal');
        }
    }
}
</script>