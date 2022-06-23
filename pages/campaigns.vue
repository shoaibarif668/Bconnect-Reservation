<template>
    <div class="">
        <div>
            <div class="">
                <UiNavbarComponent />
            </div>

            <div class="w-full flex">
                <UiSideMenu />

                <div class="w-full rounded">
                    <Campaigns/>
                </div>
            </div>

            <UiFooter />

        </div>
    </div>
</template>

<script>
export default {
    auth: true,
}
</script>