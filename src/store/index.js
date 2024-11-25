import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        releases: [],
        featurings: [],
        soundtracks: [],
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
            const response = await axios.get('https://gpgc-api.onrender.com/releases');
            commit('setReleases', response.data);
        } catch (error) {
            console.error('Error fetching releases:', error);
            commit('setError', 'Failed to load releases.');
        }
        },
        async fetchFeaturings({ commit }) {
        try {
            const response = await axios.get('https://gpgc-api.onrender.com/featurings');
            commit('setFeaturings', response.data);
        } catch (error) {
            console.error('Error fetching featurings:', error);
            commit('setError', 'Failed to load featurings.');
        }
        },
        async fetchSoundtracks({ commit }) {
        try {
            const response = await axios.get('https://gpgc-api.onrender.com/soundtracks');
            commit('setSoundtracks', response.data);
        } catch (error) {
            console.error('Error fetching soundtracks:', error);
            commit('setError', 'Failed to load soundtracks.');
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
    },
});

export default store;
