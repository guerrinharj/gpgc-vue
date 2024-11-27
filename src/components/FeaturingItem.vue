<template>
    <div class="featuring-item">
        <div v-if="featuring.url">
            <a :href="featuring.url" target="_blank" rel="noopener noreferrer">
                <p><b>{{ featuring.name }}</b></p>
                <p>{{ featuring.artist }}</p>
            </a>
                <p><em>{{ formattedCredit }}</em></p>
            
        </div>
        <div v-else>
            <p><b>{{ featuring.name }}</b></p>
            <p>{{ featuring.artist }}</p>
            <p><em>{{ formattedCredit }}</em></p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['featuring'],
    computed: {
        formattedCredit() {
            return Array.isArray(this.featuring.credit) 
                ? this.featuring.credit.join(', ') 
                : this.featuring.credit;
        }
    }
};
</script>

<style>
    .featuring-item {
        color: white;
        text-align: center;
        margin: 1rem;
        padding: 1rem;
    }

    .featuring-item p {
        margin: 0.1rem;
    }

    .featuring-item em {
        font-style: italic; /* Ensure italic styling */
        font-size: 1.1rem
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
