/* =========================================================
   ANGELA HARRIS
   CINEMATIC PR PORTFOLIO
   ========================================================= */

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   DOM
   ========================================================= */

const loader =
    document.querySelector("#loader");

const loaderPercentage =
    document.querySelector("#loaderPercentage");

const loaderProgressBar =
    document.querySelector("#loaderProgressBar");

const loaderBars =
    document.querySelectorAll(".loader-bars span");


const cursor =
    document.querySelector("#cursor");


const hero =
    document.querySelector("#hero");

const heroImage =
    document.querySelector("#heroImage");

const heroInformation =
    document.querySelector("#heroInformation");

const heroMessage =
    document.querySelector("#heroMessage");

const heroBottom =
    document.querySelector("#heroBottom");

const heroWord =
    document.querySelector("#heroWord");

const heroWordNext =
    document.querySelector("#heroWordNext");

const previousWord =
    document.querySelector("#previousWord");

const nextWord =
    document.querySelector("#nextWord");


const avatarTransition =
    document.querySelector("#avatarTransition");

const avatarWrap =
    document.querySelector("#avatarWrap");

const avatarImage =
    document.querySelector("#avatarImage");

const transitionMessage =
    document.querySelector("#transitionMessage");

const aboutOverlay =
    document.querySelector("#aboutOverlay");


const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;



/* =========================================================
   LENIS
   ========================================================= */

let lenis = null;


function initLenis() {

    if (
        prefersReducedMotion ||
        typeof Lenis === "undefined"
    ) {
        return;
    }


    lenis = new Lenis({

        duration: 1.1,

        smoothWheel: true,

        smoothTouch: false,

        wheelMultiplier: 0.85

    });


    lenis.on(
        "scroll",
        ScrollTrigger.update
    );


    gsap.ticker.add(
        (time) => {

            lenis.raf(
                time * 1000
            );

        }
    );


    gsap.ticker.lagSmoothing(0);

}



/* =========================================================
   LOADER
   ========================================================= */

function runLoader() {

    if (!loader) {

        startExperience();

        return;

    }


    gsap.set(
        loaderProgressBar,
        {
            width: "0%"
        }
    );


    loaderPercentage.textContent =
        "0%";


    gsap.set(
        loaderBars,
        {
            height: "5px"
        }
    );


    const timeline =
        gsap.timeline({

            onComplete:
                startExperience

        });


    /*
     * Animate blocks one by one.
     */

    loaderBars.forEach(
        (bar, index) => {

            timeline.to(
                bar,
                {

                    height:
                        `${15 + (index % 6) * 11}px`,

                    backgroundColor:
                        "#e7473c",

                    duration:
                        0.12,

                    ease:
                        "power2.out"

                },
                index === 0
                    ? 0
                    : "-=0.02"
            );

        }
    );


    /*
     * Progress bar + percentage.
     */

    timeline.to(
        loaderProgressBar,
        {

            width:
                "100%",

            duration:
                1.7,

            ease:
                "power2.inOut",

            onUpdate:
                function () {

                    const progress =
                        Math.round(
                            this.progress() *
                            100
                        );


                    loaderPercentage.textContent =
                        `${progress}%`;

                }

        },
        0
    );


    /*
     * Small pause.
     */

    timeline.to(
        {},
        {
            duration:
                0.25
        }
    );


    /*
     * Loader exits.
     */

    timeline.to(
        loader,
        {

            yPercent:
                -100,

            duration:
                1,

            ease:
                "power4.inOut"

        }
    );

}



/* =========================================================
   CURSOR
   ========================================================= */

function initCursor() {

    if (!cursor) {
        return;
    }


    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {

        cursor.style.display =
            "none";

        return;

    }


    window.addEventListener(
        "mousemove",
        (event) => {

            gsap.to(
                cursor,
                {

                    x:
                        event.clientX,

                    y:
                        event.clientY,

                    duration:
                        0.35,

                    ease:
                        "power3.out"

                }
            );

        }
    );


    const interactive =
        document.querySelectorAll(
            "a, button, .magnetic"
        );


    interactive.forEach(
        (element) => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursor.classList.add(
                        "active"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursor.classList.remove(
                        "active"
                    );

                }
            );

        }
    );

}



