/* =========================================================
   ELEMENTS
========================================================= */

const header =
    document.getElementById("header");

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");

const backToTop =
    document.getElementById("backToTop");

const scrollProgress =
    document.getElementById("scrollProgress");

const typingElement =
    document.getElementById("typingText");

const contactForm =
    document.getElementById("contactForm");

const sendButton =
    document.getElementById("sendButton");

const formNote =
    document.getElementById("formNote");

const yearElement =
    document.getElementById("year");

const sections =
    document.querySelectorAll("section[id]");

const navigationItems =
    document.querySelectorAll(".nav-links > a");

const revealElements =
    document.querySelectorAll(".reveal");


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("open");


        menuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        const icon =
            menuBtn.querySelector("i");


        if (icon) {

            icon.className =
                isOpen
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";

        }

    });

}


/* CLOSE MOBILE MENU */

navigationItems.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");


        if (menuBtn) {

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        const icon =
            menuBtn?.querySelector("i");


        if (icon) {

            icon.className =
                "fa-solid fa-bars";

        }

    });

});


/* =========================================================
   SCROLL
========================================================= */

function handleScroll() {

    const scrollY =
        window.scrollY;


    /* Navbar */

    if (scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }


    /* Back to top */

    if (scrollY > 600) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }


    /* Scroll progress */

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    const progress =
        documentHeight > 0
            ? (scrollY / documentHeight) * 100
            : 0;


    scrollProgress.style.width =
        `${progress}%`;


    /* Active navigation */

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;


        const sectionBottom =
            sectionTop +
            section.offsetHeight;


        if (
            scrollY >= sectionTop &&
            scrollY < sectionBottom
        ) {

            currentSection =
                section.id;

        }

    });


    navigationItems.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);


/* =========================================================
   BACK TO TOP
========================================================= */

if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   TYPING ANIMATION
========================================================= */

const roles = [

    "Python Full Stack Developer",

    "Django Developer",

    "Web Developer",

    "AI Enthusiast",

    "Problem Solver"

];


let roleIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeRole() {

    if (!typingElement) {

        return;

    }


    const currentRole =
        roles[roleIndex];


    if (!deleting) {

        characterIndex++;


        typingElement.textContent =
            currentRole.substring(
                0,
                characterIndex
            );


        if (
            characterIndex ===
            currentRole.length
        ) {

            deleting = true;


            setTimeout(
                typeRole,
                1600
            );


            return;

        }

    } else {

        characterIndex--;


        typingElement.textContent =
            currentRole.substring(
                0,
                characterIndex
            );


        if (characterIndex === 0) {

            deleting = false;


            roleIndex =
                (roleIndex + 1) %
                roles.length;

        }

    }


    setTimeout(
        typeRole,
        deleting ? 45 : 85
    );

}


typeRole();


/* =========================================================
   SCROLL REVEAL
========================================================= */

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add(
            "visible"
        );

    });

}


/* =========================================================
   CONTACT FORM
========================================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        () => {

            if (sendButton) {

                sendButton.disabled = true;


                sendButton.innerHTML = `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Sending...
                `;

            }


            if (formNote) {

                formNote.textContent =
                    "Sending your message...";

            }

        }
    );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   INITIALIZE
========================================================= */

handleScroll();