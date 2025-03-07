'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {
    // convert to array for multiple categories
    const itemCategories = filterItems[i].dataset.category.split(",").map(cat => cat.trim()) 

    if (selectedValue === "all" || itemCategories.includes(selectedValue)) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// travel page spinning globe with pins

// Ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const globeContainer = document.getElementById("globe");

  if (!globeContainer) {
    console.error("Globe container not found!");
    return;
  }

  const N = 300;
    const gData = [...Array(N).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: Math.random() / 3,
      color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    }));

  // Create a globe instance
  const globe = new ThreeGlobe()
    .globeImageUrl('./assets/images/earth-day.jpg')
    .bumpImageUrl('./assets/images/earth-blue-marble.jpg')
    .pointsData(gData)
      .pointAltitude('size')
      .pointColor('color');

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      globeContainer.appendChild(renderer.domElement);
  

  console.log(renderer.domElement);

  const scene = new THREE.Scene();
    scene.add(globe);
    scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));

    // Setup camera
    // const camera = new THREE.PerspectiveCamera();
    // camera.aspect = window.innerWidth/window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5; // You can try changing this to a higher or lower value

    camera.updateProjectionMatrix();
    camera.position.z = 500;


  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    
  }

  animate();
});


// document.addEventListener("DOMContentLoaded", function () {
//     // Ensure #globe exists
//     const globeContainer = document.getElementById('globe');
//     if (!globeContainer) {
//         console.error("ERROR: #globe container not found!");
//         return;
//     }

//     // Create a spinning globe using Globe.gl library
//     const world = new ThreeGlobe()
//       .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
//       .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
//       .backgroundColor('rgba(0,0,0,0)') // Transparent background
//       .width(600)
//       .height(400)
//       .pointOfView({ lat: 20, lng: 0, altitude: 2.5 }) // Start position
//       .onGlobeClick(({ lat, lng }) => {
//         console.log(`Globe clicked at: ${lat}, ${lng}`);
//       });

//     // Append correctly
//     world.appendTo(globeContainer);

//     // Sample location data
//     const locations = [
//       { name: "Italy", lat: 41.8719, lng: 12.5674, link: "#italy" },
//       { name: "New Orleans", lat: 29.9511, lng: -90.0715, link: "#new-orleans" }
//     ];

//     world.labelsData(locations)
//       .labelText(d => d.name)
//       .labelSize(4)  // Increase visibility
//       .labelDotRadius(1)
//       .labelColor(() => 'white')
//       .onLabelClick(d => {
//         document.querySelector(d.link)?.scrollIntoView({ behavior: 'smooth' });
//       });
// });

  

