<template>
    <nav class="navbar" ref="navbar">
        <ul>
            <span id="disable-radio">
                <li><a @click="startRadio" class="radio-button">radio</a></li>
            </span>
            <li id="artists-li"><router-link to="/artists">Artists</router-link></li>
            <li><router-link to="/releases">Releases</router-link></li>
            <li id="featurings-li"><router-link to="/featurings">Featurings</router-link></li>
            <li id="soundtracks-li"><router-link to="/soundtracks">Soundtracks</router-link></li>
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
        ...mapActions(['logout', 'startRadio']),
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
        color: white;
        text-align: center;
        padding: 1rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        width: 100%;
    }

    .navbar ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        font-weight: 600;
        align-items: center;
        gap: 48px;
    }

    .navbar li {
        display: inline-block;
        margin: 0;
    }

    /* Common styles for links and the button */
    .navbar a,
    .radio-button {
        color: white;
        font-size: 32px;
        background: none;
        border: none;
        cursor: pointer;
        transition: color 0.3s;
        letter-spacing: inherit;
    }

    .radio-button {
        color: white;
        background: transparent;
    }

    /* Gradient text styling */
    .radio-button:hover {
        background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent; /* Makes the text take on the gradient */
    }

    .navbar a:hover {
        color: #ccc; /* Hover effect */
    }



    #disable-radio {
        display: none;
    }

/* Mobile View */
@media (max-width: 600px) {
    .navbar {
        padding: 0.5rem;
        top: 2%;
    }

    .navbar ul {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 11px;
        justify-content: center;
    }

    .navbar a {
        font-size: 20px;
        font-weight: 600
    }

    .navbar li {
        margin: 0;
    }


    #artists-li {
        display: none;
    }
}

</style>


