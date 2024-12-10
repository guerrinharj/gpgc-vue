<template>
    <div class="release-page">
        <div class="release-titles">
            <h1 class="release-name">{{ release.name }}</h1>
            <h1>{{ release.artist_name }}</h1>
        </div>

        <div v-if="isAuthenticated" class="release-actions">
            <p>
                <a class="delete" @click="deleteRelease">delete</a>
            </p>
        </div>

        <!-- Display Cover Images -->
        <div class="release-cover" v-if="release.cover && release.cover.length > 0">
            <div v-if="release.cover.length === 1" class="cover-image">
                <img :src="release.cover[0]" :alt="`${release.name} cover`" />
            </div>
            <div v-else class="cover-slider">
                <img
                    v-for="(image, index) in release.cover"
                    :key="index"
                    :src="image"
                    :alt="`${release.name} cover ${index + 1}`"
                    loading="lazy"
                    class="cover-image"
                    :style="{ opacity: currentCoverIndex === index ? 1 : 0 }"
                />
            </div>
        </div>

                <!-- Display Track List -->
        <div class="release-tracks" v-if="release.tracks && release.tracks.length > 0">
            <h4>Tracklist</h4>
            <ul>
                <li v-for="(track, index) in release.tracks" :key="index">
                    <button 
                        v-if="track.url" 
                        @click="playTrackHandler(track)"
                        class="track-button">
                        {{ track.name }}
                    </button>
                </li>
            </ul>
        </div>

        <div id="release-date" v-if="release.release_date" class="release-info">
            <b>Release date</b>
            <span>{{ release.release_date }}</span>
        </div>

        <div id="label" v-if="release.label && release.label.length > 0" class="release-info">
            <b>Label</b>
            <ul>
                <li v-for="label in release.label" :key="label">{{ label }}</li>
            </ul>
        </div>

        <div id="formats" v-if="release.format && release.format.length > 0" class="release-info">
            <b>Formats</b>
            <ul>
                <li v-for="format in release.format" :key="format">{{ format }}</li>
            </ul>
        </div>

        <div id="credits" v-if="filteredCredits.length > 0" class="release-info">
            <b>Credits</b>
            <ul>
                <li v-for="({ name, credit }) in filteredCredits" :key="name">
                    <strong>{{ credit }}</strong>: {{ name }}
                </li>
            </ul>
        </div>

        <div id="notes" v-if="release.notes && release.notes.length > 0" class="release-info">
            <b>Notes</b>
            <ul>
                <li v-for="notes in release.notes" :key="notes">{{ notes }}</li>
            </ul>
        </div>

        <div id="links" v-if="filteredLinks.length > 0" class="release-info">
            <b>Links</b>
            <ul>
                <li v-for="({ platform, url }) in filteredLinks" :key="platform">
                    <a :href="url" target="_blank" rel="noopener noreferrer">{{ platform }}</a>
                </li>
            </ul>
        </div>


    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            currentCoverIndex: 0, // Track the current index of the displayed cover
        };
    },
    computed: {
        ...mapGetters(['getSelectedRelease', 'isAuthenticated']),
        release() {
            return this.getSelectedRelease;
        },
        filteredLinks() { 
            if (!this.release.links) return []; // In case "links" is null, return an empty array to avoid errors. 
            return Object.entries(this.release.links) // Transform the array of objects "release.links" into an array that follow the pattern ["key", "value"]
                .map(([platform, url]) => ({ platform, url })); // Use `platform` and `url` in the final result
        },
        filteredCredits() {
            if (!this.release.credits) return [];
            return Object.entries(this.release.credits) 
                .map(([credit, name]) => ({ credit, name }));
            
        }
    },
    methods: {
        ...mapActions(['playTrack']),
        async deleteRelease() {
            const confirmed = confirm(`Are you sure you want to delete "${this.release.name}"?`);
            if (!confirmed) return;

            try {
                await this.$store.dispatch('deleteRelease', this.release.slug);
                alert('Release deleted successfully!');
                this.$router.push('/');
            } catch (error) {
                console.error('Error deleting release:', error);
                alert('Failed to delete the release. Please try again.');
            }
        },



        playTrackHandler(track) {
            const playlist = this.release.tracks.map((t) => ({
                ...t,
                artist: this.release.artist_name,
                release: this.release.name,
                releaseSlug: this.release.slug,
            }));

            const trackIndex = playlist.findIndex((t) => t.url === track.url);

            if (trackIndex !== -1) {
                this.playTrack({ track: playlist[trackIndex], playlist });
            }
        },

        startCoverTransition() {
            if (this.release.cover && this.release.cover.length > 1) {
                setInterval(() => {
                    this.currentCoverIndex =
                        (this.currentCoverIndex + 1) % this.release.cover.length;
                }, 3000); // Change cover every 3 seconds
            }
        },
    },
    
    created() {
        const slug = this.$route.params.slug;

        if (!this.release || this.release.slug !== slug) {
            this.$store.dispatch('fetchRelease', slug).catch((error) => {
                console.error('Error loading release:', error);
                alert('Failed to load release details.');
            });
        }

        this.startCoverTransition();
        window.scrollTo(0, 0);
    },
};
</script>

