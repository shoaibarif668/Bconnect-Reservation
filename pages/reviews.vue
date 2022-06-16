<template>
    <div>
        <div class="h-screen">
            <div>
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
    name: 'ReviewsAnalytics',
    data() {
        return {

        }
    },
    methods: {
        
    }
}
</script>