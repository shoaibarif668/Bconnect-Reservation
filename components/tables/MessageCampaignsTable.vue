<template>
    <VueTabulator v-model="tableData" :options="options" layout="fitData" />
</template>

<script>
export default {
    data() {
        return {
            businessId: null,
            tabulator: null,
            tableData: [],
            options: {
                columns: [
                    {
                        title: 'Header',
                        field: 'header',
                        sorter: 'string',
                        width: 200,
                        editor: true,
                    },
                    {
                        title: 'Body',
                        field: 'header',
                        sorter: 'string',
                        width: 200,
                        editor: true,
                    },
                    {
                        title: 'Header',
                        field: 'header',
                        sorter: 'string',
                        width: 200,
                        editor: true,
                    },
                    {
                        title: 'Header',
                        field: 'header',
                        sorter: 'string',
                        width: 200,
                        editor: true,
                    },
                ]
            }
        }
    },
    methods: {
        retrieveUserData: function() {
            this.$axios.get(`/get-user`)
            .then(res => {
                console.log(res.data);
                this.businessId = res.data.businessId;
                this.fetchCampaigns();
            });
        },
        fetchCampaigns: function() {
            this.$axios.$post('/fetch-campaigns', {
                businessId: this.businessId
            })
            .then(res => {
                console.log(res.campaigns);
                this.tableData = res.campaigns;
            })
        }
    },
    created() {
        this.retrieveUserData();

        // calling method here doesn't set businessId before fetchCampaigns get ran
        // race condition
        // this.fetchCampaigns();
    }
}
</script>