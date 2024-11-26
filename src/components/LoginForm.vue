<template>
    <div class="login-form">
        <h1>Login</h1>
        <form @submit.prevent="handleLogin">
            <div class="form-box">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        v-model="username"
                        placeholder="Enter your username"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        v-model="password"
                        placeholder="Enter your password"
                        required
                    />
                </div>
            </div>

            <button class="login-button" type="submit">Login</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    computed: {
        ...mapGetters(['getError']),
        errorMessage() {
            return this.getError;
        },
    },
    methods: {
        ...mapActions(['login']),
        async handleLogin() {
            if (this.username && this.password) {
                try {
                    const success = await this.login({ username: this.username, password: this.password }); //the variable "success" must returns a true statement to be defined
                    
                    // Redirect only if login is successful
                    if (success) {
                        this.$router.push('/');
                    }
                } catch (error) {
                    console.error('Login failed:', error);
                }
            } else {
                console.error('Please provide both username and password.');
            }
        },
    },
};
</script>

<style>
    .login-form {
        background: black;
        color: white;
        text-align: center;
        padding: 3rem;
        width: 300px;
        margin: 5rem auto;
        border: 1px solid white;
        border-radius: 5px;
    }

    .login-form h1 {
        margin: 2px;
    }

    .form-box {
        margin: 40px 0;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
    }

    input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid white;
        border-radius: 3px;
        background: black;
        color: white;
    }

    .login-button {
        margin: 10px 10px;
        background: black;
        color: white;
        border: solid 1px white;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 3px;
        font-family: inherit;
        font-size: inherit;
        text-transform: inherit;
    }

    .login-button:hover {
        background: white;
        color: black;
    }

    .error {
        color: red;
        margin-top: 1rem;
    }
</style>  