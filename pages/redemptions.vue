<template>
    <div>
        <div class="h-screen">
            <div class="">
                <UiNavbarComponent />
            </div>
            <div>
                <UiSideMenu />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    middleware: 'auth',
    name: 'RedemptionsAnalytics',
    data() {
        return {

        }
    }
}
</script>