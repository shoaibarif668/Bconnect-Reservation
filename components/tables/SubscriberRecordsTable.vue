<template>
    <div class="my-10 mx-4">
        <VueTabulator v-model="tableData" :options="options" layout="fitData" />
    </div>
</template>

<script>
// import { VueTabulator } from '../../plugins/vue-tabulator';
// import { VueTabulator } from '~/plugins/vue-tabulator';
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
                { id: 1, firstName: 'kenneth', lastName: 'mckrola', phoneNo: '4352224432' }
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
        retrieveUserData: function() {
            this.$axios.get(`/get-user`)
            .then(res => {
                console.log(res.data);
                this.businessId = res.data.businessId;
                this.retrieveSubscriberData();
            });
        },
        retrieveSubscriberData: function() {
            this.$axios.$post('/fetch-subscribers', {
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