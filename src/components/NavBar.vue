<template>
    <nav class="navbar">
        <ul>
            <li><router-link to="/">Releases</router-link></li>
            <li><router-link to="/featurings">Featurings</router-link></li>
            <li><router-link to="/soundtracks">Soundtracks</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li v-if="isAuthenticated" class="logout">
                <a @click="logout">Logout</a>
            </li>
            <li v-else class="login">
                <router-link to="/login">Login</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters(['isAuthenticated']),
        },
        methods: {
            ...mapActions(['logout']),
        }
    };
</script>

<style>
.navbar {
    background: black;
    color: white;
    text-align: center;
    padding: 1rem;
}
.navbar ul {
    list-style: none;
    padding: 0;
}
.navbar li {
    display: inline;
    margin: 0 1rem;
}

.logout {
    color: red!important;
}
</style>
