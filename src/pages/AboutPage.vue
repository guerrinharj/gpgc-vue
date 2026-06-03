<template>
    <div class="about-page">
        <div
            class="content-wrapper"
            v-html="aboutText"
        ></div>
    </div>
</template>

<script>
export default {
    name: 'AboutPage',

    data() {
        return {
            aboutText: `
                <p>Hi, my name is <b>Gabriel Pessoa Guerra Cavalcanti</b>. I'm a musician, producer and web developer and the purpose of this site is to catalog and serve as a streaming player to everything I've done related to <b>music</b>. 
                <p>As the years went by, and I got more and more cursed by this abstract entity called <b>music</b>, I've made the questionable choice to constantly release stuff under different groups, pseudonyms, aliases, featurings, soundtracks etc., making things harder to catalog. I've also released under different labels such as Future Times, PAN, Superconscious Records, 2 Headed Deer, Confuso Editions, etc and managed labels such as 40% Foda/Maneirissimo and <a href="gpgc.info/label">GPGC</a>.</p>
                <p>To clarify, not everything still exists; some files and links just got lost or broken, but they are documented here. </p>
                <p>This website was built with <b>Vue</b>, powered by a <b>Ruby on Rails API</b> (<a href="http://gpgc-api.onrender.com">documentation</a>). You can check the source code from the front <a href="https://github.com/guerrinharj/gpgc-vue">here</a> and the back <a href="https://github.com/guerrinharj/gpgc-api">here</a>. If you'd like to contact me, please <a href="mailto:gabrielpessoaguerracavalcanti@gmail.com"><b>send an email</b></a>.</p>
            `
        };
    }
};
</script>

<style>
.content-wrapper {
    max-width: 800px;
    text-align: left;
    line-height: 1.8;
    letter-spacing: -1px;
    padding: 2rem;
}
</style>