<template>
    <div class="soundtrack-item">
        <div v-if="soundtrack.url">
            <a :href="soundtrack.url" target="_blank" rel="noopener noreferrer">
                <p><b>{{ soundtrack.name }}</b></p>
                <p>{{ soundtrack.company }}</p>
            </a>
                <p class="year">({{ soundtrack.year }})</p>
        </div>
        <div v-else>
            <p><b>{{ soundtrack.name }}</b></p>
            <p>{{ soundtrack.company }}</p>
            <p class="year">({{ soundtrack.year }})</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['soundtrack'],
};
</script>

<style>
.soundtrack-item {
    color: white;
    text-align: center;
    margin: 1rem;
    padding: 1rem;
}

.soundtrack-item p {
    margin: 0.1rem;
}

.soundtrack-item a {
    text-decoration: none; /* Remove underline for all links initially */
    color: white; /* Ensure the link matches the styling */
    cursor: pointer;
}

.soundtrack-item a:hover {
    text-decoration: underline; /* Add underline on hover */
}

.year {
    font-style: italic;
    padding-top: 9px;
    font-size: 1.1rem;
}
</style>
