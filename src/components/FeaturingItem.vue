<template>
    <div class="featuring-item">
        <div v-if="featuring.url">
            <a :href="featuring.url" target="_blank" rel="noopener noreferrer">
                <p>{{ featuring.name }}</p>
                <p>{{ featuring.artist }}</p>
            </a>
        </div>
        <div v-else>
            <p>{{ featuring.name }}</p>
            <p>{{ featuring.artist }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['featuring'],
    };
</script>

<style>
    .featuring-item {
        color: white;
        text-align: center;
        margin: 1rem;
        padding: 1rem;
    }

    /* Style for anchor tags in featuring items */
    .featuring-item a {
        text-decoration: none; /* Remove underline */
        color: white; /* Match the color of the text */
        cursor: pointer;
    }

    .featuring-item a:hover {
        text-decoration: underline; /* Add underline on hover */
    }
</style>
