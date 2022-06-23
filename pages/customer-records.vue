<template>
    <div>
        <div class="h-screen">
            <div class="">
                <UiNavbarComponent />
            </div>
            <div class="w-full flex">
                <UiSideMenu />

                <div class="w-full bg-gray-100 rounded">
                    <Subscribers />
                </div>
            </div>

            <UiFooter />

        </div>
    </div>
</template>

<script>
export default {
    auth: true,
    methods: {
        fetchRecords: function() {
            this.$axios.get();
        }
    }
}
</script>