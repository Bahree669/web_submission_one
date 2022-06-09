document.querySelector(".header-toggle").addEventListener("click", toggleMenu);
document.querySelector(".header-toggle-close").addEventListener("click", toggleMenu);

const headerNavbarLists = document.querySelectorAll(".header-navbar-list");
const navigationBar = document.querySelector(".header-navbar");

// close navigation menu everytime a link is clicked
headerNavbarLists.forEach((list) => list.addEventListener("click", closeNavigation));

function closeNavigation() {
    navigationBar.classList.remove("open-nav");
    document.body.style.overflowY = "scroll";
}

function openNavigation() {
    navigationBar.classList.add("open-nav");
    document.body.style.overflowY = "hidden";
}

function displayNavbarList(open) {
    if (open) {
        headerNavbarLists.forEach((list) => {
            list.classList.add("list-visible");
        });
    } else {
        headerNavbarLists.forEach((list) => {
            list.classList.remove("list-visible");
        });
    }
}

// toggling the navigation
function toggleMenu(e) {
    const target = e.target;

    if (target.classList.contains("header-toggle")) {
        openNavigation();
        displayNavbarList(true);
    } else {
        displayNavbarList(false);

        // add closing animation to navigation menu
        navigationBar.style.animationName = "close-nav";

        // remove navigation after the animation ended
        setTimeout(() => {
            closeNavigation();
            navigationBar.style.animationName = "";
        }, 500);
    }
}

// add animation when revealing image
const images = document.querySelectorAll("img");
images.forEach((img) => img.addEventListener("load", displayImage));

function displayImage(e) {
    const target = e.target;
    target.classList.add("img-loaded");
}

// add hover animation to service image bg
const itemImages = document.querySelectorAll(".item-image");
const serviceItems = document.querySelectorAll(".service-item");

serviceItems.forEach((item) => item.addEventListener("mouseenter", scaleImage));

serviceItems.forEach((item) => item.addEventListener("mouseleave", unScaleImage));

function scaleImage(e) {
    const target = e.target;
    const child = target.children[1];
    child.classList.add("scale-image");
}

function unScaleImage(e) {
    const target = e.target;
    const child = target.children[1];
    child.classList.remove("scale-image");
}

// CAROUSEL
let carouselContainerWidth = document.querySelector(".service-bottom").getBoundingClientRect().width;
const carousel = document.querySelector(".carousel");

const carouselItems = document.querySelectorAll(".service-item");
const carouselItemWidth = carouselItems[0].getBoundingClientRect().width;

const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

let counter = 0;
const itemMargin = 25;
// Set the carousel width
setCarouselWidth();

let carouselWidth = carousel.getBoundingClientRect().width;

let diff = Math.abs(carouselContainerWidth - carouselWidth);
let stepSize = carouselItemWidth + itemMargin;
let stepLeft = Math.round(diff / stepSize);

nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);

function nextSlide() {
    if (stepLeft === 1) {
        stepSize = carouselItemWidth + itemMargin * 4;
    }
    if (counter < stepLeft) {
        counter++;

        carousel.style.transition = "all .5s ease-in-out";
        carousel.style.transform = `translateX(-${counter * stepSize}px)`;
    }
}

function prevSlide() {
    if (counter <= 0) return;
    counter--;
    carousel.style.transition = "all .5s ease-in-out";
    carousel.style.transform = `translateX(-${counter * stepSize}px)`;
}

addEventListener("resize", setCarouselWidth);

function setCarouselWidth() {
    carouselContainerWidth = document.querySelector(".service-bottom").getBoundingClientRect().width;

    carousel.style.width = `${carouselItems.length * carouselItemWidth + carouselItems.length * itemMargin}px`;
}

addEventListener("resize", () => {
    diff = Math.abs(carouselContainerWidth - carouselWidth);
    stepSize = carouselItemWidth + itemMargin;
    stepLeft = Math.round(diff / stepSize);
});

// BACK TO TOP BUTTON
document.getElementById("backToTop").addEventListener("click", backToTop);

function backToTop() {
    scrollTo({ top, behavior: "smooth" });
}

console.log("Made with 💜 by bahree36@outlook.com");
