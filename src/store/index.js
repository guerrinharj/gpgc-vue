import { createStore } from 'vuex';
import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

const store = createStore({
    state: {
        artists: [],
        releases: [],
        featurings: [],
        soundtracks: [],
        selectedRelease: null,
        user: null,
        error: null,
        playlist: [],
        currentTrackIndex: null, 
        currentTrack: {
            url: null,
            name: null,
            artist: null,
            release: null,
            slug: null
        },
        isPlayerVisible: false,
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
        setPlayerVisible(state, track) {
            state.isPlayerVisible = true;
            state.currentTrack = track; // Updates the state with track details
        },
        hidePlayer(state) {
            state.isPlayerVisible = false;
            state.currentTrack = {
                url: null,
                name: null,
                artist: null,
                release: null,
                releaseSlug: null
            };
        },
        setPlaylist(state, playlist) {
            state.playlist = playlist;
        },
        setCurrentTrackIndex(state, index) {
            state.currentTrackIndex = index;
        },
        playNextTrack(state) {
            if (state.currentTrackIndex !== null && state.currentTrackIndex < state.playlist.length - 1) {
                state.currentTrackIndex += 1;
            }
        },
        playPreviousTrack(state) {
            if (state.currentTrackIndex > 0) {
                state.currentTrackIndex -= 1;
            }
        },
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

        async fetchArtistReleases({ commit }, artistSlug) {
            try {
                // Fetch artist with releases
                const response = await axios.get(`${API_BASE_URL}/api/v1/artists/${artistSlug}`);
                
                const artist = response.data;

                const releases = artist.releases

                return releases;
            } catch (error) {
                console.error('Error fetching artist with releases:', error);
                commit('setError', 'Failed to load artist details.');
            }
        },

        async fetchReleases({ commit }) {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/releases`);
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
                    download_link: releaseData.download_link,
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


        async deleteArtist({ commit, state }, slug) {
            try {
                await axios.delete(`${API_BASE_URL}/api/v1/artists/${slug}`, {
                    headers: {
                        Username: `${state.user.username}`,
                        Password: `${state.user.password}`,
                    },
                });
    
                const updatedArtists = state.artists.filter(artist => artist.slug !== slug);
                commit('setArtists', updatedArtists);
            } catch (error) {
                console.error('Error deleting artist:', error.response?.data?.message || error.message);
                commit('setError', 'Failed to delete the artist.');
            }
        },


        async updateRelease({ commit, state }, { slug, data }) {
            try {
                // Make the PUT request to update the release
                const response = await axios.put(`${API_BASE_URL}/api/v1/releases/${slug}`, data, {
                    headers: {
                        Username: state.user?.username,
                        Password: state.user?.password,
                    },
                });
    
                // Get the updated release from the response
                const updatedRelease = response.data;
    
                // Update the releases array in the Vuex state
                const updatedReleases = state.releases.map((release) =>
                    release.slug === slug ? updatedRelease : release
                );
    
                commit('setReleases', updatedReleases);
    
                return updatedRelease; // Optionally return the updated release
            } catch (error) {
                console.error('Error updating release:', error.response?.data || error.message);
                commit('setError', 'Failed to update the release.');
                throw error; // Rethrow the error to handle it in the calling component
            }
        },


        async updateArtist({ commit, state }, { slug, data }) {
            try {
                const response = await axios.put(`${API_BASE_URL}/api/v1/artists/${slug}`, data, {
                    headers: {
                        Username: state.user?.username,
                        Password: state.user?.password,
                    },
                });
    
                const updatedArtist = response.data;
    
                const updatedArtists = state.artists.map((artist) =>
                    artist.slug === slug ? updatedArtist : artist
                );
    
                commit('setArtists', updatedArtists);
    
                return updatedArtist;
            } catch (error) {
                console.error('Error updating artist:', error.response?.data || error.message);
                commit('setError', 'Failed to update the artist.');
                throw error; 
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


        playTrack({ commit }, { track, playlist }) {
            commit('setPlaylist', playlist);
            const trackIndex = playlist.findIndex((t) => t.url === track.url);
        
            if (trackIndex !== -1) {
                commit('setCurrentTrackIndex', trackIndex);
                commit('setPlayerVisible', true);
            }
        },

        
        playNextTrack({ commit }) {
            commit('playNextTrack');
        },
        playPreviousTrack({ commit }) {
            commit('playPreviousTrack');
        },

        
    },
    getters: {
        isAuthenticated(state) {
            return !!state.user;
        },
        getError(state) {
            return state.error;
        },
        getArtists(state) {
            return state.artists;
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
        getCurrentTrack: (state) => state.currentTrack,
        isPlayerVisible: (state) => state.isPlayerVisible,
        currentTrack(state) {
            return state.playlist[state.currentTrackIndex] || null;
        },
        getReleaseBySlug: (state) => (slug) => {
            return state.releases.find((release) => release.slug === slug) || null;
        },
        getArtistBySlug: (state) => (slug) => {
            return state.artists.find((artist) => artist.slug === slug) || null;
        },
    },
});

export default store;
