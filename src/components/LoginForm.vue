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
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script>
    export default {
    data() {
        return {
        username: '',
        password: '',
        error: null,
        };
    },
    methods: {
        handleLogin() {
        if (this.username && this.password) {
            // Example: Replace with actual API call
            console.log('Logging in with:', {
            username: this.username,
            password: this.password,
            });

            // Simulate success or failure
            if (this.username === 'admin' && this.password === 'password') {
            alert('Login successful!');
            this.error = null;
            // Redirect to a different page if needed
            this.$router.push('/');
            } else {
            this.error = 'Invalid username or password.';
            }
        } else {
            this.error = 'Please fill out all fields.';
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