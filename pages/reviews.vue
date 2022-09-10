<template>
    <div>
        <div class="h-screen">
            <div>
                <UiNavbarComponent />
            </div>
            <div class="w-full flex">
                <UiSideMenu />

                <div class="w-full rounded">

                    <div class="bg-white">

                        <div class="mx-auto py-12 text-center">
                            <div class="space-y-8 sm:space-y-12">

                                <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                                    <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Reviews Analytics</h2>
                                </div>


                                <ReviewsStats :stats="stats" :business_id="businessId" />

                                <div class="space-y-5">
                                    <a class="text-xl text-blue-600 hover:underline" :href="businessGoogleReviewUrl">
                                        See reviews on Google
                                    </a>
                                </div>

                                <ReviewsList v-if="reviews && !fetchingReviews" :reviews="reviews" />
                                <UiLoadingSpinner v-else-if="fetchingReviews" 
                                    borderWidth="2px"
                                    borderTopColor="#022b56"
                                    borderBg="transparent"
                                    size="20px"
                                />

                            </div>

                            <div class="mt-24">
                                <UiFooter />
                            </div>
                                

                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    auth: true,
    // middleware: 'auth',
    name: 'ReviewsAnalytics',
    data() {
        return {
            businessId: null,
            userId: null,
            businessGoogleReviewUrl: "#",

            stats: {
                pctReviewed: 0

            },
            reviews: null,
            fetchingReviews: false
        }
    },
    methods: {
        async retrieveUserData() {
            await this.$axios.get('/get-user')
            .then( res => {
                console.log(this.businessId);
                this.businessId = res.data.businessId;
                // this.getBusinessGoogleReviewUrl
                this.fetchAllReviews();
                this.fetchReviewData();
            })
        },
        async fetchReviewData() {
            console.log(this.businessId);
            await this.$axios.post(`/reviews/review-data`, {
                businessId: this.businessId
            })
            .then( res => {
                console.log(res);
                this.stats.pctReviewed = res.data.pctReviewed;
                this.stats.avgRating = res.data.avgRating;
                this.stats.reviewsPastWeek = res.data.reviewsPastWeek;
            })
            .catch();
        },
        getBusinessGoogleReviewUrl() {
            //
        },
        async fetchAllReviews() {
            await this.$axios.get(`/reviews/fetch-all/${this.businessId}`)
            .then( res => {
                // console.log(res);
                this.reviews = res.data.reviews;
                this.fetchingReviews = false;
            })
            .catch( err => {
                this.fetchingReviews = false;
                console.log("An error occured during fetch");
                console.log(err);
            });
        }
    },
    created() {
        this.fetchingReviews = true;
        this.retrieveUserData();
    }
}
</script>