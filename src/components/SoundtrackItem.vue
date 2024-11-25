<template>
    <div class="soundtrack-item">
        <h3 @click="goToSoundtrack">{{ soundtrack.title }}</h3>
        <p>{{ soundtrack.release_date }}</p>
    </div>
</template>

<script>
    export default {
    props: ['soundtrack'],
    methods: {
        goToSoundtrack() {
        // Replace with actual route if individual soundtrack detail page is implemented
        console.log(`Clicked on Soundtrack: ${this.soundtrack.title}`);
        },
    },
    };
</script>

<style>
    .soundtrack-item {
    cursor: pointer;
    color: white;
    text-align: center;
    margin: 1rem;
    }
</style>