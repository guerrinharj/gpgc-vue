<template>
    <div class="about-page">
        <p>You’ve stumbled upon a terrible fate… my website.</p>

        <p>The purpose of this site is to catalog everything I’ve done related to "music."
        Over the years, as part of this curse called "music," I made the choice to release under various pseudonyms and participate in many different groups. Constantly keeping up with a frantic release schedule didn’t make things any easier.</p>

        <p>I'm also a full stack developer. This website was built with Vue, powered by a Ruby on Rails API (<a href="http://gpgc-api.onrender.com">here's the documentation</a>). You can check the source codes from the front <a href="https://github.com/guerrinharj/gpgc-vue">here</a> and the back <a href="https://github.com/guerrinharj/gpgc-api">here</a>.</p>

        <p>If you’d like to contact me, please send an email to <a href="mailto:gabrielpessoaguerracavalcanti@gmail.com">gabrielpessoaguerracavalcanti@gmail.com</a></p>
    </div>
</template>

<script>
    export default {
    name: 'AboutPage',
    };
</script>

<style>
    .about-page {
        background: black;
        color: white;
        text-align: center;
        padding: 2rem;
        margin: auto;
        max-width: 30%
    }

    .about-page a {
        font-weight: 600 ;
    }

    .about-page a:hover{
        text-decoration: underline!important;
    }
</style>
