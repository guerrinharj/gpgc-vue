<template>
    <nav class="navbar" ref="navbar">
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
        handleScroll() {
            const navbar = this.$refs.navbar;
            const offset = navbar.offsetTop;

            if (window.scrollY > offset) {
                navbar.classList.add('fixed');
            } else {
                navbar.classList.remove('fixed');
            }
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
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

.navbar.fixed {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%); /* Center the navbar horizontally */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5); /* Optional: Add a shadow for better visibility */
    z-index: 1000;
    width: 100%; /* Ensure it spans the full width */
    border-bottom: solid 1px white;
}


.navbar ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex; /* Use flexbox for horizontal layout */
    justify-content: center; /* Center the items in the navbar */
    align-items: center; /* Align items vertically */
    gap: 1rem; /* Add consistent spacing between items */
}

.navbar li {
    display: inline-block; /* Keeps list items inline */
    margin: 0;
}

.navbar a {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    transition: color 0.3s;
}

.navbar a:hover {
    color: #ccc; /* Optional hover effect */
}

.logout {
    color: red !important;
}

/* Mobile View */
@media (max-width: 600px) {
    .navbar {
        padding: 0.5rem;
    }

    .navbar ul {
        flex-direction: row; /* Keep items in a row for mobile view */
        flex-wrap: wrap; /* Allow wrapping if space is limited */
        gap: 0.5rem; /* Reduce spacing for mobile */
        justify-content: center; /* Ensure the items are centered */
    }

    .navbar li {
        margin: 0; /* Remove unnecessary vertical margin */
    }

    .navbar a {
        font-size: 1rem; /* Reduce font size for mobile */
        padding: 0.5rem; /* Optional: Add padding for touch-friendly links */
    }
}


</style>
