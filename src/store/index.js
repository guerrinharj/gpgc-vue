import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        releases: [],
        featurings: [],
        soundtracks: [],
        user: null, // To store login state
        error: null, // To store error messages
    },
    mutations: {
        // Releases
        setReleases(state, releases) {
        state.releases = releases;
        },

        // Featurings
        setFeaturings(state, featurings) {
        state.featurings = featurings;
        },

        // Soundtracks
        setSoundtracks(state, soundtracks) {
        state.soundtracks = soundtracks;
        },

        // User Authentication
        setUser(state, user) {
        state.user = user;
        },
        setError(state, error) {
        state.error = error;
        },
    },
    actions: {
        // Fetch Releases
        async fetchReleases({ commit }) {
        try {
            const response = await axios.get('https://gpgc-api.onrender.com/releases');
            commit('setReleases', response.data);
        } catch (error) {
            console.error('Error fetching releases:', error);
            commit('setError', 'Failed to load releases.');
        }
        },

        // Fetch Featurings
        async fetchFeaturings({ commit }) {
        try {
            const response = await axios.get('https://gpgc-api.onrender.com/featurings');
            commit('setFeaturings', response.data);
        } catch (error) {
            console.error('Error fetching featurings:', error);
            commit('setError', 'Failed to load featurings.');
        }
        },

        // Fetch Soundtracks
        async fetchSoundtracks({ commit }) {
        try {
            const response = await axios.get('https://gpgc-api.onrender.com/soundtracks');
            commit('setSoundtracks', response.data);
        } catch (error) {
            console.error('Error fetching soundtracks:', error);
            commit('setError', 'Failed to load soundtracks.');
        }
        },

        // User Login
        async login({ commit }, { username, password }) {
        try {
            // Example of a mock API call for login (replace with actual API endpoint)
            const response = await axios.post('https://gpgc-api.onrender.com/login', {
            username,
            password,
            });

            if (response.data.success) {
            commit('setUser', response.data.user);
            commit('setError', null);
            } else {
            throw new Error('Invalid username or password.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            commit('setError', 'Login failed. Please check your credentials.');
        }
        },

        // Logout User
        logout({ commit }) {
        commit('setUser', null);
        },
    },
    getters: {
        isAuthenticated(state) {
        return !!state.user;
        },
        getError(state) {
        return state.error;
        },
        getReleases(state) {
        return state.releases;
        },
        getFeaturings(state) {
        return state.featurings;
        },
        getSoundtracks(state) {
        return state.soundtracks;
        },
    },
});
