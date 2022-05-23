<template>
    <div class="mx-auto">
        <button @click.prevent="login">Login</button>
    </div>
</template>

<script>
export default {
    methods: {
        login: function() {
            this.$auth.loginWith('laravelSanctum', {
                data: {
                    email: 'kmckrola@dapdash.com',
                    password: 'password'
                }
            })
        }
    }
}
</script>