<template>
    <div class="about-page">
        <div class="content-wrapper">
            <p
                v-for="(paragraph, index) in paragraphs"
                :key="index"
                class="paragraph"
                v-html="paragraph"
            ></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutPage',

    data() {
        return {
            paragraphs: [
                `Hi, my name is <b>Gabriel Pessoa Guerra Cavalcanti</b>`,
                `I'm a musician, producer and web developer.`,
                `The purpose of this site is to catalog and serve as a streaming player to everything I’ve done related to <b>"music"</b>.`,
                `You can also download it.`,
                `As the years went by, and I got more and more cursed by this abstract entity called <b>"music"</b>`,
                `I've made the questionable choice to constantly release stuff under different groups, pseudonyms, aliases, featurings, soundtracks etc. Making things harder to catalog.`,
                `So we're gonna <b>clarify it</b>.`,
                `Not everything still exists, some files and links just got lost or broken.`,
                `But they are documented here.`,
                `This website was built with <b>Vue</b>, powered by a <b>Ruby on Rails API</b> (<a href="http://gpgc-api.onrender.com">here's the documentation</a>). You can check the source codes from the front <a href="https://github.com/guerrinharj/gpgc-vue">here</a> and the back <a href="https://github.com/guerrinharj/gpgc-api">here</a>.`,
                `If you’d like to contact me, please <b><a href="mailto:gabrielpessoaguerracavalcanti@gmail.com">send an email</a></b>.`
            ]
        };
    }
};
</script>

<style>
.about-page {
    width: 100vw;
    min-height: 100vh;
    background: black;
    color: white;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 0;
}

.content-wrapper {
    width: 100%;
    max-width: 900px;
    padding: 0 2rem;
    text-align: center;
}

.paragraph {
    margin: 0 0 1.5rem;
}

.about-page a {
    font-weight: 600;
    color: white;
}

.about-page a:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .about-page {
        font-size: 1.2rem;
        letter-spacing: -1px;
    }
}
</style>