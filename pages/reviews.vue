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

                        <div class="mx-auto py-12 text-center lg:py-24">
                            <div class="space-y-8 sm:space-y-12">

                                <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                                    <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Reviews Analytics</h2>
                                </div>

                                <Reviews />

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
        }
    },
    methods: {
        getUserData: function() {
            this.$axios.get('')
            .then()
        }
    }
}
</script>