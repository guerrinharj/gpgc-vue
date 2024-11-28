<template>
    <nav class="navbar">
        <ul>
            <li><router-link to="/">Releases</router-link></li>
            <li><router-link to="/featurings">Featurings</router-link></li>
            <li><router-link to="/soundtracks">Soundtracks</router-link></li>
            <li><router-link to="/about">About</router-link></li>
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
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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

@media (max-width: 600px) {
    .navbar {
        padding: 0.5rem;
        width: 100%;
        margin: auto;
    }

    .navbar ul {
        gap: 0.5rem;
    }

    .navbar li {
        margin: 0.5rem 0;
    }

    .navbar a, .navbar li {
        font-size: 1rem;
        padding: 0 8px;
    }
}
</style>
