<template>
    <div class="about-page" ref="aboutPage" @wheel.passive="handleScroll">
        <div class="content-wrapper">
            <transition name="fade" mode="out-in">
                <p
                    v-if="currentParagraph !== null"
                    :key="currentParagraph"
                    class="paragraph"
                    v-html="paragraphs[currentParagraph]"
                ></p>
            </transition>
        </div>
    </div>
</template>


<script>
export default {
    name: 'AboutPage',
    data() {
        return {
            paragraphs: [
                `Hi, my name is Gabriel Pessoa Guerra Cavalcanti and I'm a musician, producer and web developer.`,
                `The purpose of this site is to catalog and serve as a streaming player to everything I’ve done related to "music".`,
                `As the years went by, and I got more and more cursed by this abstract entity called "music" I've made the questionable choice to constantly release stuff under different groups, pseudonyms, aliases, featurings, soundtracks etc. Making things harder to catalog.`,
                `The purpose here is to clarify it.`,
                `This website was built with Vue, powered by a Ruby on Rails API (<a href="http://gpgc-api.onrender.com">here's the documentation</a>). You can check the source codes from the front <a href="https://github.com/guerrinharj/gpgc-vue">here</a> and the back <a href="https://github.com/guerrinharj/gpgc-api">here</a>.`,
                `If you’d like to contact me, please send an email to <a href="mailto:gabrielpessoaguerracavalcanti@gmail.com">gabrielpessoaguerracavalcanti@gmail.com</a>.`
            ],
            currentParagraph: 0,
            isThrottled: false,
            scrollThreshold: 40 // adjust this as needed
        };
    },
    methods: {
        handleScroll(e) {
            if (this.isThrottled || Math.abs(e.deltaY) < this.scrollThreshold) return;

            this.isThrottled = true;
            setTimeout(() => (this.isThrottled = false), 400); // 800ms delay between scrolls

            if (e.deltaY > 0 && this.currentParagraph < this.paragraphs.length - 1) {
                this.currentParagraph++;
            } else if (e.deltaY < 0 && this.currentParagraph > 0) {
                this.currentParagraph--;
            }
        }
    }
};
</script>


<style>
.about-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: black;
    color: white;
    font-size: 1.6rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}

.content-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
    text-align: center;
}

.paragraph {
    max-width: 60%;
    transition: all 0.6s ease;
    margin: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
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
        font-size: 1.4rem;
    }

    .paragraph {
        max-width: 80%;
    }
}


</style>
