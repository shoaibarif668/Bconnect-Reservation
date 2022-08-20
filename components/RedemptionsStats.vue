<template>
    <div class="bg-indigo-800">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-3xl font-extrabold text-white sm:text-4xl">Real-time data on your customer interaction</h2>
                <!-- <p class="mt-3 text-xl text-indigo-200 sm:mt-4 cap">Real-time data on customers leaving reviews</p> -->
            </div>

            <dl class="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
                <div class="flex flex-col">
                    <dt class="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200 capitalize">Total Opt-Ins</dt>
                    <dd class="order-1 text-5xl font-extrabold text-white">{{stats.optIns}}</dd>
                </div>
                <div class="flex flex-col mt-10 sm:mt-0">
                    <dt class="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200 capitalize">Total Opt-Outs</dt>
                    <dd class="order-1 text-5xl font-extrabold text-white">{{stats.optOuts}}</dd>
                </div>
                <!-- <div class="flex flex-col mt-10 sm:mt-0"> -->
                    <!-- <dt class="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200 capitalize">Reviews left this week</dt>
                    <dd class="order-1 text-5xl font-extrabold text-white">{{ stats.reviewsPastWeek }}</dd> -->
                <!-- </div> -->
            </dl>
        </div>
    </div>  
</template>

<script>

export default {
    auth: true,
    props: [
        'business_id',
        'stats'
    ],
    data() {
        return {

        }
    }
}
</script>
