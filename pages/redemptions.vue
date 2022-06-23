<template>
    <div>
        <div class="h-screen">
            <div class="">
                <UiNavbarComponent />
            </div>

            <div class="w-full flex">
                <UiSideMenu />

                <div class="w-full rounded">

                    <div class="bg-white">

                        <div class="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
                            <div class="space-y-8 sm:space-y-12">

                                <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                                    <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Redemption Analytics</h2>
                                </div>

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
    name: 'RedemptionsAnalytics',
    data() {
        return {

        }
    }
}
</script>