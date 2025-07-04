<template>
    <div class="about-page" ref="aboutPage">
        <p
            v-for="(text, i) in paragraphs"
            :key="i"
            :ref="el => paragraphRefs[i] = el"
            class="paragraph"
        >
            <span v-html="text"></span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'AboutPage',
    data() {
        return {
            paragraphs: [
                `Hi, my name is Gabriel Pessoa Guerra Cavalcanti and i'm a musician, producer and web developer.`,
                `The purpose of this site is to catalog and serve as a streaming player to everything I’ve done related to "music".`,
                `As the years went by, and i got more and more cursed by this abstract entity called "music" I've made the questionable choice to constantly release stuff under different groups, pseudonyms, aliases, featurings, soundtracks etc. Making things harder to catalog. The purpose here is to clarify it.`,
                `This website was built with Vue, powered by a Ruby on Rails API (<a href="http://gpgc-api.onrender.com">here's the documentation</a>). You can check the source codes from the front <a href="https://github.com/guerrinharj/gpgc-vue">here</a> and the back <a href="https://github.com/guerrinharj/gpgc-api">here</a>.`,
                `If you’d like to contact me, please send an email to <a href="mailto:gabrielpessoaguerracavalcanti@gmail.com">gabrielpessoaguerracavalcanti@gmail.com</a>.`
            ],
            paragraphRefs: [],
        };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        this.handleScroll(); // trigger once on load
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            const centerY = window.innerHeight / 2;

            this.paragraphRefs.forEach((el) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const elCenter = rect.top + rect.height / 2;
                const distance = Math.abs(centerY - elCenter);
                const maxDistance = window.innerHeight / 2;

                const ratio = Math.min(distance / maxDistance, 1);
                const scale = 1 - ratio * 0.4;
                const opacity = 1 - ratio * 0.8;

                el.style.transform = `scale(${scale})`;
                el.style.opacity = opacity;
            });
        }
    }
};
</script>

<style>
.about-page {
    background: black;
    color: white;
    text-align: center;
    padding: 2rem;
    margin: auto;
    max-width: 50%;
}

.paragraph {
    transition: transform 0.2s ease-out, opacity 0.2s ease-out;
    transform-origin: center;
}

.about-page a {
    font-weight: 600;
}

.about-page a:hover {
    text-decoration: underline !important;
}

@media (max-width: 768px) {
    .about-page {
        max-width: 70%;
        font-size: 1.6rem;
    }
}

@media (max-width: 500px) {
    .about-page {
        max-width: 78%;
        padding: 2rem 0 10rem;
        font-size: 1.5rem;
    }
}
</style>
