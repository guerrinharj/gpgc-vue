<template>
    <transition name="fade" appear>
        <div class="release-page">
            <div class="box-wrapper">
                <div class="left-box">
                    <!-- Cover Images Section -->
                    <div class="release-cover" v-if="release?.cover?.length > 0">                      
                        <img :src="release.cover[0]" :alt="`${release.name} cover`" />
                    </div>

                    <!-- Actions Section -->
                    <div v-if="isAuthenticated && release" class="release-actions">
                        <p>
                            <router-link class="edit" :to="{ path: `/update-release/${release.slug}` }">
                                edit
                            </router-link>
                        </p>
                        <p>
                            <a class="delete" @click="deleteRelease">delete</a>
                        </p>
                    </div>


                    <!-- Download Button -->
                    <div class="download-button-wrapper">
                        <a
                            v-if="release?.tracks?.length > 0 && release.tracks[0].url"
                            @click="playTrackHandler(release.tracks[0])"
                            class="inline-button"
                        >
                            play
                        </a>

                        <span class="inline-separator"> &nbsp;  &nbsp; / &nbsp;  &nbsp;  </span>

                        <a
                            v-if="release.download_link"
                            :href="release.download_link"
                            download
                            class="inline-button"
                        >
                            download
                        </a>
</div>

                </div>

                <div class="right-box">
                    <!-- Title Section -->
                    <div class="release-titles">
                        <h1 class="release-name" v-if="release">
                            {{ release.name }}
                        </h1>
                        <h1 class="release-artist" v-if="release">{{ release.artist_name }}</h1>
                    </div>


                    <!-- Tracklist Section -->
                    <div class="release-tracks" v-if="release?.tracks?.length > 0">
                        <div class="info-item">
                            <b>Tracks</b>
                        </div>

                        <ol>
                            <li v-for="(track, index) in release.tracks" :key="index">
                                <button
                                    v-if="track.url"
                                    @click="playTrackHandler(track)"
                                    class="track-button"
                                >
                                    {{ track.name }}
                                </button>
                            </li>
                        </ol>
                    </div>

                    <!-- Info Section -->
                    <div class="lower-wrapper">
                        <transition name="dropdown">
                            <div class="info-box" v-show="showInfo">
                                <div v-if="release?.release_type" class="info-item">
                                    <b>Type</b>
                                    <span>{{ release.release_type }}</span>
                                </div>

                                <div v-if="release?.release_date" class="info-item">
                                    <b>Release date</b>
                                    <span>{{ release.release_date }}</span>
                                </div>

                                <div v-if="release?.label?.length > 0" class="info-item">
                                    <b>Label</b>
                                    <span v-for="label in release.label" :key="label">{{ label }}</span>
                                </div>

                                <div v-if="release?.format?.length > 0" class="info-item">
                                    <b>Formats</b>
                                    <span v-for="format in release.format" :key="format">{{ format }}</span>
                                </div>

                                <div v-if="filteredCredits.length > 0" class="info-item">
                                    <b>Credits</b>
                                    <span v-for="({ name, credit }) in filteredCredits" :key="name">
                                        <strong>{{ credit }}</strong>: {{ name }}
                                    </span>
                                </div>

                                <div v-if="release?.notes?.length > 0" class="info-item">
                                    <b>Notes</b>
                                    <span v-for="notes in release.notes" :key="notes">{{ notes }}</span>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>



<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            showInfo: true,
            currentCoverIndex: 0,
            coverInterval: null,
        };
    },
    computed: {
        ...mapGetters(['getSelectedRelease', 'isAuthenticated']),
        release() {
            return this.getSelectedRelease;
        },
        filteredLinks() {
            if (!this.release.links) return [];
            return Object.entries(this.release.links).map(([platform, url]) => ({ platform, url }));
        },
        filteredCredits() {
            if (!this.release.credits) return [];
            return Object.entries(this.release.credits).map(([credit, name]) => ({ credit, name }));
        }
    },
    methods: {
        ...mapActions(['playTrack']),

        async editRelease() {
            this.$router.push({ path: `/update-release/${this.release.slug}` });
        },

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
            clearInterval(this.coverInterval);
            this.coverInterval = setInterval(() => {
                this.currentCoverIndex =
                    (this.currentCoverIndex + 1) % this.release.cover.length;
            }, 3000);
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

    watch: {
        release(newVal) {
            if (newVal?.cover?.length > 1) {
                this.startCoverTransition();
            }
        },
    },

    beforeUnmount() {
        clearInterval(this.coverInterval);
    },
};
</script>


<style>
.release-page {
    background: black;
    color: white;
    text-align: center;
    padding: 5rem 1rem;
    width: 90vw;
    margin-bottom: 50px;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
}

.box-wrapper {
    display: flex;
    margin: auto;
    width: 100%
}

.box-wrapper .left-box, .box-wrapper .right-box {
    width: 50%;
}


.release-page b, h4 {
    text-decoration: underline
}

