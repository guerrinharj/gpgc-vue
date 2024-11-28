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
        }
    },
    actions: {
        async fetchArtists({ commit }) {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/artists`);
                const sortedArtists = response.data;
                commit('setArtists', sortedArtists);
            } catch (error) {
                console.error('Error fetching artists:', error);
                commit('setError', 'Failed to load artists.');
            }
        },

        async fetchReleases({ commit }) {
            try {
                const response = await axios.get(`${API_BASE_URL}:3000/api/v1/releases`);
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
                const payload = {
                    name: artistData.name,
                    group: artistData.group,
                };
        
                const response = await axios.post(`${API_BASE_URL}/api/v1/artists`, payload, {
                    headers: {
                        Username: `${state.user.username}`,
                        Password: `${state.user.password}`,
                    },
                });
        
                // Update the state (array) with the new artist
                commit('setArtists', [response.data, ...(state.artists || [])]); 
                return true; // Indicate success
            } catch (error) {
                console.error('Error creating artist:', error);
                commit('setError', 'Failed to create artist.');
                return false; // Indicate failure
            }
        },
        
        

        
        async createRelease({ state, commit }, releaseData) {
            try {
                const payload = {
                    name: releaseData.name,
                    artist_name: releaseData.artist_name,
                    release_date: releaseData.release_date,
                    release_type: releaseData.release_type,
                    cover: releaseData.cover,
                    label: releaseData.label,
                    format: releaseData.format,
                    credits: releaseData.credits,
                    notes: releaseData.notes,
                    tracks: releaseData.tracks,
                    links: releaseData.links
                };
        
                const response = await axios.post(`${API_BASE_URL}/api/v1/releases`, payload, {
                    headers: {
                        Username: `${state.user.username}`,
                        Password: `${state.user.password}`,
                    },
                });
        
                // Update the state (array) with the new artist
                commit('setReleases', [response.data, ...(state.releases || [])]); 
                return true; // Indicate success
            } catch (error) {
                console.error('Error creating release:', error);
                commit('setError', 'Failed to create release.');
                return false; // Indicate failure
            }
        },


        async createFeaturing({ state, commit }, featuringData) {
            try {
                const payload = {
                    name: featuringData.name,
                    artist: featuringData.artist,
                    is_album: featuringData.is_album,
                    release_date: featuringData.release_date,
                    label: featuringData.label,
                    info: featuringData.info,
                    credit: featuringData.credit,
                    url: featuringData.url
                };
        
                const response = await axios.post(`${API_BASE_URL}/api/v1/featurings`, payload, {
                    headers: {
                        Username: `${state.user.username}`,
                        Password: `${state.user.password}`,
                    },
                });
        
                // Update the state (array) with the new artist
                commit('setFeaturings', [response.data, ...(state.featurings || [])]); 
                return true; // Indicate success
            } catch (error) {
                console.error('Error creating featuring:', error);
                commit('setError', 'Failed to create featuring.');
                return false; // Indicate failure
            }
        },


        async createSoundtrack({ state, commit }, soundtrackData) {
            try {
                const payload = {
                    name: soundtrackData.name,
                    company: soundtrackData.company,
                    year: soundtrackData.year,
                    kind: soundtrackData.kind,
                    info: soundtrackData.info,
                    url: soundtrackData.url
                };
        
                const response = await axios.post(`${API_BASE_URL}/api/v1/soundtracks`, payload, {
                    headers: {
                        Username: `${state.user.username}`,
                        Password: `${state.user.password}`,
                    },
                });
        
                
                commit('setSoundtracks', [response.data, ...(state.soundtracks || [])]); 
                return true; 
            } catch (error) {
                console.error('Error creating soundtrack:', error);
                commit('setError', 'Failed to create soundtrack.');
                return false; 
            }
        },



        async deleteRelease({ commit, state }, slug) {
            try {
                await axios.delete(`${API_BASE_URL}/api/v1/releases/${slug}`, {
                    headers: {
                        Username: `${state.user.username}`,
                        Password: `${state.user.password}`,
                    },
                });
                
                // Filter out the deleted release and commit the updated releases list
                const updatedReleases = state.releases.filter(release => release.slug !== slug);
                commit('setReleases', updatedReleases);
            } catch (error) {
                console.error('Error deleting release:', error.response?.data?.message || error.message);
                commit('setError', 'Failed to delete the release.');
            }
        },


        async deleteFeaturing({ commit, state }, slug) {
            try {
                await axios.delete(`${API_BASE_URL}/api/v1/featurings/${slug}`, {
                    headers: {
                        Username: `${state.user.username}`,
                        Password: `${state.user.password}`,
                    },
                });
    
                // Filter out the deleted featuring and update state
                const updatedFeaturings = state.featurings.filter(featuring => featuring.slug !== slug);
                commit('setFeaturings', updatedFeaturings);
            } catch (error) {
                console.error('Error deleting featuring:', error.response?.data?.message || error.message);
                commit('setError', 'Failed to delete the featuring.');
            }
        },


        async deleteSoundtrack({ commit, state }, slug) {
            try {
                await axios.delete(`${API_BASE_URL}/api/v1/soundtracks/${slug}`, {
                    headers: {
                        Username: `${state.user.username}`,
                        Password: `${state.user.password}`,
                    },
                });
    
                const updatedSoundtracks = state.soundtracks.filter(soundtrack => soundtrack.slug !== slug);
                commit('setSoundtracks', updatedSoundtracks);
            } catch (error) {
                console.error('Error deleting soundtrack:', error.response?.data?.message || error.message);
                commit('setError', 'Failed to delete the soundtrack.');
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