/* =========================================================
   MAGNETIC
   ========================================================= */

function initMagnetic() {

    const elements =
        document.querySelectorAll(
            ".magnetic"
        );


    elements.forEach(
        (element) => {

            element.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        element.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    gsap.to(
                        element,
                        {

                            x:
                                x * 0.15,

                            y:
                                y * 0.15,

                            duration:
                                0.35,

                            ease:
                                "power3.out"

                        }
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    gsap.to(
                        element,
                        {

                            x: 0,

                            y: 0,

                            duration:
                                0.6,

                            ease:
                                "elastic.out(1,.4)"

                        }
                    );

                }
            );

        }
    );

}



/* =========================================================
   HERO INTRO
   ========================================================= */

function heroIntro() {

    const elements = [

        heroInformation,

        document.querySelector(
            ".hero-word-wrapper"
        ),

        heroMessage,

        heroBottom,

        document.querySelector(
            ".scroll-indicator"
        )

    ].filter(Boolean);


    gsap.set(
        elements,
        {
            opacity: 0
        }
    );


    const timeline =
        gsap.timeline({

            delay:
                0.15

        });


    timeline.to(
        heroInformation,
        {

            opacity:
                1,

            duration:
                0.7,

            ease:
                "power3.out"

        }
    );


    timeline.to(
        ".hero-word-wrapper",
        {

            opacity:
                1,

            duration:
                1,

            ease:
                "power4.out"

        },
        "-=.4"
    );


    timeline.to(
        heroMessage,
        {

            opacity:
                1,

            duration:
                .7,

            ease:
                "power3.out"

        },
        "-=.5"
    );


    timeline.to(
        heroBottom,
        {

            opacity:
                1,

            duration:
                .6

        },
        "-=.4"
    );


    timeline.to(
        ".scroll-indicator",
        {

            opacity:
                1,

            duration:
                .5

        },
        "-=.25"
    );

}



/* =========================================================
   HERO WORDS
   ========================================================= */

const heroScenes = [

    "Publicity.",

    "Strategy.",

    "Influence.",

    "Storytelling.",

    "Visibility."

];


let currentScene = 0;


function changeHeroWord(
    newIndex,
    direction
) {

    if (
        newIndex === currentScene ||
        !heroWord ||
        !heroWordNext
    ) {
        return;
    }


    const incoming =
        heroScenes[newIndex];


    const distance =
        direction > 0
            ? 100
            : -100;


    heroWordNext.textContent =
        incoming;


    gsap.set(
        heroWordNext,
        {

            yPercent:
                distance,

            opacity:
                0

        }
    );


    const timeline =
        gsap.timeline();


    timeline.to(
        heroWord,
        {

            yPercent:
                -distance,

            opacity:
                0,

            duration:
                .35,

            ease:
                "power3.in"

        }
    );


    timeline.to(
        heroWordNext,
        {

            yPercent:
                0,

            opacity:
                1,

            duration:
                .45,

            ease:
                "power3.out"

        },
        "-=.1"
    );


    timeline.call(
        () => {

            const old =
                heroWord.textContent;


            heroWord.textContent =
                heroWordNext.textContent;


            heroWordNext.textContent =
                old;


            gsap.set(
                heroWord,
                {

                    yPercent: 0,

                    opacity: 1

                }
            );


            gsap.set(
                heroWordNext,
                {

                    yPercent:
                        direction > 0
                            ? 100
                            : -100,

                    opacity: 0

                }
            );

        }
    );


    currentScene =
        newIndex;

}



/* =========================================================
   HERO CINEMATIC SCROLL
   ========================================================= */

let heroTrigger = null;


