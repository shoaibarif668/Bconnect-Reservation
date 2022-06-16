<template>
    <div>
        <div class="h-screen">
            <div class="">
                <UiNavbarComponent />
            </div>
            <div class="w-full flex">
                <UiSideMenu />

                <div class="w-full min-h-3/4 bg-gray-100 rounded">
                    Customer Records
                    <TablesSubscriberRecordsTable />
                </div>
            </div>

            <UiFooter />

        </div>
    </div>
</template>

<script>
export default {
    methods: {
        fetchRecords: function() {
            this.$axios.get();
        }
    }
}
</script>