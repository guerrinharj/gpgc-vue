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
        async handleLogin() {
            if (this.username && this.password) {
            try {
                // Simulating an API login call
                const isAuthenticated = await this.mockLogin(this.username, this.password);
    
                if (isAuthenticated) {
                alert('Login successful!');
                this.error = null;
                this.$router.push('/add-content'); // Redirect to AddContent page
                } else {
                this.error = 'Invalid username or password.';
                }
            } catch (err) {
                console.error(err);
                this.error = 'An error occurred. Please try again.';
            }
            } else {
            this.error = 'Please fill out all fields.';
            }
        },
        // Simulated login API
        mockLogin(username, password) {
            return new Promise((resolve) => {
            setTimeout(() => {
                resolve(username === 'admin' && password === 'password'); // Example credentials
            }, 500);
            });
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