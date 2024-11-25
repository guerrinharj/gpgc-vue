<template>
    <div class="login-page">
        <LoginForm />
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

    export default {
    name: 'LoginPage',
    components: {
        LoginForm,
    },
    };
</script>

<style>
    .login-page {
    background: black;
    color: white;
    text-align: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    }
</style>