<style>
.release-page {
    background: black;
    color: white;
    text-align: center;
    padding: 2rem;
    margin-bottom: 50px
}

.release-page b, h4 {
    text-decoration: underline;
}

.release-page h1 {
    margin: 0.1rem;
}

.release-titles {
    margin-bottom: 10px;
}

.release-name {
    text-decoration: underline;
}

.release-actions {
    font-size: 1.1rem;
}

.delete {
    color: red
}

/* Cover images are stacked on top of each other */
.release-cover {
    display: block;
    margin: auto;
    padding: 1rem;
}

.cover-image {
    margin-bottom: 1rem;
}

.cover-image img {
    max-width: 400px;
    height: auto;
    border-radius: 8px;
}

.cover-slider {
    position: relative;
    width: 100%;
    max-width: 400px; /* Ensure the max width is consistent */
    margin: auto; /* Center the slider horizontally */
    overflow: hidden; /* Prevent content overflow */
    aspect-ratio: 1 / 1; /* Maintain a square aspect ratio (adjust as needed) */
}

.cover-slider img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%; /* Ensure images take the full width of the container */
    height: 100%; /* Ensure images take the full height of the container */
    object-fit: cover; /* Maintain aspect ratio and crop the image if necessary */
    border-radius: 8px; /* Optional: Keep rounded corners */
    opacity: 0; /* Default to invisible */
    transition: opacity 1s ease-in-out;
}

.cover-slider img[v-show="true"] {
    opacity: 1; /* Make the currently active image visible */
}

.release-info {
    margin: 2rem 0;
    text-align: center;
}

.release-info b {
    display: block;
    margin-bottom: 0.5rem;
}

.release-tracks {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.release-tracks {
    padding: 0.2rem;
}

.release-tracks h4 {
    margin: 0;
}

.release-tracks ul {
    list-style-type: none;
    padding: 0;
    text-align: center;
}

.release-tracks li {
    margin: 0;
    text-align: center;
}

.release-tracks a {
    color: white!important;
}

.release-tracks a {
    color: lightblue;
    text-decoration: none;
    margin-left: 5px;
}

.release-tracks a:hover {
    text-decoration: underline; 
}

.release-info ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.release-info li {
    margin: 0.1rem 0;
    text-align: center;
}

.release-info a {
    color: inherit;
    text-decoration: none;
}

.release-info a:hover {
    text-decoration: underline;
}


.release-tracks .track-button {
    background: none; /* Remove default button background */
    border: none; /* Remove default button border */
    color: white; /* Match the link color */
    font-family: inherit; /* Use the page's font */
    letter-spacing: -2px;
    font-size: 1.5rem; /* Adjust font size for readability */
    cursor: pointer; /* Show a pointer cursor */
    text-decoration: none; /* Remove underline */
    transition: color 0.3s ease, text-decoration 0.3s ease; /* Add smooth hover effect */
    text-transform: lowercase; /* Match the page's text style */
}

.release-tracks .track-button:hover {
    color: white; /* Change color on hover */
    text-decoration: underline; /* Optional: Add underline on hover */
}

.release-tracks .track-button:active {
    color: gray; /* Add feedback for active state */
}

#links {
    display: none;
}

#credits, #notes, #label, #formats, #release-date {
    font-size: 1.2rem;
}

@media (max-width: 500px) {

    .release-page h1 {
        font-size: 26px;
    }

    .cover-image img {
        max-width: 240px;
    }

    .release-tracks li {
        font-size: 0.8rem;
    }

    .release-tracks .track-button {
        font-size: 1.4rem;
    }
    
}
</style>
