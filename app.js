// Declarations
let controller;
let sectionScene;
let pageScene;

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".hidden-menu");

hamburger.addEventListener("click", hamburgerClick);

function hamburgerClick() {
  console.log("clicked");
  menu.classList.toggle("active");
  document.body.classList.toggle("hide");
}

function animateSections() {
  // Initiate controller
  controller = new ScrollMagic.Controller();
  // Select the sections
  const sliders = document.querySelectorAll(".page-section");

  // Loop over each of the sections
  sliders.forEach((section, index, sections) => {
    const image = section.querySelector("img");
    const reveal = section.querySelector(".text-reveal");

    // GSAP
    const sectionTimeline = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" }
    });

    sectionTimeline.fromTo(image, { x: "-120%" }, { x: "0%" });
    sectionTimeline.fromTo(image, { opacity: 0 }, { opacity: "1" }, "-=0.75");
    sectionTimeline.fromTo(reveal, { left: "0%" }, { left: "120%" }, "-=0.75");

    // Create a scene
    sectionScene = new ScrollMagic.Scene({
      triggerElement: section,
      reverse: false,
      triggerHook: 0.75
    })
      .setTween(sectionTimeline)
      .addTo(controller);

    // New Animation
    const pageTimeline = gsap.timeline();
    pageTimeline.fromTo(section, { opacity: 1 }, { opacity: 0 });
    // Create the page scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: section,
      duration: "200%",
      triggerHook: 0
    })
      .setTween(pageTimeline)
      .addTo(controller);
  });
}

animateSections();