function initHeroScroll() {

    if (!hero) {
        return;
    }


    const mobile =
        window.innerWidth < 768;


    heroTrigger =
        ScrollTrigger.create({

            trigger:
                hero,

            start:
                "top top",

            end:
                mobile
                    ? "+=3600"
                    : "+=6000",

            pin:
                true,

            scrub:
                1,

            anticipatePin:
                1,


            onUpdate:
                (self) => {

                    const progress =
                        self.progress;


                    /*
                     * Background.
                     */

                    if (heroImage) {

                        gsap.set(
                            heroImage,
                            {

                                scale:
                                    1.08 +
                                    progress * .22,

                                xPercent:
                                    progress * -4,

                                yPercent:
                                    progress * -3

                            }
                        );

                    }


                    /*
                     * Determine scene.
                     */

                    const scene =
                        Math.min(

                            heroScenes.length - 1,

                            Math.floor(
                                progress *
                                heroScenes.length
                            )

                        );


                    if (
                        scene !==
                        currentScene
                    ) {

                        changeHeroWord(

                            scene,

                            scene >
                            currentScene
                                ? 1
                                : -1

                        );

                    }


                    /*
                     * Hero content slowly
                     * leaves near the end.
                     */

                    const fadeStart =
                        .76;


                    if (
                        progress >
                        fadeStart
                    ) {

                        const fade =
                            gsap.utils.mapRange(
                                fadeStart,
                                1,
                                1,
                                0,
                                progress
                            );


                        gsap.set(
                            heroInformation,
                            {
                                opacity:
                                    fade
                            }
                        );


                        gsap.set(
                            heroMessage,
                            {
                                opacity:
                                    fade
                            }
                        );


                        gsap.set(
                            heroBottom,
                            {
                                opacity:
                                    fade
                            }
                        );

                    }

                }

        });

}



/* =========================================================
   HERO ARROWS
   ========================================================= */

function initHeroControls() {

    function move(
        direction
    ) {

        if (!heroTrigger) {
            return;
        }


        let target =
            currentScene +
            direction;


        target =
            Math.max(
                0,
                Math.min(
                    heroScenes.length - 1,
                    target
                )
            );


        if (
            target === currentScene
        ) {
            return;
        }


        const progress =
            target /
            (heroScenes.length - 1);


        const targetScroll =
            heroTrigger.start +
            (
                heroTrigger.end -
                heroTrigger.start
            ) *
            progress;


        if (lenis) {

            lenis.scrollTo(
                targetScroll,
                {
                    duration:
                        1.1
                }
            );

        } else {

            window.scrollTo({

                top:
                    targetScroll,

                behavior:
                    "smooth"

            });

        }

    }


    if (previousWord) {

        previousWord.addEventListener(
            "click",
            () => move(-1)
        );

    }


    if (nextWord) {

        nextWord.addEventListener(
            "click",
            () => move(1)
        );

    }

}