.release-page h1 {
    margin: 0.1rem;
}

.left-box {

    display: block;
}

.left-box .release-cover {
    width: 100%
}

.right-box {
    flex: 1;
    text-align: left;
}

.lower-box {
    padding-bottom: 20px;
}

.lower-wrapper {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
}

.info-box {
    width: 100%;
    margin-top: 3rem;
    text-align: left;
    margin: auto;
}


.info-item {
    text-align: left;
    font-size: 22px;
    margin-top: 20px;
}

.info-item b {
    display: block;
    text-decoration: underline;
    margin-bottom: 0.5rem;
}

.info-item span {
    display: block;
    margin-bottom: 0.3rem;
}


.information-box {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
}

.release-titles {
    margin-bottom: 36px;
    text-align: left;
    font-size: 36px;
}

.release-name {
    position: relative;
    display: inline-block;
    text-decoration: underline;
    cursor: pointer;
}

.release-name {
    font-size: 48px;
}
.release-artist {
    font-size: 28px;
}

.release-name:hover {
    opacity: 0.8;
    transition: ease-in-out 0.3s all;
}


.info-toggle {
    font-size: 30px;
}

.release-actions {
    font-size: 20px;
}

.edit {
    color: blue
}

.delete {
    color: red
}

.release-cover {
    display: block;
    padding: 1rem;
}


.release-cover img {
    max-width: 90%;
    height: auto;
}

.cover-slider {
    position: relative;
    width: 100%;
    max-width: 400px; 
    margin: auto; 
    overflow: hidden; 
    aspect-ratio: 1 / 1;
}

.cover-slider img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%; 
    height: 100%; 
    object-fit: cover;
    border-radius: 8px;
    opacity: 0; 
    transition: opacity 1s ease-in-out;
}

.cover-image {
    opacity: 0;
    transition: opacity 1s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.cover-image[v-show="true"] {
    opacity: 1 !important;
    z-index: 1;
}


.release-info {
    margin: 2rem 0;
    text-align: center;
}

.download-button-wrapper {
    margin: 10px;
}

.download-button-wrapper a {
    font-size: 28px;
    cursor: pointer;
}

.release-tracks ol {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.release-tracks li {
    text-align: left;
    margin-bottom: 0.5rem;
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
    background: none;
    border: none; 
    color: white; 
    font-family: inherit; 
    letter-spacing: -1px;
    font-size: 22px; 
    padding: 0;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.3s ease, text-decoration 0.3s ease; 
    text-transform: lowercase;
}

.release-tracks .track-button:hover {
    color: white; 
    text-decoration: underline; 
}

.release-tracks .track-button:active {
    color: gray; 
}

#links {
    display: none;
}

.info-toggle {
    cursor: pointer;
    text-decoration: underline;
    font-weight: bold;
    margin-top: 1rem;
    display: inline-block;
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.5s ease;
    overflow: hidden;
}

.dropdown-enter-from,
.dropdown-leave-to {
    max-height: 0;
    opacity: 0;
}

.dropdown-enter-to,
.dropdown-leave-from {
    max-height: 500px;
    opacity: 1;
}


.info-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.info-list > li {
    text-align: left;
}


.info-list b {
    text-decoration: underline;
    margin-bottom: 0.5rem;
}


.fade-enter-active,
.fade-leave-active {
    transition: opacity 1.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}




@media (max-width: 1024px) {
    .release-titles {
        font-size: 30px;
    }

    .release-name,
    .release-artist {
        font-size: 24px;
    }

    .release-actions {
        font-size: 18px;
    }

    .release-tracks .track-button {
        font-size: 18px;
    }

    .info-item {
        font-size: 14px;
    }
}

@media (max-width: 600px) {
    .release-titles {
        font-size: 24px;
    }

    .release-name,
    .release-artist {
        font-size: 20px;
    }

    .release-actions {
        font-size: 16px;
    }

    .release-tracks .track-button {
        font-size: 16px;
    }

    .info-item {
        font-size: 16px;
        letter-spacing: -1px;
    }
}


@media (max-width: 500px) {

    .release-page {
    background: #000;
    color: #fff;
    text-align: center;
    padding:0;
    width: 100%;
    margin-bottom: 50px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 31px;
    box-sizing: border-box;
}

.box-wrapper {
    display: block;
    width: 80%
}

.box-wrapper .left-box, .box-wrapper .right-box {
    width: 100%;
}


.release-page h1 {
    font-size: 24px;
}


.left-box {
    display: block; /* Disable flex on mobile */
    text-align: center;
    padding-top: 2vh;
}

.download-button-wrapper a {
    font-size: 18px;
}

.release-cover {
    display: block;
    padding: 0;
    margin: auto;
}

.release-cover img {
    max-width: 100%;
    height: auto;
}


.info-box {
    display: block; 
}


.release-tracks ol {
    padding-left: 0;
}

.release-tracks li {
    font-size: 0.8rem;
}

.release-tracks .track-button {
    font-size: 20px;
}

}
</style>
