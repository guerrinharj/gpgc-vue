import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        releases: [],
        featurings: [],
        soundtracks: [],
        selectedRelease: null, // To store the fetched release
        user: null,
        error: null,
    },
    mutations: {
        setReleases(state, releases) {
            state.releases = releases;
        },
        setFeaturings(state, featurings) {
            state.featurings = featurings;
        },
        setSoundtracks(state, soundtracks) {
            state.soundtracks = soundtracks;
        },
        setSelectedRelease(state, release) {
            state.selectedRelease = release;
        },
        setUser(state, user) {
            state.user = user;
        },
        setError(state, error) {
            state.error = error;
        },
    },
    actions: {
        async fetchReleases({ commit }) {
            try {
                const response = await axios.get('https://gpgc-api.onrender.com/api/v1/releases');
                const sortedReleases = response.data.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                commit('setReleases', sortedReleases);
            } catch (error) {
                console.error('Error fetching releases:', error);
                commit('setError', 'Failed to load releases.');
            }
        },
        async fetchFeaturings({ commit }) {
            try {
                const response = await axios.get('https://gpgc-api.onrender.com/api/v1/featurings');
                const sortedFeaturings = response.data.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                commit('setFeaturings', sortedFeaturings);
            } catch (error) {
                console.error('Error fetching featurings:', error);
                commit('setError', 'Failed to load featurings.');
            }
        },
        async fetchSoundtracks({ commit }) {
            try {
                const response = await axios.get('https://gpgc-api.onrender.com/api/v1/soundtracks');
                const sortedSoundtracks = response.data.sort((a, b) => b.year - a.year); // Sort by year
                commit('setSoundtracks', sortedSoundtracks);
            } catch (error) {
                console.error('Error fetching soundtracks:', error);
                commit('setError', 'Failed to load soundtracks.');
            }
        },
        async fetchRelease({ commit }, slug) {
            try {
                const response = await axios.get(`https://gpgc-api.onrender.com/api/v1/releases/${slug}`);
                commit('setSelectedRelease', response.data);
            } catch (error) {
                console.error('Error fetching release:', error);
                commit('setError', 'Failed to load release.');
            }
        },
        async login({ commit }, { username, password }) {
            try {
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
                console.error('Login error:', error);
                commit('setError', 'Login failed. Please check your credentials.');
            }
        },
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
        getSelectedRelease(state) {
            return state.selectedRelease;
        },
    },
});

export default store;
