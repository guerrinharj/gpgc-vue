<template>
    <div class="login-form">
        <h1>Login</h1>
        <form @submit.prevent="handleLogin">
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

            <button type="submit">Login</button>
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
    padding: 2rem;
    width: 300px;
    margin: 5rem auto;
    border: 1px solid white;
    border-radius: 5px;
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

    button {
    background: white;
    color: black;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 3px;
    }

    button:hover {
    background: gray;
    }

    .error {
    color: red;
    margin-top: 1rem;
    }
</style>  