<template>
    <div>

        <div class="bg-white">

            <div class="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
                <div class="space-y-8 sm:space-y-12">

                    <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Customer Records</h2>
                    </div>

                    <!-- <TablesSubscriberRecordsTable /> -->
                    <div class="mx-auto">
                        <div class="flex space-x-5">
                            <h3>Name</h3>
                            <h3>Subscribed</h3>
                        </div>
                        <div v-for="subscriber in subscribers" :key="subscriber.id" class="flex mx-auto space-x-5">
                            <div>
                                {{subscriber.firstName}}
                                {{subscriber.lastName}}
                            </div>
                            <div class="flex ">
                                {{subscriber.subscribed}}
                            </div>
                        </div>
                    </div>
                    View and Edit Send To Types

                </div>
            </div>

        </div>
    
    </div>
</template>

<script>
export default {
    data() {
        return {
            // user: null,
            businessId: null,
            subscribers: [],
        }
    },
    methods: {
        retrieveUserData() {
            this.$axios.get('/get-user')
            .then(res => {
                this.businessId = res.data.businessId;
                this.retrieveSubscriberData();
            })
            .catch(err => {
                console.log(err);
            })
        },
        retrieveSubscriberData: function() {
            this.$axios.$post('/fetch-subscribers', {
                businessId: this.businessId
            })
            .then(res => {
                console.log(res.subscriberData);
                this.subscribers = res.subscriberData;
            });
        }
    },
    created() {
        this.retrieveUserData();
    }
}
</script>