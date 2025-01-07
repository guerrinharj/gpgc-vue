<template>
    <form @submit.prevent="submitForm" class="update-release-form">
        <div>
            <label for="name">Name</label>
            <textarea
                id="name"
                placeholder="Update the name of the release"
                v-model="form.name"
                required
            ></textarea>
        </div>
        
        <div>
            <label for="artist_name">Artist</label>
            <select id="artist_name" v-model="form.artist_name" required>
                <option v-for="artist in artists" :key="artist.id" :value="artist.name">
                    {{ artist.name }}
                </option>
            </select>
        </div>

        <div>
            <label for="release_type">Release Type</label>
            <select id="release_type" v-model="form.release_type" required>
                <option value="" disabled>Select Release Type</option>
                <option value="Album">Album</option>
                <option value="EP">EP</option>
                <option value="Single">Single</option>
            </select>
        </div>

        <div>
            <label for="release_date">Release Date</label>
            <input id="release_date" type="date" v-model="form.release_date" required />
        </div>

        <div>
            <label for="download_link">Download Link</label>
            <input id="download_link" v-model="form.download_link" required />
        </div>

        <div>
            <label for="cover">Cover</label>
            <textarea
                id="cover"
                placeholder="Update cover URLs separated by commas"
                v-model="form.cover"
                @change="updateArray('cover', form.cover)"
            ></textarea>
        </div>

        <div>
            <label for="label">Label</label>
            <textarea
                id="label"
                placeholder="Update labels separated by commas"
                v-model="form.label"
                @change="updateArray('label', form.label)"
            ></textarea>
        </div>
        
        <div>
            <label for="format">Format</label>
            <textarea
                id="format"
                placeholder="Update formats separated by commas"
                v-model="form.format"
                @change="updateArray('format', form.format)"
            ></textarea>
        </div>
        
        <div>
            <label for="notes">Notes</label>
            <textarea
                id="notes"
                placeholder="Update notes separated by commas"
                v-model="form.notes"
                @change="updateArray('notes', form.notes)"
            ></textarea>
        </div>        

        <div>
            <label for="tracks">Tracks</label>
            <div v-for="(track, index) in form.tracks" :key="index" class="track-input-group">
                <input
                    type="text"
                    placeholder="Track Name"
                    v-model="track.name"
                    required
                />
                <input
                    type="text"
                    placeholder="Track URL"
                    v-model="track.url"
                    required
                />
                <button type="button" @click="removeTrack(index)">remove</button>
            </div>
            <button id="add-track" type="button" @click="addTrack">add track</button>
        </div>

        <div>
            <label for="credits">Credits</label>
            <div v-for="(credit, index) in form.credits" :key="index" class="credit-input-group">
                <input
                    type="text"
                    placeholder="Credit Key"
                    v-model="credit.key"
                    required
                />
                <input
                    type="text"
                    placeholder="Credit Value"
                    v-model="credit.value"
                    required
                />
                <button type="button" @click="removeCredit(index)">remove</button>
            </div>
            <button id="add-credit" type="button" @click="addCredit">add credit</button>
        </div>

        <div>
            <label for="links">Links</label>
            <div v-for="(link, index) in form.links" :key="index" class="link-input-group">
                <input
                    type="text"
                    placeholder="Link Key"
                    v-model="link.key"
                    required
                />
                <input
                    type="text"
                    placeholder="Link Value"
                    v-model="link.value"
                    required
                />
                <button type="button" @click="removeLink(index)">remove</button>
            </div>
            <button id="add-link" type="button" @click="addLink">add link</button>
        </div>

        <button type="submit">update</button>
    </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: "UpdateReleaseForm",
    props: {
        slug: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            form: {
                name: '',
                artist_name: '',
                release_date: '',
                release_type: '',
                download_link: '',
                cover: [],
                label: [],
                format: [],
                credits: [],
                notes: [],
                tracks: [],
                links: [],
            }
        };
    },
    computed: {
        ...mapState(['artists']), // Bind Vuex state to the component
    },
    mounted() {
        this.loadRelease();
        this.fetchArtists();
    },
    methods: {
        ...mapActions(['updateRelease', 'fetchArtists', 'fetchRelease']),

        async loadRelease() {
        // Fetch release from Vuex or API if not already loaded
        const release = this.$store.getters.getReleaseBySlug
            ? this.$store.getters.getReleaseBySlug(this.slug)
            : null;

        if (!release) {
            try {
                await this.fetchRelease(this.slug); // Fetch from API if missing
                this.initializeForm();
            } catch (error) {
                console.error('Error fetching release:', error);
                alert('Failed to load release details.');
            }
        } else {
            this.initializeForm(release);
        }
    },

    initializeForm(release) {
        if (!release) {
            release = this.$store.getters.getReleaseBySlug(this.slug);
        }
        if (release) {
            this.form = {
                name: release.name || '',
                artist_name: release.artist_name || '',
                release_date: release.release_date || '',
                release_type: release.release_type || '',
                download_link: release.download_link || '',
                cover: release.cover?.join(', ') || '',
                label: release.label?.join(', ') || '',
                format: release.format?.join(', ') || '',
                credits: release.credits || [],
                notes: release.notes?.join(', ') || '',
                tracks: release.tracks || [],
                links: release.links || [],
            };
        } else {
            console.error('Release not found for slug:', this.slug);
        }
    },

        updateArray(field, value) {
            this.form[field] = value.split(',').map(item => item.trim());
        },

        addTrack() {
            this.form.tracks.push({ name: '', url: '' });
        },
        removeTrack(index) {
            this.form.tracks.splice(index, 1);
        },

        addCredit() {
            this.form.credits.push({ key: '', value: '' });
        },
        removeCredit(index) {
            this.form.credits.splice(index, 1);
        },

        addLink() {
            this.form.links.push({ key: '', value: '' });
        },
        removeLink(index) {
            this.form.links.splice(index, 1);
        },

        async submitForm() {
            try {
                await this.updateRelease({ slug: this.slug, data: this.form });
                alert('Release updated successfully!');
                this.$router.push(`/release/${this.slug}`);
            } catch (error) {
                console.error('Error updating release:', error);
                alert('Failed to update release.');
            }
        },
    },
};
</script>

<style>
/* Use styles similar to CreateReleaseForm */
.update-release-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

/* Add specific styles here if needed */
</style>
