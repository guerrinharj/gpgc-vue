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
                    <div class="release-title-box release-titles">
                        <h1 class="release-name" v-if="release">
                            {{ release.name }}
                        </h1>
                        <h1 class="release-artist" v-if="release">{{ release.artist_name }}</h1>
                    </div>

                    <!-- Tracklist Section -->
                    <div class="release-tracks" v-if="release?.tracks?.length > 0">

                        <ol>
                            <li v-for="(track, index) in release.tracks" :key="index">
                                <button
                                    v-if="track.url"
                                    @click="playTrackHandler(track)"
                                    class="track-button"
                                >
                                    {{ index + 1 }}. <span class="track-name">{{ track.name }}</span>
                                </button>
                            </li>
                        </ol>
                    </div>

                    <!-- Info Section -->
                    <div class="lower-wrapper">
                        <transition name="dropdown">
                            <div class="info-box" v-show="showInfo">
                                <div v-if="release?.release_type" class="info-item">
                                    <b>Type:</b>
                                    <span>{{ release.release_type }}</span>
                                </div>

                                <div v-if="release?.release_date" class="info-item">
                                    <b>Release Date:</b>
                                    <span>{{ release.release_date }}</span>
                                </div>

                                <div v-if="release?.label?.length > 0" class="info-item">
                                    <b>Label</b>
                                    <span v-for="label in release.label" :key="label">{{ label }}</span>
                                </div>

                                <div v-if="release?.format?.length > 0" class="info-item">
                                    <b>Formats: </b>
                                    <span>{{ release.format.join(', ') }}</span>
                                </div>

                                <div class="credits-area">

                                    <div v-if="release?.notes?.length > 0" class="info-item">
                                        <p v-for="notes in release.notes" :key="notes">{{ notes }}</p>
                                    </div>

                                    <div v-if="filteredCredits.length > 0" class="info-item info-credits">
                                        <p v-for="({ name, credit }) in filteredCredits" :key="name">
                                            <b>{{ credit }}</b>: {{ name }}
                                        </p>
                                    </div>
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
    text-align: left;
    padding: 5rem 1rem;
    margin-bottom: 50px;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
}

.box-wrapper {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    margin: auto;
    text-align: left;
}

.box-wrapper .left-box,
.box-wrapper .right-box {
    flex: 1;
    width: 50%;
    text-align: left;
}


.release-cover img {
    width: 100%;
}

.download-button-wrapper {
    text-align: center;
    font-size: 18px;
    cursor: pointer;
}

.release-title-box.release-titles, .release-tracks {
    padding-bottom: 48px;
}

.release-name {
    font-size: 48px;
    text-transform: uppercase
}


.track-button {
    font-size: 24px;
    cursor: pointer;
}

.track-name {
    margin: 8px;
}

.track-button:hover .track-name {
    text-decoration: underline;
}

.info-item {
    font-size: 18px;
    margin: 2px;
    letter-spacing: -1px
}

.info-item span {
    margin: 8px;
}

.info-item p {
    margin: 0;
}

.credits-area {
    transform: translateY(30px);
}

@media (max-width: 1024px) {
    .box-wrapper {
        flex-direction: column;
        width: 90%;
    }

    .box-wrapper .left-box,
    .box-wrapper .right-box {
        width: 100%;
    }
}
</style>
