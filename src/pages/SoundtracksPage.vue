<template>
    <div class="soundtracks-page">
        <SoundtrackItem
        v-for="soundtrack in soundtracks"
        :key="soundtrack.id"
        :soundtrack="soundtrack"
        />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import SoundtrackItem from '@/components/SoundtrackItem.vue';

    export default {
    name: 'SoundtracksPage',
    components: { SoundtrackItem },
    computed: mapState(['soundtracks']),
    created() {
        this.$store.dispatch('fetchSoundtracks');
    },
    };
</script>

<style>
    .soundtracks-page {
    background: black;
    color: white;
    text-align: center;
    padding: 2rem;
    }
</style>