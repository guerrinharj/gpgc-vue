import { createStore } from 'vuex';
import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

const store = createStore({
    state: {
        artists: [],
        releases: [],
        featurings: [],
        soundtracks: [],
        selectedRelease: null, // To store the fetched release
        user: null,
        error: null,
    },
    mutations: {
        setArtists(state, artists) {
            state.artists = artists; 
        },
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
                const response = await axios.get('http://localhost:3000/api/v1/releases');
                const sortedReleases = response.data.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                commit('setReleases', sortedReleases);
            } catch (error) {
                console.error('Error fetching releases:', error);
                commit('setError', 'Failed to load releases.');
            }
        },
        async fetchFeaturings({ commit }) {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/featurings`);
                const sortedFeaturings = response.data.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                commit('setFeaturings', sortedFeaturings);
            } catch (error) {
                console.error('Error fetching featurings:', error);
                commit('setError', 'Failed to load featurings.');
            }
        },
        async fetchSoundtracks({ commit }) {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/soundtracks`);
                const sortedSoundtracks = response.data.sort((a, b) => b.year - a.year); // Sort by year
                commit('setSoundtracks', sortedSoundtracks);
            } catch (error) {
                console.error('Error fetching soundtracks:', error);
                commit('setError', 'Failed to load soundtracks.');
            }
        },
        async fetchRelease({ commit }, slug) {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/releases/${slug}`);
                commit('setSelectedRelease', response.data);
            } catch (error) {
                console.error('Error fetching release:', error);
                commit('setError', 'Failed to load release.');
            }
        },

        async createArtist({ state, commit }, artistData) {
            try {
                const response = await axios.post(`${API_BASE_URL}/api/v1/artists`, artistData, {
                    headers: {
                        Username: `${state.user.username}`,
                        Password:  `${state.user.password}`,
                    }
                });
    
                // Optional: Update artists state if needed
                commit('setArtists', [response.data, ...(state.artists || [])]); // Assuming `artists` state exists
                return true; // Indicate success
            } catch (error) {
                console.error('Error creating artist:', error);
                commit('setError', 'Failed to create artist.');
                return false; // Indicate failure
            }
        },

        
        async createRelease({ state, commit }, releaseData) {
            try {
                const response = await axios.post(`${API_BASE_URL}/api/v1/releases`, releaseData, {
                    headers: {
                        Username: `${state.user.username}`,
                        Password:  `${state.user.password}`,
                    }
                });
        
                // Update releases state with the newly created release
                commit('setReleases', [response.data, ...state.releases]);
                return true; // Indicate success
            } catch (error) {
                console.error('Error creating release:', error);
                commit('setError', 'Failed to create release.');
                return false; // Indicate failure
            }
        },


        async createFeaturing({ state, commit }, featuringData) {
            try {
                const response = await axios.post(`${API_BASE_URL}/api/v1/featurings`, featuringData, {
                    headers: {
                        Username: `${state.user.username}`,
                        Password:  `${state.user.password}`,
                    }
                });

                // Update featurings state with the newly created featuring
                commit('setFeaturings', [response.data, ...state.featurings]);
                return true; // Indicate success
            } catch (error) {
                console.error('Error creating featuring:', error);
                commit('setError', 'Failed to create featuring.');
                return false; // Indicate failure
            }
        },

        async createSoundtrack({ state, commit }, soundtrackData) {
            try {
                const response = await axios.post(`${API_BASE_URL}/api/v1/soundtracks`, soundtrackData, {
                    headers: {
                        Authorization: `Basic ${btoa(`${state.user.username}:${state.user.password}`)}`, // Encode username:password
                    },
                });
    
                // Update soundtracks state with the newly created soundtrack
                commit('setSoundtracks', [response.data, ...state.soundtracks]);
                return true; // Indicate success
            } catch (error) {
                console.error('Error creating soundtrack:', error);
                commit('setError', 'Failed to create soundtrack.');
                return false; // Indicate failure
            }
        },
        
        async login({ commit }, { username, password }) {
            try {
                const response = await axios.post(`${API_BASE_URL}/login`, {
                    username,
                    password,
                });
        
                if (response.status === 201) {
                    // Store username and password in state
                    commit('setUser', { username, password });
                    commit('setError', null);
                    return true; // Indicate success
                } else {
                    commit('setError', 'Login failed. Please check your credentials.');
                    return false; // Indicate failure
                }
            } catch (error) {
                console.error('Login error:', error);
                commit('setError', 'Login failed. Please check your credentials.');
                return false; // Indicate failure
            }
        },
        
        async logout({ commit }) {
            commit('setUser', null); // Clear the user state
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
        }
    },
});

export default store;
