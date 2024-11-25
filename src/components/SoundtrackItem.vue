<template>
    <div class="soundtrack-item">
        <h3 @click="goToSoundtrack">{{ soundtrack.name }}</h3>
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