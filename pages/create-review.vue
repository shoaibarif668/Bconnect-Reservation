<template>
    <div class="fixed top-0 bottom-0 left-0 right-0 z-50 items-center justify-center p-6 overflow-auto bg-black bg-opacity-50">
        <div class="p-6 bg-white rounded sm:mx-auto md:w-3/4 xl:w-1/2">
            <!-- <div class="mx-auto flex">
                <NuxtLogo />
            </div> -->
            <div v-if="reviewing">
                <h1 class="text-center text-2xl mb-2">
                    Let us know how your visit went!
                </h1>
                Rating: {{rating}}
                <div v-if="rating == 5" class="text-center text-sm text-gray-700 mb-6">
                    <UiToggle />
                    Leave a review on Google
                </div>

                <div class="w-2/3 mx-auto">
                    <form @submit.prevent="createReview"
                        method="POST" enctype="multipart/form-data" 
                        id="reviewForm" class="flex flex-col flex-cols-1 
                        space-y-8 divide-y divide-gray-200"
                    >
                        <div class="space-y-3">
                            <FormsStarRating class="justify-center" v-model="rating">
                            
                            </FormsStarRating>

                            <textarea placeholder="How did we do?" class="border-gray-300 text-gray-700 border-2 flex-1 focus:ring-indigo-500 focus:border-indigo-500 block py-2 px-1 w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300" type="text" id="reviewBody" name="reviewBody" />
                            <button class="rounded w-32 float-right text-white hover:bg-blue-600 bg-blue-400 p-2" type="button" @click="createReview">Submit Review</button>
                            <button class="rounded w-24 text-sm text-white hover:bg-red-500 bg-red-400 p-2" type="button" @click="cancelReview">Skip</button>
                            
                        </div>
                        <div v-if="rating < 5">
                            Leave review on Google 
                        </div>
                    </form>
                </div>
            </div>
            <div v-else>
                Thank you for your feedback! View your review on Google here!
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'Create-Review',
    auth: false,
    data() {
        return {
            submitting: true,
            rating: 3,
            reviewing: true,
        }
    },
    methods: {
        async createReview() {
            this.submitting = true;
            this.$axios.post('/reviews/store')
            .then(res => {
                this.reviewing = false;
            });
        },
        cancelReview: function() {
            this.reviewing = false;
        }
    }
}
</script>