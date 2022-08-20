<template>
    <div>

        <!-- <VueTabulator v-model="tableData" :options="options" layout="fitData" /> -->
    
    </div>
</template>

<script>

export default {
    // components : { VueTabulator },
    props: [
        'table_data'
    ],
    data() {
        return {
            businessId: null,
            tabulator: null,
            tableData: [
                {}
            ],
            options: {
                columns: [
                {
                    title: 'First Name',
                    field: 'firstName',
                    sorter: 'string',
                    width: 200,
                    editor: true,
                },
                {
                    title: 'Last Name',
                    field: 'lastName',
                    sorter: 'string',
                    width: 200,
                    editor: true,
                },
                {
                    title: 'Phone No.',
                    field: 'phoneNumber',
                    sorter: 'string',
                    width: 300,
                    editor: true
                }]
            }
            // tableData: (this.table_data !== null) ? JSON.parse(this.table_data) : '',
        }
    },
    methods: {
        async retrieveUserData () {
            await this.$axios.get(`/get-user`)
            .then(res => {
                console.log(res.data);
                this.businessId = res.data.businessId;
                this.retrieveSubscriberData();
            });
        },
        async retrieveSubscriberData() {
            await this.$axios.$post('/fetch-subscribers', {
                businessId: this.businessId
            })
            .then(res => {
                console.log(res.subscriberData);
                this.tableData = res.subscriberData;
            });
        }
    },
    created () {
        this.retrieveUserData();
    }
    // mounted() {
    //     this.tabulator = new VueTabulator("#records-table", {
    //         data: this.table_data,
    //     })
    // }
}
</script>