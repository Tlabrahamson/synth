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
  const sectionSliders = document.querySelectorAll(".page-section");

  // Loop over each of the sections
  sectionSliders.forEach(section => {
    const image = section.querySelectorAll("img");
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

  const zooImages = document.querySelectorAll(".grid-item");

  zooImages.forEach(section => {
    // GSAP
    const image = section.querySelectorAll("img");
    const textReveal = section.querySelectorAll(".grid-section-reveal");

    const zooTimeline = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" }
    });

    zooTimeline.fromTo(
      image,
      { x: "300%", opacity: 0 },
      { x: "0%", opacity: 1 },
      "-=1.5"
    );
    zooTimeline.fromTo(textReveal, { x: "0%" }, { x: "300%" }, "-=1.5");

    // Create a scene
    zooScene = new ScrollMagic.Scene({
      triggerElement: section,
      reverse: false,
      triggerHook: 0.75
    })
      .setTween(zooTimeline)
      .addTo(controller);
  });

  const form = document.querySelector(".form-section");

  // GSAP
  const formTimeline = gsap.timeline({
    defaults: { duration: 1, ease: "power2.inOut" }
  });

  formTimeline.fromTo(form, { opacity: 0 }, { opacity: 1 }, "-=1.5");

  // Create a scene
  formScene = new ScrollMagic.Scene({
    triggerElement: form,
    reverse: false,
    triggerHook: 0.75
  })
    .setTween(formTimeline)
    .addTo(controller);
}

animateSections();