function initAvatarTransition() {

    if (
        !avatarTransition ||
        !avatarWrap ||
        !aboutOverlay
    ) {
        console.warn(
            "Avatar transition elements missing."
        );

        return;
    }


    const mobile =
        window.innerWidth < 768;


    /*
     * Initial position.
     */

    gsap.set(
        avatarWrap,
        {

            xPercent:
                -50,

            yPercent:
                -50,

            y:
                mobile
                    ? window.innerHeight * .95
                    : window.innerHeight * 1.05,

            opacity:
                0

        }
    );


    /*
     * About is invisible.
     */

    gsap.set(
        aboutOverlay,
        {

            opacity:
                0,

            pointerEvents:
                "none"

        }
    );


    /*
     * Message starts visible.
     */

    gsap.set(
        transitionMessage,
        {

            opacity:
                0

        }
    );


    /*
     * Timeline.
     */

    const timeline =
        gsap.timeline({

            scrollTrigger: {

                trigger:
                    avatarTransition,

                start:
                    "top top",

                end:
                    mobile
                        ? "+=2400"
                        : "+=3000",

                pin:
                    true,

                scrub:
                    1.25,

                anticipatePin:
                    1

            }

        });


    /* =====================================================
       PHASE 1 — AVATAR ENTERS
       ===================================================== */

    timeline.to(
        avatarWrap,
        {

            y:
                0,

            opacity:
                1,

            duration:
                1.2,

            ease:
                "power3.out"

        }
    );


    /* =====================================================
       PHASE 2 — HOLD
       ===================================================== */

    timeline.to(
        {},
        {

            duration:
                .9

        }
    );


    /* =====================================================
       PHASE 3 — CENTER MESSAGE
       ===================================================== */

    timeline.to(
        transitionMessage,
        {

            opacity:
                1,

            duration:
                .7,

            ease:
                "power2.out"

        }
    );


    /* =====================================================
       PHASE 4 — HOLD

       Avatar remains COMPLETELY unchanged.
       ===================================================== */

    timeline.to(
        {},
        {

            duration:
                .7

        }
    );


    /* =====================================================
       PHASE 5 — ABOUT CROSSFADE

       Avatar:
           1 -> .28

       About:
           0 -> 1
       ===================================================== */

    timeline.to(
        avatarWrap,
        {

            opacity:
                .28,

            duration:
                1.5,

            ease:
                "none"

        }
    );


    timeline.to(
        aboutOverlay,
        {

            opacity:
                1,

            duration:
                1.5,

            ease:
                "power2.out"

        },
        "<0.1"
    );


    /* =====================================================
       PHASE 6 — OLD TRANSITION MESSAGE FADES

       IMPORTANT:
       This does NOT affect avatar.
       ===================================================== */

    timeline.to(
        transitionMessage,
        {

            opacity:
                0,

            duration:
                .7,

            ease:
                "none"

        }
    );


    /* =====================================================
       PHASE 7 — HOLD FINAL SCREEN
       ===================================================== */

    timeline.to(
        {},
        {

            duration:
                1.2

        }
    );

}



/* =========================================================
   NAVIGATION
   ========================================================= */

function initNavigation() {

    const links =
        document.querySelectorAll(
            "a[href^='#']"
        );


    links.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            href
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    if (lenis) {

                        lenis.scrollTo(
                            target,
                            {
                                duration:
                                    1.2
                            }
                        );

                    } else {

                        target.scrollIntoView({

                            behavior:
                                "smooth"

                        });

                    }

                }
            );

        }
    );

}



/* =========================================================
   SCROLL INDICATOR
   ========================================================= */

function initScrollIndicator() {

    const line =
        document.querySelector(
            ".scroll-indicator"
        );


    if (!line) {
        return;
    }


    gsap.to(
        line,
        {

            y: 7,

            duration:
                1.1,

            repeat:
                -1,

            yoyo:
                true,

            ease:
                "sine.inOut"

        }
    );

}



/* =========================================================
   REDUCED MOTION
   ========================================================= */

function reducedMotionSetup() {

    gsap.set(
        avatarWrap,
        {

            y: 0,

            opacity:
                .28

        }
    );

    gsap.to(".avatar", {
    opacity: 0.35,
    duration: 1
});


    gsap.set(
        aboutOverlay,
        {

            opacity:
                1

        }
    );

}



/* =========================================================
   START
   ========================================================= */

function startExperience() {

    initLenis();

    initCursor();

    initMagnetic();

    heroIntro();

    initHeroScroll();

    initHeroControls();

    initAvatarTransition();

    initNavigation();

    initScrollIndicator();


    if (prefersReducedMotion) {

        reducedMotionSetup();

    }


    requestAnimationFrame(
        () => {

            ScrollTrigger.refresh();

        }
    );

}



/* =========================================================
   RESIZE
   ========================================================= */

let resizeTimer = null;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(
                () => {

                    ScrollTrigger.refresh();

                },
                250
            );

    }
);



/* =========================================================
   LOAD
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        runLoader();

    }
);