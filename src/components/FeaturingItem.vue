<template>
    <div class="featuring-item">
        <h3 @click="goToFeaturing">{{ featuring.featuring_name }}</h3>
        <p>{{ featuring.label }}</p>
    </div>
</template>

<script>
export default {
props: ['featuring'],
methods: {
    goToFeaturing() {
    // Replace with actual route if individual featuring detail page is implemented
    console.log(`Clicked on Featuring: ${this.featuring.featuring_name}`);
    },
},
};
</script>

<style>
    .featuring-item {
    cursor: pointer;
    color: white;
    text-align: center;
    margin: 1rem;
    }
</style>